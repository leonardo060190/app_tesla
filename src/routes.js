const express = require('express');
const CarrosController = require('./controller/CarrosController');
const ClientesController = require('./controller/ClientesController');
const PedidosController = require('./controller/PedidosController');
const InventariosController = require('./controller/InventariosController');


const routes = express.Router();

routes.get('/', (req, res) => {
res.send('Olá leonardo')
});

////////////////////////////////////////////////////////////////

// Rotas da tabela Carros
routes.get('/carros', CarrosController.index)// rota para buscar todos os Carros
routes.get('/carros/:id', CarrosController.buscaid)
routes.put('/carros/:id', CarrosController.update)
routes.post('/carros', CarrosController.store)
routes.delete('/carros/:id', CarrosController.delete)


////////////////////////////////////////////////////////////////

// Rotas da tabela Clientes
routes.get('/clientes', ClientesController.index)// rota para buscar todos os Clientes
routes.get('/clientes/:id', ClientesController.buscaid)
routes.get('/clientes/maior/compra', ClientesController.maiorcompra)
routes.put('/clientes/:id', ClientesController.update)
routes.post('/clientes', ClientesController.store)
routes.delete('/clientes/:nome', ClientesController.delete)


////////////////////////////////////////////////////////////////

// Rotas da tabela Inventarios
routes.get('/inventarios', InventariosController.index)// rota para buscar todos os inventarios
routes.get('/inventarios/:id', InventariosController.buscaid)
routes.put('/inventarios/:id', InventariosController.update)
routes.post('/inventarios', InventariosController.store)


////////////////////////////////////////////////////////////////

// Rotas da tabela Pedidos
routes.get('/pedidos', PedidosController.index)// rota para buscar todos os Pedidos
routes.get('/pedidos/:id', PedidosController.buscaid)
routes.get('/pedidos/cliente/:nome', PedidosController.buscacliente)
routes.get('/pedidos/cliente/carro/completo', PedidosController.buscacompleta)
routes.get('/pedidos/cliente/carro/completo/venda', PedidosController.buscavenda)
routes.get('/pedidos/cliente/carro/completo/venda/mes', PedidosController.mediacarrovendido)
routes.put('/pedidos/:id', PedidosController.update)
routes.post('/pedidos', PedidosController.store)
routes.delete('/pedidos/:id', PedidosController.delete)


////////////////////////////////////////////////////////////////


module.exports = routes;// exporta as rotas para do aplicação
