
const Inventarios = require('../models/Inventarios')//Importa o arquivo livros da pasta Models
const sequelize = require('sequelize');// Importa a biblioteca do Sequelize

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Rota para retonar todos os registros
    async index(req, res) {

        const Inventarios = await Inventarios.findAll();//Com o método: findAll você pode ler toda a tabela do banco de dados

        return res.json(Inventarios)
        // função que retona todos os dados
    },

    
};//fim do export
