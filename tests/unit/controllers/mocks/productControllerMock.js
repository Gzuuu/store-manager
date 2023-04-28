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

module.exports = {
  allProducts,
  singleProduct,
  addedProduct,
  someSaleMock,
  serviceGoodReturn,
  wrongSaleMock,
};