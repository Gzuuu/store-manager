const snakeize = require('snakeize');
const connection = require('./connection');

const addSaleDate = async () => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO sales (date) VALUES (NOW())`);
  return insertId;
};

const addSales = async (sale, saleId) => {
  const columns = Object.keys(snakeize(sale)).join(', ');
  console.log(columns);
  const placeholders = Object.keys(sale)
    .map((_key) => '?')
    .join(', ');

  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
    [saleId, ...Object.values(sale)],
  );
};

module.exports = {
  addSales,
  addSaleDate,
};