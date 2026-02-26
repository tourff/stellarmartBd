const { Category, Product } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { is_active: true, parent_id: null },
      include: [
        { 
          model: Category, 
          as: 'subcategories',
          where: { is_active: true },
          required: false
        }
      ],
      order: [['order_by', 'ASC']]
    });

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('GetCategories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get featured categories
// @route   GET /api/categories/featured
// @access  Public
exports.getFeaturedCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { is_featured: true, is_active: true, parent_id: null },
      order: [['order_by', 'ASC']],
      limit: 10
    });

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('GetFeaturedCategories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get category by slug
// @route   GET /api/categories/:slug
// @access  Public
exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { slug: req.params.slug, is_active: true },
      include: [
        { model: Category, as: 'subcategories', where: { is_active: true }, required: false }
      ]
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Get products in this category
    const products = await Product.findAll({
      where: { 
        category_id: category.id,
        is_active: true 
      },
      order: [['created_at', 'DESC']],
      limit: 20
    });

    res.json({
      success: true,
      category,
      products
    });
  } catch (error) {
    console.error('GetCategoryBySlug error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create category (Admin)
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      category
    });
  } catch (error) {
    console.error('CreateCategory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update category (Admin)
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.update(req.body);

    res.json({
      success: true,
      category
    });
  } catch (error) {
    console.error('UpdateCategory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete category (Admin)
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('DeleteCategory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};