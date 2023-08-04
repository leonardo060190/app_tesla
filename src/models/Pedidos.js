const { Model, DataTypes } = require('sequelize')

class Pedidos extends Model {
    static init(sequelize){
        super.init({
            data_pedido: DataTypes.DATE,
            status_pedido: DataTypes.STRING,
            clienteId: DataTypes.INTEGER,
            carroId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = Pedidos;
