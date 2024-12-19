import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreatePurchaseOrderDto, SellStockDto } from '@dtos/purchase_order.dto';
import { PurchaseOrder } from '@interfaces/purchase_orders.interface';
import { PurchaseOrderService } from '@/services/purchase_order.service';
import { UpdatePurchaseStockDto } from '@/dtos/purchase_order.dto';
import { ProductService } from '@/services/products.service';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';

export class PurchaseOrderController {
  public product = Container.get(ProductService);
  public purchase_orders = Container.get(PurchaseOrderService);

  public getProductOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductOrdersData: PurchaseOrder[] = await this.purchase_orders.fetchPurchaseOrders();

      res.status(200).json({ data: findAllProductOrdersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProductOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productOrderId = req.params.id;
      const findOneProductOrderData: PurchaseOrder = await this.purchase_orders.getProductOrder(productOrderId);

      res.status(200).json({ data: findOneProductOrderData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const purchaseOrderData: CreatePurchaseOrderDto = req.body;
      const createProductOrderData: PurchaseOrder = await this.purchase_orders.create(purchaseOrderData);

      res.status(201).json({ data: createProductOrderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productOrderId = req.params.id;
      const productOrderData: UpdatePurchaseStockDto = req.body;
      const { productId, warehouseId, quantityOrdered } = productOrderData;
      await this.purchase_orders.update(productOrderId, { status: 'COMPLETED' });
      const updatePurchaseOrder = await this.product.updateStockLevels(productId, warehouseId, quantityOrdered);

      res.status(200).json({ data: updatePurchaseOrder, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
