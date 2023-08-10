const Views = require('../models/Pedidos')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    async index(req, res) {
        await Views.sequelize.query(
            `SELECT * from pedido_details`
        )
            .then(([results, metadata]) => {
                res.json(results);
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },

}