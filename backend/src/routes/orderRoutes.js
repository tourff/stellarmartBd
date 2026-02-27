const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Generate order number
const generateOrderNumber = () => {
  return 'SM' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
};

// Create order
router.post('/create', auth, async (req, res) => {
  try {
    const { 
      billingInfo, 
      shippingInfo, 
      items, 
      paymentMethod, 
      paymentStatus = 'pending',
      shippingCost = 0,
      discountAmount = 0,
      notes 
    } = req.body;

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.sellingPrice * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.featuredImage,
        price: product.sellingPrice,
        quantity: item.quantity,
        total: itemTotal,
        variant: item.variant || {}
      });

      // Update stock
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stockQuantity: -item.quantity }
      });
    }

    const totalAmount = subtotal + shippingCost - discountAmount;

    // Create order
    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      user: req.user._id,
      billingName: billingInfo.name,
      billingEmail: billingInfo.email,
      billingPhone: billingInfo.phone,
      billingAddress: billingInfo.address,
      billingCity: billingInfo.city,
      billingPostalCode: billingInfo.postalCode,
      shippingName: shippingInfo.name || billingInfo.name,
      shippingPhone: shippingInfo.phone || billingInfo.phone,
      shippingAddress: shippingInfo.address || billingInfo.address,
      shippingCity: shippingInfo.city || billingInfo.city,
      shippingPostalCode: shippingInfo.postalCode || billingInfo.postalCode,
      subtotal,
      shippingCost,
      discountAmount,
      totalAmount,
      paymentMethod,
      paymentStatus,
      customerNotes: notes
    });

    // Create order items
    for (const item of orderItems) {
      await OrderItem.create({
        order: order._id,
        ...item
      });
    }

    // Clear cart
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product', 'name slug featuredImage');

    res.status(201).json({
      success: true,
      order: populatedOrder
    });
  } catch (error) {
    console.error('CreateOrder error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get my orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name slug featuredImage')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.orderId, 
      user: req.user._id 
    }).populate('items.product', 'name slug featuredImage');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
