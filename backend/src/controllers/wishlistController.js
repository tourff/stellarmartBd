const { Wishlist, Product } = require('../models');

// @desc    Get wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: Product, as: 'product' }
      ]
    });

    res.json({
      success: true,
      wishlist
    });
  } catch (error) {
    console.error('GetWishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add to wishlist
// @route   POST /api/wishlist/add
// @access  Private
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if already in wishlist
    const exists = await Wishlist.findOne({
      where: { user_id: userId, product_id: productId }
    });

    if (exists) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    await Wishlist.create({
      user_id: userId,
      product_id: productId
    });

    res.json({
      success: true,
      message: 'Product added to wishlist'
    });
  } catch (error) {
    console.error('AddToWishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    await Wishlist.destroy({
      where: { user_id: userId, product_id: productId }
    });

    res.json({
      success: true,
      message: 'Product removed from wishlist'
    });
  } catch (error) {
    console.error('RemoveFromWishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};