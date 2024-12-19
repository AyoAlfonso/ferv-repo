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

export interface IProductWarehouse {
  id: string;
  productId: string;
  warehouseId: string;
  stockQuantity: number;
}
