
const Carros = require('../models/Carros')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para retonar todos os registros
    async index(req, res) {

        const livros = await Livros.findAll();//Com o método: findAll você pode ler toda a tabela do banco de dados

        return res.json(livros)
        // função que retona todos os dados
    },

    
};//fim do export
