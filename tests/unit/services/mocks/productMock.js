const allUserMock = [
  { id: 1, name: 'Maria do bairro' },
  { id: 2, name: 'Joãozinho' },
];

const singleUser = { id: 1, name: 'Maria do bairro' };

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

module.exports = {
  allUserMock,
  singleUser,
  addedProduct,
  someSaleMock,
  allSalesMock,
  specificSaleMock,
};
