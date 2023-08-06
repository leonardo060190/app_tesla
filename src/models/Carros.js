const { Model, DataTypes } = require('sequelize')

class Carros extends Model {
    static init(sequelize){
        super.init({
            modelo: DataTypes.STRING,
            preco: DataTypes.FLOAT,
            caracteristicas: DataTypes.STRING,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = Carros;
