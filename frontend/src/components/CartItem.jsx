import React from 'react';
import API_BASE_URL from '../config';

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <img src={`${API_BASE_URL}${item.product.imageUrl}`} alt={item.product.name} crossOrigin="anonymous"/>
      <div className="cart-item-details">
        <h4>{item.product.name}</h4>
        <p>Price: ₹{item.product.price}</p>
      </div>
      <div className="cart-item-qty">
        <p>Qty: {item.qty}</p>
      </div>
      <div className="cart-item-total">
        <p>₹{item.product.price * item.qty}</p>
      </div>
    </div>
  );
};

export default CartItem;
