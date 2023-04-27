const { saleService } = require('../services');

const insertSales = async (req, res) => {
  const { type, message } = await saleService.insertSales(req.body);
  if (type) return res.status(404).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  insertSales,
};
