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
