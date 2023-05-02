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

const getSales = async () => {
  const SQL = `SELECT SP.sale_id AS saleId,
S.date AS date,
SP.product_id AS productId,
SP.quantity AS quantity
FROM StoreManager.sales_products AS SP
INNER JOIN StoreManager.sales AS S
WHERE S.id = SP.sale_id
ORDER BY SP.sale_id, SP.product_id;`;
  const [result] = await connection.execute(SQL);
  return result;
};

const getSalesById = async (id) => {
  const SQL = `SELECT S.date AS date,
SP.product_id AS productId,
SP.quantity AS quantity
FROM StoreManager.sales_products AS SP
INNER JOIN StoreManager.sales AS S
ON S.id = SP.sale_id
WHERE S.id = ?
ORDER BY SP.sale_id, SP.product_id;`;
  
  const [result] = await connection.execute(SQL, [id]);
  return result;
};

const deleteSale = async (id) => {
  const SQL = `DELETE A, B FROM StoreManager.sales AS A
LEFT JOIN StoreManager.sales_products AS B
ON A.id = B.sale_id
WHERE A.id = ?;`;
  
  await connection.execute(SQL, [id]);
};

module.exports = {
  addSales,
  getSales,
  getSalesById,
  deleteSale,
};