import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} className="product-image" crossOrigin="anonymous"/>
      </Link>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category-badge">{product.category}</p>
        <p className="price">₹{product.price}</p>
        <button 
          className="btn-add-cart" 
          onClick={() => addToCart(product._id, 0)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
