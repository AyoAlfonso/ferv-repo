'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const warehouseIds = {
      warehouse1: uuidv4(),
      warehouse2: uuidv4(),
    };

    await queryInterface.bulkInsert('warehouses', [
      {
        id: warehouseIds.warehouse1,
        name: 'Warehouse 1',
        streetAddress: '123 Warehouse St.',
        city: 'Warehouse City',
        state: 'Warehouse State',
        postalCode: '54321',
        country: 'Warehouse Country',
        capacity: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: warehouseIds.warehouse2,
        name: 'Warehouse 2',
        streetAddress: '456 Warehouse Blvd.',
        city: 'Warehouse City',
        state: 'Warehouse State',
        postalCode: '98765',
        country: 'Warehouse Country',
        capacity: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return warehouseIds;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('warehouses', null, {});
  },
};
