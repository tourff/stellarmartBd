const { Cart, Product, User } = require('../models');

// @desc    Get cart
// @route   GET /api/cart/:sessionId
// @access  Public
exports.getCart = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user ? req.user.id : null;

    const where = sessionId ? { session_id: sessionId } : {};
    if (userId) {
      where.user_id = userId;
    }

    const cartItems = await Cart.findAll({
      where,
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name_en', 'slug', 'featured_image', 'selling_price', 'regular_price', 'stock_quantity'] }
      ]
    });

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.selling_price * item.quantity);
    }, 0);

    res.json({
      success: true,
      cartItems,
      total,
      totalItems: cartItems.length
    });
  } catch (error) {
    console.error('GetCart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add to cart
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, variant = null } = req.body;
    const userId = req.user.id;

    // Check product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Check if already in cart
    let cartItem = await Cart.findOne({
      where: { user_id: userId, product_id: productId }
    });

    if (cartItem) {
      // Update quantity
      const newQuantity = cartItem.quantity + quantity;
      if (newQuantity > product.stock_quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      await cartItem.update({ quantity: newQuantity });
    } else {
      // Create new cart item
      cartItem = await Cart.create({
        user_id: userId,
        product_id: productId,
        quantity,
        variant_data: variant
      });
    }

    // Return updated cart
    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name_en', 'slug', 'featured_image', 'selling_price', 'regular_price', 'stock_quantity'] }
      ]
    });

    res.json({
      success: true,
      cartItems,
      message: 'Product added to cart'
    });
  } catch (error) {
    console.error('AddToCart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/update
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const cartItem = await Cart.findOne({
      where: { user_id: userId, product_id: productId }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Check stock
    const product = await Product.findByPk(productId);
    if (quantity > product.stock_quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    if (quantity <= 0) {
      await cartItem.destroy();
    } else {
      await cartItem.update({ quantity });
    }

    // Return updated cart
    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name_en', 'slug', 'featured_image', 'selling_price', 'regular_price', 'stock_quantity'] }
      ]
    });

    res.json({
      success: true,
      cartItems
    });
  } catch (error) {
    console.error('UpdateCartItem error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    await Cart.destroy({
      where: { user_id: userId, product_id: productId }
    });

    // Return updated cart
    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name_en', 'slug', 'featured_image', 'selling_price', 'regular_price', 'stock_quantity'] }
      ]
    });

    res.json({
      success: true,
      cartItems,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('RemoveFromCart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.destroy({
      where: { user_id: userId }
    });

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('ClearCart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};