const { Model, DataTypes } = require('sequelize')

class Carros extends Model {
    static init(sequelize){
        super.init({
            modelo: DataTypes.STRING,
            preco: DataTypes.FLOAT,
            caracteristicas: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = Carros;
