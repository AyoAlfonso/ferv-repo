import { Service } from 'typedi';
import { DB } from '@database';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from '@/dtos/purchase_order.dto';
import { HttpException } from '@/exceptions/HttpException';
import { PurchaseOrder } from '@interfaces/purchase_orders.interface';
import { ProductWarehouseModel } from '@models/product_warehouses.model';
import { Sequelize } from 'sequelize';
import { ProductModel } from '@/models/products.model';
import { ProductSupplierModel } from '@/models/product_suppliers.model';
import { PurchaseOrderModel } from '@/models/purchase_orders.model';
import { WarehouseModel } from '@/models/warehouses.model';
import { isEmpty } from '@utils/util';
import { IProductWarehouse } from '@/interfaces/suppliers.interface';

@Service()
export class PurchaseOrderService {
  public purchaseorders = DB.PurchaseOrders;

  public async getProductOrder(id: string): Promise<PurchaseOrder> {
    if (isEmpty(id)) throw new HttpException(400, 'PurchaseOrder ID can not be empty');
    const order: PurchaseOrder = await this.purchaseorders.findByPk(id);
    if (!order) throw new HttpException(409, 'PurchaseOrder not found');
    return order;
  }

  public async update(order_id: string, purchaseorder_data: UpdatePurchaseOrderDto): Promise<PurchaseOrder> {
    if (isEmpty(order_id)) throw new HttpException(400, 'Purchase Order update ID can not be empty');

    const purchaseOrder: PurchaseOrder = await this.purchaseorders.findByPk(order_id);
    if (!purchaseOrder) throw new HttpException(409, 'Folder not found');

    await this.purchaseorders.update(purchaseorder_data, { where: { id: order_id }, returning: true });
    return await this.purchaseorders.findByPk(order_id);
  }
  /**
   * Fetch all purchase orders (pending and completed).
   */
  public async fetchPurchaseOrders(): Promise<any[]> {
    return await PurchaseOrderModel.findAll({
      include: [
        { model: ProductModel, as: 'product' },
        { model: ProductSupplierModel, as: 'supplier' },
        { model: ProductWarehouseModel, as: 'warehouse' },
      ],
    });
  }

  /**
   * Create a new purchase order.
   */
  public async create(data: CreatePurchaseOrderDto): Promise<any> {
    const { productId, supplierId, warehouseId, quantityOrdered } = data;

    const product = await ProductModel.findByPk(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    const warehouse = await ProductWarehouseModel.findByPk(warehouseId);
    if (!warehouse) {
      throw new Error(`Warehouse with ID ${warehouseId} not found.`);
    }

    const order = await PurchaseOrderModel.create({
      productId,
      supplierId,
      warehouseId,
      quantityOrdered,
      orderDate: new Date(),
      expectedArrivalDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    });

    return order;
  }
}
