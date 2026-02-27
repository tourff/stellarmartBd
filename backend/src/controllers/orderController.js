const { Order, OrderItem, Product, Cart, User } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Generate order number
const generateOrderNumber = () => {
  return 'SM' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
};

// @desc    Create new order
// @route   POST /api/orders/create
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { 
      billingInfo, 
      shippingInfo, 
      items, 
      paymentMethod, 
      paymentStatus = 'pending',
      transactionId,
      shippingCost = 0,
      couponCode,
      discountAmount = 0,
      notes 
    } = req.body;

    const userId = req.user.id;

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name_en}` });
      }

      const itemTotal = product.selling_price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product_id: product.id,
        product_name: product.name_en,
        product_image: product.featured_image,
        variant_info: item.variant,
        quantity: item.quantity,
        unit_price: product.selling_price,
        total_price: itemTotal
      });

      // Update stock
      await product.update({
        stock_quantity: product.stock_quantity - item.quantity
      });
    }

    const totalAmount = subtotal + shippingCost - discountAmount;

    // Create order
    const order = await Order.create({
      order_number: generateOrderNumber(),
      user_id: userId,
      
      // Billing
      billing_name: billingInfo.name,
      billing_email: billingInfo.email,
      billing_phone: billingInfo.phone,
      billing_address: billingInfo.address,
      billing_city: billingInfo.city,
      billing_postal_code: billingInfo.postalCode,
      billing_country: billingInfo.country || 'Bangladesh',
            // Shipping
      shipping_name: shippingInfo.name || billingInfo.name,
      shipping_phone: shippingInfo.phone || billingInfo.phone,
      shipping_address: shippingInfo.address || billingInfo.address,
      shipping_city: shippingInfo.city || billingInfo.city,
      shipping_postal_code: shippingInfo.postalCode || billingInfo.postalCode,
      shipping_country: shippingInfo.country || 'Bangladesh',

      // Totals
      subtotal,
      shipping_cost: shippingCost,
      discount_amount: discountAmount,
      total_amount: totalAmount,

      // Payment
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      transaction_id: transactionId,

      // Notes
      customer_notes: notes
    });

    // Create order items
    for (const item of orderItems) {
      await OrderItem.create({
        ...item,
        order_id: order.id
      });
    }

    // Clear cart
    await Cart.destroy({ where: { user_id: userId } });

    res.status(201).json({
      success: true,
      order,
      orderItems: orderItems
    });
  } catch (error) {
    console.error('CreateOrder error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get my orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: OrderItem, as: 'items' }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('GetMyOrders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:orderId
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { 
        id: req.params.orderId,
        user_id: req.user.id
      },
      include: [
        { model: OrderItem, as: 'items' }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('GetOrderById error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify order (public)
// @route   GET /api/orders/verify/:orderId
// @access  Public
exports.verifyOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { order_number: req.params.orderId },
      include: [
        { model: OrderItem, as: 'items' }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('VerifyOrder error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:orderId/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { orderStatus, trackingNumber } = req.body;

    const order = await Order.findByPk(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({
      order_status: orderStatus,
      tracking_number: trackingNumber || order.tracking_number,
      shipped_date: orderStatus === 'shipped' ? new Date() : order.shipped_date,
      delivered_date: orderStatus === 'delivered' ? new Date() : order.delivered_date
    });

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('UpdateOrderStatus error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};