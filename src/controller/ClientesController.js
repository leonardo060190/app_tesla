
const Clientes = require('../models/Clientes')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////
// retorna todos os dados da tabela clientes
    async index(req, res) {
        await Clientes.sequelize.query(`SELECT * FROM Clientes ORDER BY updated_at `)
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
// busca os clientes referente ao id informado
    async buscaid(req, res) {
        await Clientes.sequelize.query(`SELECT * FROM Clientes WHERE id = ?`,
            { replacements: [req.params.id] })
            .then(([results, metadata]) => {
                if (results.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Cliente não encontrada",
                    });
                } else {
                    res.json({
                        success: true,
                        cliente: results[0],
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
// reteorna o cliente que tem mais compras
    async maiorcompra(req, res) {
        await Clientes.sequelize.query(`SELECT count(*) qtd_de_complas, cli.nome cliente FROM pedidos ped 
        LEFT JOIN clientes cli ON cli.id = ped.id_cliente
        LEFT JOIN carros car ON car.id = ped.id_carro
        group by cli.nome
         `)
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
// autera os dados que for refente os id informado
    async update(req, res) {
        await Clientes.sequelize.query(
            `UPDATE Clientes SET 
                telefone = ?,
                email = ?,
                rua = ?,
                numero = ?,
                cep = ?,
                bairro = ?,
                cidade = ?,
                estado = ?,
                updated_at = ? 
            WHERE 
                id = ?`,
            {
                replacements: [
                    req.body.telefone,
                    req.body.email,
                    req.body.rua,
                    req.body.numero,
                    req.body.cep,
                    req.body.bairro,
                    req.body.cidade,
                    req.body.estado,
                    new Date(),
                    req.params.id
                ]
            }
        )
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Cliente não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Cadastro atualizado com sucesso",
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
//insere os dados na tabela clientes
    async store(req, res) {
        await Clientes.sequelize.query(
            `INSERT INTO Clientes (
                nome,
                telefone,
                email,
                rua,
                numero,
                cep,
                bairro,
                cidade,
                estado,
                created_at,
                updated_at
                )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            {
                replacements:
                    [
                        req.body.nome,
                        req.body.telefone,
                        req.body.email,
                        req.body.rua,
                        req.body.numero,
                        req.body.cep,
                        req.body.bairro,
                        req.body.cidade,
                        req.body.estado,
                        new Date(),
                        new Date()
                    ]

            }
        )
            .then(([results, metadata]) => {
                res.status(201).json({
                    success: true,
                    message: "Cliente cadastrado com sucesso",
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
        await Clientes.sequelize.query(`DELETE FROM Clientes WHERE id = ?`,
            { replacements: [req.params.nome] })
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Cliente não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Cliente deletado com sucesso",
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
