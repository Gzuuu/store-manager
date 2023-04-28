const { expect } = require('chai');
const sinon = require('sinon');

const { productModel, salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allUserMock, singleUser, saleMock, someSaleMock } = require('./mocks/productMock');

describe('testes da cadama model', function () {
  afterEach(() => sinon.restore());
  it('verifica o retorno do getAll', async function () {
    sinon.stub(connection, 'execute').resolves([allUserMock]);

    const result = await productModel.getAll();
    expect(result).to.be.an('array');
    expect(result).to.have.length(2)
  });

  it('verifica o retorno do getById', async function () {
    sinon.stub(connection, 'execute').resolves([[singleUser]]);

    const result = await productModel.getById(1);
    expect(result).to.be.equal(singleUser);
  });

  it('verifica a inserção de um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productModel.addProduct('Geladeira Tsunami');
    expect(result.id).to.be.equal(4);
    expect(result.name).to.be.equal('Geladeira Tsunami');
  });

  it('verifica a inserção de uma única venda', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0).resolves([{ insertId: 6 }])
      .onCall(1).resolves([saleMock]);

    const result = await salesModel.addSales(saleMock);

    expect(result.id).to.be.equal(6);
    expect(result.itemsSold).to.be.deep.equal(saleMock);
  });

  it('verifica a inserção de várias vendas', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0).resolves([{ insertId: 6 }])
      .onCall(1).resolves([someSaleMock]);

    const result = await salesModel.addSales(someSaleMock);

    expect(result.id).to.be.equal(6);
    expect(result.itemsSold).to.be.deep.equal(someSaleMock);
  });
});