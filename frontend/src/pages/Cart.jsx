import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import API_BASE_URL from '../config';

const Cart = () => {
  const { cartItems, fetchCart, clearCartState } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  const placeOrderHandler = async () => {
    try {
      // 1. Create order
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderItems: cartItems.map(item => ({
            product: item.product._id,
            qty: item.qty,
            price: item.product.price
          })),
          totalPrice: total
        })
      });

      if (res.ok) {
        // 2. Clear backend cart
        await fetch(`${API_BASE_URL}/api/cart`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        clearCartState();
        navigate('/orders');
      } else {
        alert('Could not place order. Please try again.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (cartItems.length === 0) {
    return <div className="cart-empty">Your cart is empty</div>;
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item._id || item.product._id} item={item} />
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {cartItems.reduce((acc, item) => acc + item.qty, 0)}</p>
          <h4>Total: ₹{total}</h4>
          <button className="btn-primary w-100 mt-3" onClick={placeOrderHandler}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
