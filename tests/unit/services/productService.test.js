const { expect } = require('chai');
const sinon = require('sinon');

const { productModel, salesModel } = require('../../../src/models');
const { allUserMock, singleUser, addedProduct, someSaleMock } = require('./mocks/productMock');
const { productService, saleService } = require('../../../src/services');

describe('testes da camada Service', function () {
  afterEach(() => sinon.restore());
  it('verifica o retorno da função getAll', async function () {
    sinon.stub(productModel, 'getAll').resolves(allUserMock);

    const result = await productService.getAll();
    expect(result).to.be.equal(allUserMock);
    expect(result).to.have.length(2);
  });

  it('verifica o retorno da função getById', async function () {
    sinon.stub(productModel, 'getById').resolves(singleUser);

    const result = await productService.getById(1);
    expect(result.message).to.be.equal(singleUser);
  });

  it('verifica o retorno  da função getById retorna um erro caso não passado parametro', async function () {
    sinon.stub(productModel, 'getById').resolves(undefined);

    const result = await productService.getById(5);
    expect(result.message).to.be.equal('Product not found');
  });

  it('verifica o retorno da função addProduct', async function () {
    sinon.stub(productModel, 'addProduct').resolves(addedProduct);

    const result = await productService.addProduct({ name: 'Feijão tropeiro' });
    expect(result.message).to.be.equal(addedProduct);
  });

  it('verifica o retorno da inserção de uma venda válida', async function () {
    sinon.stub(salesModel, 'addSales').resolves({ id: 5, itemsSold: someSaleMock});

    const result = await saleService.insertSales(someSaleMock);
    expect(result.type).to.be.null;
    expect(result.message).to.be.deep.equal({ id: 5, itemsSold: someSaleMock });
  });

  it('verifica o retorno da inserção de uma venda inválida', async function () {
    sinon.stub(productModel, 'getById').resolves(undefined);

    const result = await saleService.insertSales(someSaleMock);
    expect(result.type).to.be.equal('PRODUCT_ID_NOT_FOUND');
    expect(result.message).to.be.equal('Product not found');
  });
});