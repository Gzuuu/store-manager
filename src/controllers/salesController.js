const { saleService } = require('../services');

const insertSales = async (req, res) => {
  const { type, message } = await saleService.insertSales(req.body);
  if (type) return res.status(404).json({ message });
  return res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const result = await saleService.getSales();
  return res.status(200).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getSaleById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  insertSales,
  getSales,
  getSaleById,
};
