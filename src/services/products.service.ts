import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { DB } from '@database';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { IProduct } from '@/interfaces/products.interface';
import { ProductWarehouseModel as ProductWarehouse, ProductWarehouseModel } from '@models/product_warehouses.model';
import { col, Op, Sequelize } from 'sequelize';
// import { ProductModel } from '@/models/products.model';
import { ProductSupplierModel } from '@/models/product_suppliers.model';
import { PurchaseOrderModel } from '@/models/purchase_orders.model';
import { WarehouseModel } from '@/models/warehouses.model';
import { IProductWarehouse } from '@/interfaces/suppliers.interface';
import { ProductModel as Product } from '@/models/products.model';

@Service()
export class ProductService {
  public products = DB.Products;

  public async findAllProducts(): Promise<IProduct[]> {
    const allProducts = await this.products.findAll({
      include: {
        model: ProductWarehouse,
        as: 'warehouses',
      },
      logging: console.log,
    });
    return allProducts as IProduct[];
  }

  public async monitorStockLevelsAndReorder(): Promise<void> {
    const lowStockProducts = await ProductWarehouse.findAll({
      attributes: ['productId', 'warehouseId', 'stockQuantity'],
      include: [
        {
          model: Product,
          attributes: ['reorderThreshold'],
          as: 'product',
        },
      ],
      where: {
        stockQuantity: {
          [Op.lt]: col('product.reorderThreshold'),
        },
      },
      logging: console.log,
    });

    for (const product of lowStockProducts) {
      const { productId, warehouseId, stockQuantity } = product;

      const defaultSupplier = await ProductSupplierModel.findOne({
        where: { productId: product.productId },
        attributes: ['supplierId'],
      });

      if (!defaultSupplier) {
        console.error(`No supplier found for product ${productId}`);
        continue;
      }

      const expectedArrivalDate = new Date();
      expectedArrivalDate.setDate(expectedArrivalDate.getDate() + 3);

      const capacity = await ProductWarehouse.sum('stockQuantity', {
        where: { warehouseId },
      });

      // Calculate reorder amount (for the warehouse) as dictated by the product

      let reorderQuantity = product.product.reorderThreshold - stockQuantity;

      const warehouse = await WarehouseModel.findOne({ where: { id: warehouseId } });
      if (capacity + reorderQuantity > warehouse.capacity) {
        const adjustedQuantity = warehouse.capacity - capacity;
        if (adjustedQuantity <= 0) {
          console.error('Not enough space in the warehouse.');
          continue;
        }
        reorderQuantity = adjustedQuantity;
      } else {
        reorderQuantity = capacity + reorderQuantity;
      }

      const existingOrder = await PurchaseOrderModel.findOne({
        where: {
          productId,
          warehouseId,
          status: 'PENDING',
        },
      });

      if (!existingOrder) {
        await PurchaseOrderModel.create({
          productId,
          supplierId: defaultSupplier.supplierId,
          warehouseId,
          quantityOrdered: reorderQuantity,
          orderDate: new Date(),
          expectedArrivalDate,
        });
        console.info(`Created purchase order for product ${productId}`);
      } else {
        console.warn(`Purchase order already exists for product ${productId} in warehouse ${warehouseId}`);
      }
    }
  }

  /**
   * Update stock levels for a product in a warehouse.
   * @param productId - The product order ID
   * @param warehouseId - The warehouse ID
   * @param quantity - Quantity to adjust (positive or negative)
   */
  public async updateStockLevels(productId: string, warehouseId: string, quantity: number): Promise<IProductWarehouse> {
    const productWarehouse = await ProductWarehouseModel.findOne({
      where: { productId, warehouseId },
    });

    if (!productWarehouse) {
      throw new Error(`Product ${productId} not found in warehouse ${warehouseId}`);
    }

    productWarehouse.stockQuantity -= quantity;
    await productWarehouse.save();

    return productWarehouse;
  }
}
