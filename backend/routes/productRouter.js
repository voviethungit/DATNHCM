const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/createProduct', productController.createProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;
