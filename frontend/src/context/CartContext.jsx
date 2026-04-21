import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import API_BASE_URL from '../config';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.ok) {
          const data = await res.json();
          if(data && data.items) setCartItems(data.items);
      }
    } catch (e) {
        console.error(e);
    }
  };

  const addToCart = async (productId, currentQty) => {
    if (!token) return alert('Please login to add to cart');
    try {
      const res = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, qty: currentQty + 1 })
      });
      if(res.ok) {
          const data = await res.json();
          setCartItems(data.items);
      }
    } catch (e) { console.error(e); }
  };
  
  const clearCartState = () => {
      setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, fetchCart, addToCart, clearCartState }}>
      {children}
    </CartContext.Provider>
  );
};
