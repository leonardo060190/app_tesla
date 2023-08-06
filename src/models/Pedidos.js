const { Model, DataTypes } = require('sequelize')

class Pedidos extends Model {
    static init(sequelize){
        super.init({
            data_pedido: DataTypes.DATE,
            status_pedido: DataTypes.STRING,
            id_cliente: DataTypes.INTEGER,
            id_carro: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = Pedidos;
