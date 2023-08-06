const { Model, DataTypes } = require('sequelize')

class Clientes extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            telefone: DataTypes.STRING,
            email: DataTypes.STRING,
            rua: DataTypes.STRING,
            numero: DataTypes.INTEGER,
            cep: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            estado: DataTypes.STRING,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = Clientes;
