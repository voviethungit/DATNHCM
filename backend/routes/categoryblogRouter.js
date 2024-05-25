const express = require('express');
const router = express.Router();
const categoryBlogController = require('../controllers/categoryBlogController');

router.get('/getAllCategories', categoryBlogController.getAllCategories);
router.post('/createCategory', categoryBlogController.createCategory);
router.patch('/updateCategory/:id', categoryBlogController.updateCategory);
router.delete('/deleteCategory/:id', categoryBlogController.deleteCategory);

module.exports = router;
