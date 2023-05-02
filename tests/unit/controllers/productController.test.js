const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService, saleService } = require('../../../src/services');
const {
  allProducts,
  singleProduct,
  addedProduct,
  someSaleMock,
  serviceGoodReturn,
  wrongSaleMock, 
  allSalesMock, 
  specificSaleMock,
  updatedMockValue} = require('./mocks/productControllerMock');
const { productController, salesController } = require('../../../src/controllers');

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

  it('verifica o resultado da função addProduct', async function () {
    sinon.stub(productService, 'addProduct').resolves({ type: null, message: addedProduct })

    const req = { body: { name: 'Feijão tropeiro' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.addProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(addedProduct);
  });

  it('verifica o resultado da inserção de algumas vendas', async function () {
    sinon.stub(saleService, 'insertSales').resolves({ type: null, message: serviceGoodReturn })
    
    const req = { body: someSaleMock };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.insertSales(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(serviceGoodReturn);
  });

  it('verifica o resultado da inserção de um produto inexistente', async function () {
    sinon.stub(saleService, 'insertSales').resolves({ type: 'PRODUCT_ID_NOT_FOUND', message: 'Product not found' });

    const req = { body: wrongSaleMock };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesController.insertSales(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('verifica se o resultado da função getAllSales é o esperado', async function () {
    sinon.stub(saleService, 'getSales').resolves(allSalesMock);

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesMock);
  });

  it('verifica o resultado da função getSaleById é o esperado', async function () {
    sinon.stub(saleService, 'getSaleById').resolves({ type: null, message: specificSaleMock });

    const req = { params: { id: 5 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const result = await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(specificSaleMock);
  });

  it('verifica o resultado da função getSaleById quando o ID é inválido', async function () {
    sinon.stub(saleService, 'getSaleById').resolves({ type: 'SALE_NOT_FOUND', message: 'Product not found' });

    const req = { params: { id: 12 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('verifica a atualização de um produto', async function () {
    sinon.stub(productService, 'updateProduct').resolves({ type: null, message: updatedMockValue })
    
    const req = {
      body: { name: 'Chesperito' },
      params: { id: 3 }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedMockValue);
  });

  it('verifica a atualização de um produto inexistente', async function () {
    sinon.stub(productService, 'updateProduct').resolves({ type: 'NOT_FOUND', message: 'Product not found' });
    
    const req = {
      body: { name: 'Chesperito' },
      params: { id: 30 }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});