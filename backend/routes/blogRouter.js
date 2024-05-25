const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blogs
router.get('/getAllBlogs', blogController.getAllBlogs);

// Get a single blog by ID
router.get('/getBlogById/:id', blogController.getBlogById);

// Create a new blog
router.post('/createBlog', blogController.createBlog);

// Update an existing blog
router.patch('/updateBlog/:id', blogController.updateBlog);

// Delete a blog
router.delete('/deleteBlog/:id', blogController.deleteBlog);

module.exports = router;
