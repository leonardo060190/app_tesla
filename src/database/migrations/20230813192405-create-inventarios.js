'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventarios', {
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
      id_carro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Carros',
          key: 'id'
        }
      },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inventarios');
  }
};


