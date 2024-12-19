import { Router } from 'express';
import { ProductController } from '@/controllers/products.controller';
import { Routes } from '@interfaces/routes.interface';
import { SellStockDto, UpdatePurchaseStockDto } from '@/dtos/purchase_order.dto';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { PurchaseOrderController } from '@/controllers/purchase_order.controller';
// import { CreateProjectDto } from '@dtos/projects.dto';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class ProductRoute implements Routes {
  public path = '/product';
  public router = Router();
  public product = new ProductController();
  public product_order = new PurchaseOrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.product.getProducts);
    this.router.put(`${this.path}/:id/sell`, ValidationMiddleware(SellStockDto), this.product.sell);
  }
}
