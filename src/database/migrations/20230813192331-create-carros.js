'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carros', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_modelo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Modelos',
          key: 'id'
        }
      },
      preco: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      caracteristicas: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('carros');
  }
};


