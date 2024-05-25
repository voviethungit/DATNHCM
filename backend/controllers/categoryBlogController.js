const CategoryBlog = require('../models/categoryblogModel');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryBlog.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new CategoryBlog({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
      const updatedCategory = await CategoryBlog.findByIdAndUpdate(req.params.id, { name }, { new: true });
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.deleteCategory = async (req, res) => {
  try {
    await CategoryBlog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
