
const Inventarios = require('../models/Inventarios')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////

    async index(req, res) {
        await Inventarios.sequelize.query(`SELECT * FROM Inventarios`)
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
        await Inventarios.sequelize.query(`SELECT * FROM Inventarios WHERE id = ?`,
            { replacements: [req.params.id] })
            .then(([results, metadata]) => {
                if (results.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Inventario não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        Inventario: results[0],
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
        try {
            await Inventarios.sequelize.query(
                `UPDATE inventarios 
                LEFT JOIN (
                    SELECT COUNT(*) AS car_count
                    FROM carros
                ) AS car_counts
                ON inventarios.id_carro = car_counts.id
                SET inventarios.quantidade_estoque = COALESCE(car_counts.car_count, 0),
                    inventarios.created_at = :created_at,
                    inventarios.updated_at = :updated_at`,
                {
                    replacements: {
                        created_at: new Date(), // Replace with the actual value for created_at
                        updated_at: new Date(), // Replace with the actual value for updated_at

                    }
                }
            );

            const affectedRows = res;

            if (affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: "Pedido não encontrado",
                });
            } else {
                res.json({
                    success: true,
                    message: "Quantidade disponível atualizada com sucesso",
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // async store(req, res) {
    //     const currentDate = new Date();

    //     const insertQuery = (
    //         `INSERT INTO inventarios (id_carro, quantidade_estoque, created_at, updated_at)
    //         SELECT count(modelo), 0, :created_at, :updated_at
    //         FROM carros
    //         GROUP BY carros.modelo`);

    //     await Inventarios.sequelize.query(insertQuery, {
    //         replacements: {
    //             created_at: currentDate, updated_at: currentDate,
    //         },

    //     })

    //         .then(([results, metadata]) => {
    //             res.status(201).json({
    //                 success: true,
    //                 message: "Pedido cadastrado com sucesso",
    //             });
    //         }).catch((error) => {
    //             res.status(500).json({
    //                 success: false,
    //                 message: error.message,
    //             });
    //         });
    // },
    ////////////////////////////////////////////////////////////////////////////////////////////////

    
    async delete(req, res) {
        await Inventarios.sequelize.query(`DELETE FROM Inventarios`)
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
