import { Router } from 'express';
import { PurchaseOrderController } from '@/controllers/purchase_order.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreatePurchaseOrderDto, UpdatePurchaseStockDto } from '@/dtos/purchase_order.dto';

export class PurchaseOrderRoute implements Routes {
  public path = '/purchase-order';
  public router = Router();
  public product_order = new PurchaseOrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.product_order.getProductOrders);
    this.router.get(`${this.path}/:id`, this.product_order.getProductOrder);
    this.router.post(`${this.path}`, ValidationMiddleware(CreatePurchaseOrderDto), this.product_order.create);
    this.router.patch(`${this.path}/:id/stock`, ValidationMiddleware(UpdatePurchaseStockDto, true), this.product_order.update);
  }
}
