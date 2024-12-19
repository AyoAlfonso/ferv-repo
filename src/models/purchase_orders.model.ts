import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { PurchaseOrder } from '@interfaces/purchase_orders.interface';
import { OrderStatus } from '@/dtos/purchase_order.dto';

export type PurchaseOrderCreationAttributes = Optional<PurchaseOrder, 'id' | 'createdAt' | 'updatedAt'>;

export class PurchaseOrderModel extends Model<PurchaseOrder, PurchaseOrderCreationAttributes> implements PurchaseOrder {
  public id!: string;
  public productId!: string;
  public supplierId!: string;
  public warehouseId!: string;
  public status!: OrderStatus;
  public quantityOrdered!: number;
  public orderDate!: Date;
  public expectedArrivalDate?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PurchaseOrderModel {
  PurchaseOrderModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      supplierId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      warehouseId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantityOrdered: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expectedArrivalDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'purchase_orders',
      sequelize,
      timestamps: true,
    },
  );

  return PurchaseOrderModel;
}
