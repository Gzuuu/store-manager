const { productModel } = require('../models');

const getAll = async () => {
  const result = await productModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productModel.getById(id);
  if (!result) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: result };
};

const addProduct = async ({ name }) => {
  const result = await productModel.addProduct(name);
  return { type: null, message: result };
};

module.exports = {
  getAll,
  getById,
  addProduct,
};
