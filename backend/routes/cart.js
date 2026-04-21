const express = require('express');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route GET /api/cart
// @access Private
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route POST /api/cart
// @access Private
router.post('/', protect, async (req, res) => {
  try {
    const { productId, qty } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].qty = qty;
    } else {
      cart.items.push({ product: productId, qty });
    }

    await cart.save();
    res.json(await cart.populate('items.product'));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route DELETE /api/cart
// @desc Clear cart
// @access Private
router.delete('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if(cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
