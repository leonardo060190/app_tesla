
const Carros = require('../models/Carros')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // retorna todos os dados da tabela carros ordenados por update_at
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
    // retorna os dados refente ao id informado
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
    // altera o preço do carro e atualisa o updated_at  pelo id informado
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
    // insere os dados na tabela corros
    async store(req, res) {
        await Carros.sequelize.query(
            `INSERT INTO carros (
                id_modelo, 
                preco, 
                caracteristicas, 
                created_at, 
                updated_at) 
                VALUES (?, ?, ?, ?, ?)`,
            {
                replacements:
                    [
                        req.body.id_modelo,
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
    // deleta os registros referente ao id informado
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
