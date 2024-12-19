import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Warehouse } from '@interfaces/warehouses.interface';

export type WarehouseCreationAttributes = Optional<Warehouse, 'id' | 'createdAt' | 'updatedAt'>;

export class WarehouseModel extends Model<Warehouse, WarehouseCreationAttributes> implements Warehouse {
  public id!: string;
  public name!: string;
  public streetAddress?: string;
  public city?: string;
  public state?: string;
  public postalCode?: string;
  public country?: string;
  public latitude?: number;
  public longitude?: number;
  public capacity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof WarehouseModel {
  WarehouseModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: 'warehouses',
      sequelize,
      timestamps: true,
    },
  );

  return WarehouseModel;
}
