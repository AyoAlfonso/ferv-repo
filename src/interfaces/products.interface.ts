import { IProductWarehouse } from './suppliers.interface';

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  reorderThreshold: number;
  defaultSupplierId: string;

  // warehouses?: IProductWarehouse[];

  createdAt?: Date;
  updatedAt?: Date;
}
