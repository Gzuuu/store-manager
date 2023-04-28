const express = require('express');
const { salesController } = require('../controllers');
const { validateSaleInsert } = require('../middlewares');

const router = express.Router();

router.post('/', validateSaleInsert.verifyQuantityAndProduct, salesController.insertSales);

router.get('/', salesController.getSales);

module.exports = router;