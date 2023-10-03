'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("members", [
      {
      name: `Pandhu`, gender: `Male`,
      contact: `021-223311`, address: `Malang, Indonesia`, createdAt: new Date(), updatedAt: new Date()
      },
      {
      name: `Fina`, gender: `Female`,
      contact: `0331-474747`, address: `Malang, Indonesia` , createdAt: new Date(), updatedAt: new Date()
      },
      {
      name: `Cia`, gender: `Female`,
      contact: `091-23981`, address: `Malang, Indonesia`, createdAt: new Date(), updatedAt: new Date()
      },
      ], {}) 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', null, {});
  }
};
