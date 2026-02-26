const { Product, Category, User, ProductReview } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      subcategory, 
      brand,
      minPrice,
      maxPrice,
      sort = 'newest',
      search
    } = req.query;

    const where = { is_active: true };

    // Category filter
    if (category) {
      where.category_id = category;
    }

    // Subcategory filter
    if (subcategory) {
      where.subcategory_id = subcategory;
    }

    // Brand filter
    if (brand) {
      where.brand_id = brand;
    }

    // Price range
    if (minPrice || maxPrice) {
      where.selling_price = {};
      if (minPrice) where.selling_price[Op.gte] = minPrice;
      if (maxPrice) where.selling_price[Op.lte] = maxPrice;
    }

    // Search
    if (search) {
      where[Op.or] = [
        { name_en: { [Op.like]: `%${search}%` } },
        { name_bn: { [Op.like]: `%${search}%` } }
      ];
    }

    // Sorting
    let order;
    switch (sort) {
      case 'price-low':
        order = [['selling_price', 'ASC']];
        break;
      case 'price-high':
        order = [['selling_price', 'DESC']];
        break;
      case 'name':
        order = [['name_en', 'ASC']];
        break;
      default:
        order = [['created_at', 'DESC']];
    }

    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name_en', 'slug'] }
      ],
      order,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      products,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('GetProducts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { is_featured: true, is_active: true },
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name_en', 'slug'] }
      ],
      order: [['created_at', 'DESC']],
      limit: 12
    });

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('GetFeaturedProducts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get new arrival products
// @route   GET /api/products/new-arrivals
// @access  Public
exports.getNewArrivals = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { is_new_arrival: true, is_active: true },
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name_en', 'slug'] }
      ],
      order: [['created_at', 'DESC']],
      limit: 12
    });

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('GetNewArrivals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get best seller products
// @route   GET /api/products/best-sellers
// @access  Public
exports.getBestSellers = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { is_best_seller: true, is_active: true },
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name_en', 'slug'] }
      ],
      order: [['created_at', 'DESC']],
      limit: 12
    });

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('GetBestSellers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get product by slug
// @route   GET /api/products/:slug
// @access  Public
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug, is_active: true },
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name_en', 'slug'] }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Get related products
    const relatedProducts = await Product.findAll({
      where: { 
        category_id: product.category_id,
        id: { [Op.ne]: product.id },
        is_active: true
      },
      limit: 8
    });

    res.json({
      success: true,
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('GetProductBySlug error:', error);
        res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await ProductReview.findAll({
      where: { product_id: req.params.id, status: 'approved' },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }
      ],
      order: [['created_at', 'DESC']]
    });

    // Calculate average rating
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;

    res.json({
      success: true,
      reviews,
      averageRating: avgRating.toFixed(1),
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('GetProductReviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    // Check if admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const product = await Product.create({
      ...req.body,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('CreateProduct error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update(req.body);

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('UpdateProduct error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('DeleteProduct error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};