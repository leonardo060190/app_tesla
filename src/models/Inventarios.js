const { Model, DataTypes } = require('sequelize')

class Inventarios extends Model {
    static init(sequelize){
        super.init({
            quantidade_estoque: DataTypes.INTEGER,
            id_carro: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = Inventarios;
