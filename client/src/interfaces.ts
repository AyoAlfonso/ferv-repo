

export interface IProductWarehouse {
  id: string;
  productId: string;
  warehouseId: string;
  stockQuantity: number;
}
export interface Product {
  id: string;
  name: string;
  description?: string;
  reorderThreshold: number;
  quantityInStock: number;
  defaultSupplierId: string;
  warehouses?: IProductWarehouse[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface PurchaseOrder {
  id: string;
  productId: string;
  supplierId: string;
  warehouseId: string;
  status: string;
  quantityOrdered: number;
  orderDate: Date;
  expectedArrivalDate?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contactPhone?: string;
  contactEmail?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Warehouse {
  id: string;
  name: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  capacity: number;

  createdAt?: Date;
  updatedAt?: Date;
}       

