const { salesModel } = require('../models');

const insertSales = async (sales) => {
  const id = await salesModel.addSaleDate();
  const promisses = sales.map(async (sale) => await salesModel.addSales(sale, id));
  await Promise.all(promisses);
  const result = { id, itemsSold: sales };
  return {type: null, message: result };
};

module.exports = {
  insertSales,
}