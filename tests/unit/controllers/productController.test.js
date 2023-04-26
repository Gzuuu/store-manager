const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { allProducts, singleProduct } = require('./mocks/productControllerMock');
const { productController } = require('../../../src/controllers');

describe('testes da camada controller', function () {
  afterEach(() => sinon.restore());
  it('verica o resultado da função getAll', async function () {
    sinon.stub(productService, 'getAll').resolves(allProducts);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('verifica o resultado da função FindById', async function () {
    sinon.stub(productService, 'getById').resolves({ type: null, message: singleProduct });

    const req = { params: { id: 2 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(singleProduct);
  });

  it('verifica o resultado da função findById caso o id seja inválido', async function () {
    sinon.stub(productService, 'getById').resolves({ type: 'NOT_FOUND', message: 'Product not found' });

    const req = { params: { id: 9 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getById(req, res);
    expect(res.status).to.have.be.calledWith(404);
    expect(res.json).to.have.be.calledWith({ message: 'Product not found' });
  });
});