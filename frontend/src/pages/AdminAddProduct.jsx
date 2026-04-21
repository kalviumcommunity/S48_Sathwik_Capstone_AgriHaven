import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API_BASE_URL from '../config';

const AdminAddProduct = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('tools');
  const [stock, setStock] = useState('');
  const [supplier, setSupplier] = useState('');
  const [image, setImage] = useState(null);
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Redirect non-admins
  if (!user || user.role !== 'admin') {
    return <div className="admin-denied">Access Denied. Admins Only.</div>;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!image) {
      setError('Please upload an image.');
      return;
    }

    try {
      // 1. Upload Image
      const formData = new FormData();
      formData.append('image', image);

      const uploadRes = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.message || 'Image upload failed');
      }

      const imageUrl = uploadData.imageUrl;

      // 2. Create Product
      const productRes = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          category,
          stock: Number(stock),
          supplier,
          imageUrl
        })
      });

      const productData = await productRes.json();

      if (productRes.ok) {
        setMessage('Product added successfully!');
        // Reset form
        setName('');
        setDescription('');
        setPrice('');
        setCategory('tools');
        setStock('');
        setSupplier('');
        setImage(null);
        document.getElementById('image-upload').value = null; // Clear file input
      } else {
        throw new Error(productData.message || 'Product creation failed');
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during submission.');
    }
  };

  const categories = ['tools', 'manure', 'seeds', 'irrigation', 'pest control'];

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-form-card">
        <h3>Add New Product</h3>
        
        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={submitHandler} className="admin-form">
          <div className="form-group grid-2">
            <div>
              <label>Product Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" />
            </div>
            <div>
              <label>Price (₹)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="form-control" rows="3"></textarea>
          </div>

          <div className="form-group grid-2">
            <div>
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control">
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Stock Quantity</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required min="0" className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label>Supplier Name</label>
            <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} required className="form-control" />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" id="image-upload" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required className="form-control file-input" />
          </div>

          <button type="submit" className="btn-primary w-100">Upload Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
