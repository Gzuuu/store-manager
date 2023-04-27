const connection = require('./connection');

const addSales = async (sales) => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO sales (date) VALUES (NOW())`);

  const promisses = sales.map(async (sale) => {
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
      [insertId, sale.productId, sale.quantity],
    );
  });
  await Promise.all(promisses);
  return { id: insertId, itemsSold: sales };
};

module.exports = {
  addSales,
};