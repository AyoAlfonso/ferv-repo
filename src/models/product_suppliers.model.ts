import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ProductSupplier } from '@interfaces/product_suppliers.interface';
export type ProductSupplierCreationAttributes = Optional<ProductSupplier, 'id' | 'createdAt' | 'updatedAt'>;

export class ProductSupplierModel extends Model<ProductSupplier, ProductSupplierCreationAttributes> implements ProductSupplier {
  public id!: string;
  public productId!: string;
  public supplierId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProductSupplierModel {
  ProductSupplierModel.init(
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
      },
      supplierId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'suppliers',
          key: 'supplierId',
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
      tableName: 'product_suppliers',
      sequelize,
      timestamps: true,
    },
  );

  return ProductSupplierModel;
}
