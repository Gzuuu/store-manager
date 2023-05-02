const express = require('express');
const { productController } = require('../controllers');
const { validateName } = require('../middlewares');

const router = express.Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post('/', validateName.validateNameInput, productController.addProduct);

router.put('/:id', validateName.validateNameInput, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;