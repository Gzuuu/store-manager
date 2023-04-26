const { productService } = require('../services');

const getAll = async (_req, res) => {
  const result = await productService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(Number(id));
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
};
