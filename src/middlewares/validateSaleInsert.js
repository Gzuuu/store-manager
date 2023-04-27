const verifyQuantityAndProduct = (req, res, next) => {
  const productIdIsDefined = req.body.some((arr) => arr.productId === undefined);
  const quantityIsDefined = req.body.some((arr) => arr.quantity === undefined);
  const quantityValue = req.body.some((arr) => Number(arr.quantity) < 1);

  if (productIdIsDefined) return res.status(400).json({ message: '"productId" is required' });
  if (quantityIsDefined) return res.status(400).json({ message: '"quantity" is required' });
  if (quantityValue) {
 return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' }); 
}

  next();
};

module.exports = {
  verifyQuantityAndProduct,
};
