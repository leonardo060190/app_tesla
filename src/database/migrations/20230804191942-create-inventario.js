'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantidade_estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      carroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Carros',
          key: 'id'
        }
      },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inventario');
  }
};


