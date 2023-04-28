const { saleService } = require('../services');

const insertSales = async (req, res) => {
  const { type, message } = await saleService.insertSales(req.body);
  if (type) return res.status(404).json({ message });
  return res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const result = await saleService.getSales();
  return res.status(200).json(result);
}

module.exports = {
  insertSales,
  getSales,
};
