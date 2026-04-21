import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import API_BASE_URL from '../config';

const AdminOrders = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, token, navigate]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchOrders();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h2>Manage Orders</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total (₹)</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td>{o._id.substring(0, 8)}...</td>
                <td>{o.user?.name || 'Unknown'}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>{o.totalPrice}</td>
                <td>
                  <span style={{
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem',
                    background: o.status === 'Delivered' ? '#27ae60' : o.status === 'Shipped' ? '#3498db' : '#f39c12',
                    color: 'white'
                  }}>
                    {o.status || 'Pending'}
                  </span>
                </td>
                <td>
                  <select 
                    value={o.status || 'Pending'} 
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ddd' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
