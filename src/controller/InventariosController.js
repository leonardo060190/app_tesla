
const Inventarios = require('../models/Inventarios')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////

    async index(req, res) {
        await Inventarios.sequelize.query(`SELECT * FROM Inventarios ORDER BY updated_at `)
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
            `UPDATE inventarios inv
            JOIN carros car ON inv.id_carro = car.id
            SET inv.quantidade_estoque = (
                SELECT COUNT(*), carros.modelo
                FROM carros
                group by carros.nodelo
            )
            WHERE inv.id = :id;`,
            { replacements: { id: req.params.id } }
        );

        const affectedRows = result[1].rowCount;

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

    async store(req, res) {
        await Inventarios.sequelize.query(
            `INSERT INTO Inventarios (
                data_pedido, 
                status_pedido,  
                id_cliente,
                id_carro, 
                created_at, 
                updated_at) 
                VALUES (?, ?, ?, ?, ?, ?)`,
            {
                replacements:
                    [
                        req.body.data_pedido,
                        req.body.status_pedido,
                        req.body.id_cliente,
                        req.body.id_carro,
                        new Date(),
                        new Date()
                    ]
            }
        )
            .then(([results, metadata]) => {
                res.status(201).json({
                    success: true,
                    message: "Pedido cadastrado com sucesso",
                });
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////



    
};//fim do export
