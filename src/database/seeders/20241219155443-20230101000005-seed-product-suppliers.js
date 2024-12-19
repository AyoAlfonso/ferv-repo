'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productIds = await queryInterface.sequelize.query('SELECT id FROM products;', {
      type: Sequelize.QueryTypes.SELECT,
    });
    const supplierIds = await queryInterface.sequelize.query('SELECT id FROM suppliers;', {
      type: Sequelize.QueryTypes.SELECT,
    });

    await queryInterface.bulkInsert('product_suppliers', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        productId: productIds[0].id,
        supplierId: supplierIds[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        productId: productIds[1].id,
        supplierId: supplierIds[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_suppliers', null, {});
  },
};
