'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async queryInterface => {
    const supplierIds = {
      supplierOne: uuidv4(),
      supplierTwo: uuidv4(),
    };

    await queryInterface.bulkInsert('suppliers', [
      {
        id: supplierIds.supplierOne,
        name: 'Supplier One',
        contactPhone: '1234567890',
        contactEmail: 'supplier1@example.com',
        streetAddress: '123 Supplier St.',
        city: 'Supplier City',
        state: 'Supplier State',
        postalCode: '12345',
        country: 'Supplier Country',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: supplierIds.supplierTwo,
        name: 'Supplier Two',
        contactPhone: '9876543210',
        contactEmail: 'supplier2@example.com',
        streetAddress: '456 Supplier Ave.',
        city: 'Supplier City',
        state: 'Supplier State',
        postalCode: '67890',
        country: 'Supplier Country',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return supplierIds;
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('suppliers', null, {});
  },
};
