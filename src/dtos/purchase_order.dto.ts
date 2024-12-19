import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator';
export type OrderStatus = 'PENDING' | 'COMPLETED';

export class CreatePurchaseOrderDto {
  @IsString()
  @IsNotEmpty()
  public productId: string;

  @IsString()
  @IsNotEmpty()
  public supplierId: string;

  @IsString()
  @IsNotEmpty()
  public warehouseId: string;

  @IsNumber()
  @IsNotEmpty()
  public quantityOrdered: number;

  @IsString()
  @IsNotEmpty()
  public orderDate: Date;

  @IsString()
  @IsNotEmpty()
  public expectedArrivalDate?: Date;
}

export class UpdatePurchaseOrderDto {
  @IsString()
  public status: OrderStatus;
}

export class UpdatePurchaseStockDto {
  @IsString()
  public productId: string;

  @IsString()
  public warehouseId: string;

  @IsNumber()
  public quantityOrdered: number;
}

export class SellStockDto {
  @IsString()
  public warehouseId: string;

  @IsNumber()
  public quantityOrdered: number;
}
