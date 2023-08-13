const request = require('supertest');
const app = require('./src/server'); // Substitua pelo caminho correto para importar sua aplicação (express, por exemplo)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:', { dialect: 'mysql' }); // Exemplo de configuração do Sequelize
const CarrosModel = require('./src/models/Carros')(sequelize, DataTypes);
CarrosModel.sync({ force: true }); // Sincroniza o modelo com o banco de dados em memória

describe('Carros Controller', () => {
  afterAll(async () => {
    await sequelize.close(); // Fecha a conexão com o banco de dados após todos os testes
  });

  it('should return a list of carros ordered by updated_at', async () => {
    // Simula a resposta da consulta no banco de dados
    const fakeResults = [{ id: 1, name: 'Carro 1', updated_at: new Date() }, { id: 2, name: 'Carro 2', updated_at: new Date() }];
    jest.spyOn(CarrosModel.sequelize, 'query').mockResolvedValue([fakeResults, {}]);

    const response = await request(app).get('/carros'); // Substitua pelo caminho correto para sua rota

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeResults);

    // Restaura a implementação original do método após o teste
    CarrosModel.sequelize.query.mockRestore();
  });

  it('should handle errors and return a 500 status code', async () => {
    // Simula um erro na consulta ao banco de dados
    jest.spyOn(CarrosModel.sequelize, 'query').mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/carros'); // Substitua pelo caminho correto para sua rota

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Database error',
    });

    // Restaura a implementação original do método após o teste
    CarrosModel.sequelize.query.mockRestore();
  });
});
