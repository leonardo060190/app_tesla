const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Carros = require('../models/Carros');
const Clientes = require('../models/Clientes');
const Inventarios = require('../models/Inventarios');
const Pedidos = require('../models/Pedidos');
const ModelosCarros = require('../models/ModelosCarros');

const connection = new Sequelize(dbConfig);

Carros.init(connection);
Clientes.init(connection);
Inventarios.init(connection);
Pedidos.init(connection);
ModelosCarros.init(connection);



module.exports = connection;
