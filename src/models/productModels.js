const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection.execute(`SELECT * FROM StoreManager.products
  WHERE id = ?`, [id]);
  return result;
};

const addProduct = async (product) => {
  const [{ insertId }] = await connection.execute(`INSERT INTO StoreManager.products (name)
  VALUES (?)`, [product]);
  return { id: insertId, name: product };
};

const editProduct = async (product, id) => {
  const SQL = `UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?;`;
  await connection.execute(SQL, [product, id]);
  return { id, name: product };
};

const deleteProduct = async (id) => {
  const SQL = `DELETE FROM StoreManager.products
  WHERE id = ?;`;
  await connection.execute(SQL, [id]);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  editProduct,
  deleteProduct,
};