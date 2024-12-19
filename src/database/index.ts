import Sequelize from 'sequelize';
import { NODE_ENV, REMOTE_ENV_DB, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import ProductModel, { ProductModel as Product } from '@/models/products.model';
import PurchaseOrderModel, { PurchaseOrderModel as PurchaseOrder } from '@/models/purchase_orders.model';
import SupplierModel, { SupplierModel as Supplier } from '@/models/suppliers.model';
import WarehouseModel, { WarehouseModel as Warehouse } from '@/models/warehouses.model';
import ProductWarehouseModel, { ProductWarehouseModel as ProductWarehouse } from '@/models/product_warehouses.model';
import ProductSupplierModel, { ProductSupplierModel as ProductSupplier } from '@/models/product_suppliers.model';
import { logger } from '@utils/logger';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+09:00',
  pool: {
    min: 0,
    max: 18,
  },
  logQueryParameters: true,
  logging: (query, time) => {
    // logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
  dialectOptions: REMOTE_ENV_DB && {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
  define: {
    timestamps: true,
    paranoid: true,
  },
});

if (sequelize) {
  sequelize
    .authenticate()
    .then(() => {
      Product.hasMany(ProductWarehouse, { foreignKey: 'productId', as: 'warehouses' });

      // ProductWarehouse belongs to Product
      ProductWarehouse.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

      Warehouse.hasMany(ProductWarehouse, { foreignKey: 'warehouseId', as: 'productInventories' });

      // ProductWarehouse belongs to Warehouse
      ProductWarehouse.belongsTo(Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });

      // PurchaseOrder belongs to Product
      PurchaseOrder.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

      // PurchaseOrder belongs to Supplier
      PurchaseOrder.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });

      // PurchaseOrder belongs to Warehouse
      PurchaseOrder.belongsTo(Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' });

      // Product has many ProductWarehouse
      Product.hasMany(ProductWarehouse, { foreignKey: 'productId', as: 'productInventories' });

      // Product belongs to many Suppliers (many-to-many through product_suppliers)
      Product.belongsToMany(Supplier, {
        through: 'product_suppliers',
        foreignKey: 'productId',
        otherKey: 'supplierId',
        as: 'suppliers',
      });

      // Supplier belongs to many Products (many-to-many through product_suppliers)
      Supplier.belongsToMany(Product, {
        through: 'product_suppliers',
        foreignKey: 'supplierId',
        otherKey: 'productId',
        as: 'products',
      });

      console.log('Postgres Connection has been established successfully.');
      try {
      } catch (error) {
        console.log(error);
      }
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

export const DB = {
  Products: ProductModel(sequelize),
  Suppliers: SupplierModel(sequelize),
  Warehouses: WarehouseModel(sequelize),
  PurchaseOrders: PurchaseOrderModel(sequelize),
  ProductWarehouses: ProductWarehouseModel(sequelize),
  ProductSupplierModel: ProductSupplierModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
