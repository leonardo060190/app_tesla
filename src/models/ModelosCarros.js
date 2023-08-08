const { Model, DataTypes } = require('sequelize')

class ModelosCarros extends Model {
    static init(sequelize){
        super.init({
            modelo: DataTypes.STRING,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = ModelosCarros;
