import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  const fetchProducts = async (cat = '') => {
    try {
      const url = cat ? `http://localhost:5000/api/products?category=${cat}` : 'http://localhost:5000/api/products';
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  const categories = ['tools', 'manure', 'seeds', 'irrigation', 'pest control'];

  return (
    <div className="products-page">
      <h2>All Products</h2>
      <div className="filter-section">
        <label>Filter by Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
