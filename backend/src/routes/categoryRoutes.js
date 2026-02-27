const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true, parent: null })
      .populate({
        path: 'subcategories',
        match: { isActive: true }
      })
      .sort({ order: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    console.error('GetCategories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured categories
router.get('/featured', async (req, res) => {
  try {
    const categories = await Category.find({ isFeatured: true, isActive: true })
      .limit(10)
      .sort({ order: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single category with products
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true })
      .populate({
        path: 'subcategories',
        match: { isActive: true }
      });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const Product = require('../models/Product');
    const products = await Product.find({ category: category._id, isActive: true })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.json({ success: true, category, products });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
