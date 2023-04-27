const { saleService } = require('../services');

const insertSales = async (req, res) => {
  const { type, message } = await saleService.insertSales(req.body);
  return res.status(201).json(message);
};

module.exports = {
  insertSales,
};
