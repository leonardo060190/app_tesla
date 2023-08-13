
const Inventarios = require('../models/Inventarios')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////

    async index(req, res) {
        await Inventarios.sequelize.query(
        `SELECT 
            modelos.modelo, 
            inventarios.quantidade_estoque 
            FROM 
            Inventarios
        LEFT JOIN 
            carros on carros.id = inventarios.id_carro
        LEFT JOIN
            modelos on modelos.id = carros.id_modelo`
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
    ////////////////////////////////////////////////////////////////////////////////////////////////


    async detalhesCarros(req, res) {
        await Inventarios.sequelize.query(
            `SELECT 
                inv.quantidade_estoque 'qtde estoque', 
                mod.modelo, 
                car.preco, 
                car.caracteristicas  
            FROM Inventarios inv
            LEFT JOIN 
                carros car on car.id = inv.id_carro
            LEFT JOIN
                modelos mod on mod.id = car.id_modelo`
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
                `
                UPDATE inventarios
                LEFT JOIN (
                    SELECT carros.id_modelo, COUNT(*) AS car_count_modelo
                    FROM carros
                LEFT JOIN 
                    modelos ON modelos.id = carros.id_modelo
                GROUP BY 
                    modelos.modelo
                ) AS car_counts
                ON inventarios.id_carro = car_counts.modelo
                SET inventarios.quantidade_estoque = COALESCE(car_counts.car_count_modelo, 0),
                    inventarios.created_at = :created_at,
                    inventarios.updated_at = :updated_at;
                
                
                `,
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
