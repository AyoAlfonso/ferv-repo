import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Supplier } from '@interfaces/suppliers.interface';

export type SupplierCreationAttributes = Optional<Supplier, 'id' | 'createdAt' | 'updatedAt'>;

export class SupplierModel extends Model<Supplier, SupplierCreationAttributes> implements Supplier {
  public id: string;
  public name: string;
  public contactPhone?: string;
  public contactEmail?: string;
  public streetAddress?: string;
  public city?: string;
  public state?: string;
  public postalCode?: string;
  public country?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof SupplierModel {
  SupplierModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      contactPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
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
      tableName: 'suppliers',
      sequelize,
      timestamps: true,
    },
  );

  return SupplierModel;
}
