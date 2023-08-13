
const Pedidos = require('../models/Pedidos')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////

    async index(req, res) {
        await Pedidos.sequelize.query(`SELECT * FROM Pedidos ORDER BY updated_at `)
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
        await Pedidos.sequelize.query(`SELECT * FROM Pedidos WHERE id = ?`,
            { replacements: [req.params.id] })
            .then(([results, metadata]) => {
                if (results.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Pedido não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        Pedido: results[0],
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

    async buscacliente(req, res) {
        await Pedidos.sequelize.query(
            `SELECT cli.nome, ped.* 
             FROM pedidos ped 
             LEFT JOIN clientes cli on cli.id = ped.id_cliente
             WHERE cli.nome = ?`,
            { replacements: [req.params.nome] })
            .then(([results, metadata]) => {
                if (results.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Pedido não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        Pedido: results,
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
    async buscacompleta(req, res) {
        await Pedidos.sequelize.query(`SELECT * FROM pedidos ped 
        LEFT JOIN clientes cli ON cli.id = ped.id_cliente
        LEFT JOIN carros car ON car.id = ped.id_carro`
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
    async buscavenda(req, res) {
        await Pedidos.sequelize.query(`select count(*) 'qtd carros', sum(preco), modelos.modelo from pedidos 
        left join carros on carros.id = pedidos.id_carro
        left join modelos on modelos.id = carros.id_modelo
        where pedidos.status_pedido = "vendido"
        group by modelos.modelo`
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


    async mediacarrovendido(req, res) {
        await Pedidos.sequelize.query(
            `SELECT 
            ano,
            mes,
            numero_carros_vendidos,
            CONCAT(ROUND((numero_carros_vendidos / total_dias_venda) * 1), '%') AS media_carros_vendidos_por_mes
        FROM (
            SELECT 
                YEAR(data_pedido) AS ano,
                MONTH(data_pedido) AS mes,
                COUNT(*) AS numero_carros_vendidos,
                COUNT(DISTINCT DATE(data_pedido)) AS total_dias_venda
            FROM pedidos
            where status_pedido = "vendido"
            GROUP BY YEAR(data_pedido), MONTH(data_pedido)
        ) AS subquery
        ORDER BY ano, mes;
        `
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

    async update(req, res) {
        await Pedidos.sequelize.query(`UPDATE Pedidos SET status_pedido = ?, updated_at = ? WHERE id = ?`,
            { replacements: [req.body.status_pedido, new Date(), req.params.id] }
        )
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Pedido não encontrada",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "status atualizado com sucesso",
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
        await Pedidos.sequelize.query(
            `INSERT INTO Pedidos (
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

    async delete(req, res) {
        await Pedidos.sequelize.query(`DELETE FROM Pedidos WHERE id = ?`,
            { replacements: [req.params.id] })
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Pedido não encontrada",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Pedido deletado com sucesso",
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
