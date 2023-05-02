const allProducts = [
    { id: 1, name: 'Maria do bairro' },
    { id: 2, name: 'Joãozinho' },
];
  
const singleProduct = { id: 1, name: 'Maria do bairro' };

const addedProduct = { id: 13, name: 'Feijão tropeiro' };

const someSaleMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 15
  }];

const serviceGoodReturn = {
  id: 5,
  itemsSold: someSaleMock,
};

const wrongSaleMock = [
  {
    "productId": 25,
    "quantity": 32
  }
];

const allSalesMock = [
  {
    saleId: 3,
    date: '2023-04-27T21:34:41.000Z',
    productId: 1,
    quantity: 1
  },
  {
    saleId: 3,
    date: '2023-04-27T21:34:41.000Z',
    productId: 2,
    quantity: 5
  }
];

const specificSaleMock = [{
  date: '2023-04-27T21:34:41.000Z',
  productId: 1,
  quantity: 1
}];

const updatedMockValue = {
  id: 3,
  name: 'Chesperito',
}

module.exports = {
  allProducts,
  singleProduct,
  addedProduct,
  someSaleMock,
  serviceGoodReturn,
  wrongSaleMock,
  allSalesMock,
  specificSaleMock,
  updatedMockValue,
};