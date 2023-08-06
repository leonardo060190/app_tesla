module.exports = {
    dialect: 'mysql', //tipo de linguagem
    host: 'localhost',//local a onde está o banco de dados
    username: 'root',
    port: '3306',// porta do banco de dados
    password: 'root',//senha do banco de dados
    database: 'app_tesla',//nome do banco de dados que vai utilizar no projeto
    define: {
    timestamps: false,//data de crição e data de alteração
    underscored: true
    
    }
    
    }
    