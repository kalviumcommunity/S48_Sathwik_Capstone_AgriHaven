import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import API_BASE_URL from '../config';

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}/api/products`),
          fetch(`${API_BASE_URL}/api/orders/all`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const usersData = await usersRes.json();
        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();

        setStats({
          users: usersData.length || 0,
          products: productsData.length || 0,
          orders: ordersData.length || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, token, navigate]);

  if (loading) return <div className="loading-spinner">Loading Dashboard...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h2>Admin Overview</h2>
        <div className="dashboard-stats glass-panel">
          <div className="stat-card">
            <h4>Total Users</h4>
            <p className="stat-number">{stats.users}</p>
          </div>
          <div className="stat-card">
            <h4>Total Products</h4>
            <p className="stat-number">{stats.products}</p>
          </div>
          <div className="stat-card">
            <h4>Total Orders</h4>
            <p className="stat-number">{stats.orders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
