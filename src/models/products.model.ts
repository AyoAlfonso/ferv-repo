import { Sequelize, DataTypes, Model, Optional, QueryTypes } from 'sequelize';
import { IProduct as Product } from '@interfaces/products.interface';

export type ProductCreationAttributes = Optional<Product, 'id' | 'createdAt' | 'updatedAt'>;

export class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
  public id!: string;
  public name!: string;
  public description?: string;
  public reorderThreshold!: number;
  // public quantityInStock!: number;
  public defaultSupplierId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProductModel {
  ProductModel.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reorderThreshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      defaultSupplierId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'suppliers',
          key: 'id',
        },
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
      tableName: 'products',
      sequelize,
      timestamps: true,
    },
  );

  return ProductModel;
}
