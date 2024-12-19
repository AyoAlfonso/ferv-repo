import { Product } from '@/interfaces/products.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class ProductWarehouseModel extends Model {
  public id!: string;
  public productId!: string;

  public warehouseId!: string;
  public stockQuantity!: number;
  public lastUpdated!: Date;

  public product: Product;
}

export default function (sequelize: Sequelize): typeof ProductWarehouseModel {
  ProductWarehouseModel.init(
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
        references: {
          model: 'products',
          key: 'productId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      warehouseId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'warehouses',
          key: 'warehouseId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      stockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'stockQuantity',
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
      tableName: 'product_warehouses',
      sequelize,
      timestamps: true,
    },
  );

  return ProductWarehouseModel;
}
