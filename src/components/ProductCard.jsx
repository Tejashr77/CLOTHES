import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id || product.id}`} className="product-card-image-link">
        <div className="product-card-image-wrapper">
          <img src={product.image} alt={product.name} className="product-card-image" />
          {product.scarcity && (
            <span className="product-badge scarcity-badge">{product.scarcity}</span>
          )}
          {product.isPreorder && (
            <span className="product-badge preorder-badge">Pre-Order</span>
          )}
        </div>
      </Link>
      
      <div className="product-card-details">
        <h3 className="product-card-title">
          <Link to={`/product/${product._id || product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-card-price">₹{product.price.toLocaleString()}</p>
        <p className="product-card-category">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
