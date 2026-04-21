import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li>
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
