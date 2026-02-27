const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get wishlist
router.get('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products', 'name slug featuredImage sellingPrice regularPrice rating');

    if (!wishlist) {
      wishlist = { products: [] };
    }

    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to wishlist
router.post('/add', auth, async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }

    if (wishlist.products.includes(productId)) {
      return res.status(400).json({ message: 'Already in wishlist' });
    }

    wishlist.products.push(productId);
    await wishlist.save();

    const updatedWishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products', 'name slug featuredImage sellingPrice regularPrice rating');

    res.json({ success: true, wishlist: updatedWishlist, message: 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      p => p.toString() !== req.params.productId
    );

    await wishlist.save();

    const updatedWishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products', 'name slug featuredImage sellingPrice regularPrice rating');

    res.json({ success: true, wishlist: updatedWishlist, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
