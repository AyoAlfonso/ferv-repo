import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
// import { CreateProductDto } from '@dtos/products.dto';
import { IProduct } from '@interfaces/products.interface';
import { ProductService } from '@/services/products.service';
import { SellStockDto } from '@/dtos/purchase_order.dto';

export class ProductController {
  public product = Container.get(ProductService);

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData = await this.product.findAllProducts();

      res.status(200).json({ data: findAllProductsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public sell = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.id;

      const { warehouseId, quantityOrdered }: SellStockDto = req.body;
      const remainingstocks = await this.product.updateStockLevels(productId, warehouseId, quantityOrdered);

      res.status(200).json({ message: `Product sold successfully. ${remainingstocks.stockQuantity} left in warehouse` });
    } catch (error) {
      next(error);
    }
  };
}
