
const Modelos = require('../models/Modelos')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////

    async index(req, res) {
        await Modelos.sequelize.query(`SELECT * FROM modelos ORDER BY updated_at `)
            .then(([results, metadata]) => {
                res.json(results);
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////

    async buscaid(req, res) {
        await Modelos.sequelize.query(`SELECT * FROM modelos WHERE id = ?`,
            { replacements: [req.params.id] })
            .then(([results, metadata]) => {
                if (results.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Modelo não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        Modelo: results[0],
                    });
                }
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////


    async store(req, res) {
        await Modelos.sequelize.query(
            `INSERT INTO modelos (
                modelo, 
                created_at, 
                updated_at) 
                VALUES (?, ?, ?)`,
            {
                replacements:
                    [
                        req.body.modelo,
                        new Date(),
                        new Date()
                    ]
            }
        )
            .then(([results, metadata]) => {
                res.status(201).json({
                    success: true,
                    message: "Modelo cadastrado com sucesso",
                });
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////

    async delete(req, res) {
        await Modelos.sequelize.query(`DELETE FROM modelos WHERE id = ?`,
            { replacements: [req.params.id] })
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Modelo não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Modelo deletado com sucesso",
                    });
                }
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            })
    }




};//fim do export
