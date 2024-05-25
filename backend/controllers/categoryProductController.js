const CategoryProduct = require('../models/categoryproductModel');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryProduct.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const { nameCategory, imageCategory, status } = req.body;
  try {
    const newCategory = new CategoryProduct({ nameCategory, imageCategory, status });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { nameCategory, imageCategory, status } = req.body;
  try {
    const updatedCategory = await CategoryProduct.findByIdAndUpdate(req.params.id, { nameCategory, imageCategory, status }, { new: true });
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
    const deletedCategory = await CategoryProduct.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
