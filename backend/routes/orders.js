const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @route POST /api/orders
// @access Private
router.post('/', protect, async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  } else {
    try {
      const order = new Order({
        user: req.user.id,
        items: orderItems.map(item => ({
          product: item.product,
          qty: item.qty,
          price: item.price
        })),
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// @route GET /api/orders
// @desc Get logged in user orders
// @access Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/orders/all
// @desc Get all orders
// @access Private/Admin
router.get('/all', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name').populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route PUT /api/orders/:id/status
// @desc Update order status
// @access Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
