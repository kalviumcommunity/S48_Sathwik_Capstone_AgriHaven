import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🌱 AgriHaven</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/products">Shop</Link></li>
        {user ? (
          <>
            {user.role === 'admin' && <li><Link to="/admin" className="admin-link">Admin Panel</Link></li>}
            <li><Link to="/orders">My Orders</Link></li>
            <li>
              <Link to="/cart">
                Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
            <li className="welcome-text">Hi, {user.name}</li>
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="btn-login">Login</Link></li>
            <li><Link to="/register" className="btn-register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
