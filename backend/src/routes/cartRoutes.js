const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name slug featuredImage sellingPrice regularPrice stockQuantity');

    if (!cart) {
      cart = { items: [] };
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product?.sellingPrice || 0) * item.quantity;
    }, 0);

    res.json({ success: true, cart, total, totalItems: cart.items?.length || 0 });
  } catch (error) {
    console.error('GetCart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1, variant = {} } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.sellingPrice,
        variant
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name slug featuredImage sellingPrice');

    res.json({ success: true, cart: updatedCart, message: 'Added to cart' });
  } catch (error) {
    console.error('AddToCart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity, variant = {} } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name slug featuredImage sellingPrice');

    res.json({ success: true, cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name slug featuredImage sellingPrice');

    res.json({ success: true, cart: updatedCart, message: 'Removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
