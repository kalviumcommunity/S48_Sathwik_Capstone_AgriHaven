import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if(res.ok) {
            const data = await res.json();
            setProduct(data);
        } else {
            navigate('/products');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <div className="product-detail-img">
        <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} crossOrigin="anonymous"/>
      </div>
      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <span className="category-badge">{product.category}</span>
        <p className="price">₹{product.price}</p>
        <p className="description">{product.description}</p>
        <p><strong>Supplier:</strong> {product.supplier}</p>
        <p><strong>Stock Status:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        
        <button 
          className="btn-add-cart-large"
          onClick={() => addToCart(product._id, 0)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
