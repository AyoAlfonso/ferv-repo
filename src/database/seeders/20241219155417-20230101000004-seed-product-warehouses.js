'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productIds = await queryInterface.sequelize.query('SELECT id FROM products;', {
      type: Sequelize.QueryTypes.SELECT,
    });
    const warehouseIds = await queryInterface.sequelize.query('SELECT id FROM warehouses;', {
      type: Sequelize.QueryTypes.SELECT,
    });

    await queryInterface.bulkInsert('product_warehouses', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        productId: productIds[0].id,
        warehouseId: warehouseIds[0].id,
        stockQuantity: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        productId: productIds[0].id,
        warehouseId: warehouseIds[1].id,
        stockQuantity: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        productId: productIds[1].id,
        warehouseId: warehouseIds[0].id,
        stockQuantity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_warehouses', null, {});
  },
};
