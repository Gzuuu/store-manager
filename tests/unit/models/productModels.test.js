const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allUserMock, singleUser } = require('./mocks/productMock');

describe('testes da cadama model', function () {
  it('verifica o retorno do getAll', async function () {
    afterEach(() => sinon.restore());
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
});