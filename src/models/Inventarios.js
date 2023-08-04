const { Model, DataTypes } = require('sequelize')

class Inventarios extends Model {
    static init(sequelize){
        super.init({
            quantidade_estoque: DataTypes.INTEGER,
            carroId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = Inventarios;
