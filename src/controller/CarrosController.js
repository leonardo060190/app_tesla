
const Carros = require('../models/Carros')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////

    async index(req, res) {
        await Carros.sequelize.query(`SELECT * FROM carros ORDER BY updated_at `)
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
        await Carros.sequelize.query(`SELECT * FROM carros WHERE id = ?`,
            { replacements: [req.params.id] })
            .then(([results, metadata]) => {
                if (results.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Id não encontrada",
                    });
                } else {
                    res.json({
                        success: true,
                        Carro: results[0],
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

    async update(req, res) {
        await Carros.sequelize.query(`UPDATE carros SET preco = ?, updated_at = ? WHERE id = ?`,
            { replacements: [req.body.preco, new Date(), req.params.id] }
        )
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Id não encontrada",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Preço atualizado com sucesso",
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
        await Carros.sequelize.query(
            `INSERT INTO carros (
                modelo, 
                preco, 
                caracteristicas, 
                created_at, 
                updated_at) 
                VALUES (?, ?, ?, ?, ?)`,
            {
                replacements:
                    [
                        req.body.modelo,
                        req.body.preco,
                        req.body.caracteristicas,
                        new Date(),
                        new Date()
                    ]
            }
        )
            .then(([results, metadata]) => {
                res.status(201).json({
                    success: true,
                    message: "Carro cadastrado com sucesso",
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
        await Carros.sequelize.query(`DELETE FROM carros WHERE id = ?`,
            { replacements: [req.params.id] })
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "id não encontrada",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Carro deletado com sucesso",
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
