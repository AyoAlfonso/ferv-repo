import { OrderStatus } from '@/dtos/purchase_order.dto';

export interface PurchaseOrder {
  id: string;
  productId: string;
  status: OrderStatus;
  supplierId: string;
  warehouseId: string;
  quantityOrdered: number;
  orderDate: Date;
  expectedArrivalDate?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
