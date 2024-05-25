const express = require('express');
const router = express.Router();
const categoryProductController = require('../controllers/categoryProductController');

router.get('/getAllCategories', categoryProductController.getAllCategories);
router.post('/createCategory', categoryProductController.createCategory);
router.patch('/updateCategory/:id', categoryProductController.updateCategory);
router.delete('/deleteCategory/:id', categoryProductController.deleteCategory);

module.exports = router;
