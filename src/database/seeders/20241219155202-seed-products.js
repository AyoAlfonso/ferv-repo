'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const suppliers = await queryInterface.sequelize.query('SELECT id FROM suppliers;', {
      type: Sequelize.QueryTypes.SELECT,
    });

    if (suppliers.length < 2) {
      throw new Error('Not enough suppliers found. Ensure supplier seeds are run first.');
    }

    const supplierA = suppliers[0].id; // Use first supplier
    const supplierB = suppliers[1].id; // Use second supplier

    const productIds = {
      productA: uuidv4(),
      productB: uuidv4(),
    };

    await queryInterface.bulkInsert('products', [
      {
        id: productIds.productA,
        name: 'Product A',
        description: 'Description for Product A',
        reorderThreshold: 10,
        defaultSupplierId: supplierA, // Link to Supplier A
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: productIds.productB,
        name: 'Product B',
        description: 'Description for Product B',
        defaultSupplierId: supplierB, // Link to Supplier B
        reorderThreshold: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return productIds;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
