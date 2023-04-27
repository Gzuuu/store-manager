const { salesModel, productModel } = require('../models');

const verifyIdExist = async (sales) => {
  const promisses = sales.map(async (sale) => productModel.getById(Number(sale.productId)));
  const results = await Promise.all(promisses);
  return results.some((result) => result === undefined);
};

const insertSales = async (sales) => {
  if (await verifyIdExist(sales)) {
    return { type: 'PRODUCT_ID_NOT_FOUND', message: 'Product not found' };
  }
  const result = await salesModel.addSales(sales);
  return { type: null, message: result };
};

module.exports = {
  insertSales,
};