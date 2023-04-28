const { salesModel, productModel } = require('../models');

const insertSales = async (sales) => {
  const promisses = sales.map(async (sale) => productModel.getById(Number(sale.productId)));
  const verifyResult = await Promise.all(promisses);
  const verifyExists = verifyResult.some((result) => result === undefined);
  
  if (verifyExists) {
    return { type: 'PRODUCT_ID_NOT_FOUND', message: 'Product not found' };
  }
  
  const result = await salesModel.addSales(sales);
  return { type: null, message: result };
};

module.exports = {
  insertSales,
};