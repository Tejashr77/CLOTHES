import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, compact = false, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const productId = product._id || product.id;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div
      className={`pq-card ${compact ? 'pq-card-compact' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${productId}`} className="pq-card-link" data-cursor="view">
        <div className="pq-card-image-wrapper">
          {!imageLoaded && <div className="pq-card-skeleton" />}
          <img
            src={product.image}
            alt={product.name}
            className={`pq-card-image ${imageLoaded ? 'loaded' : ''}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div className="pq-card-badges">
            {hasDiscount && (
              <span className="pq-badge pq-badge-sale">-{discountPercent}%</span>
            )}
            {product.scarcity && (
              <span className="pq-badge pq-badge-scarcity">{product.scarcity}</span>
            )}
            {product.isPreorder && (
              <span className="pq-badge pq-badge-preorder">Pre-Order</span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className={`pq-card-overlay ${isHovered ? 'visible' : ''}`}>
            {onQuickView && (
              <button
                className="pq-overlay-btn"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(); }}
                aria-label="Quick view"
                data-cursor="add"
              >
                <Eye size={18} strokeWidth={1.5} />
                <span>Quick View</span>
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Details */}
      <div className="pq-card-details">
        <p className="pq-card-category">{product.category}</p>
        <Link to={`/product/${productId}`} className="pq-card-title">
          {product.name}
        </Link>
        <div className="pq-card-price-row">
          <span className="pq-card-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <span className="pq-card-original-price">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        {product.sizes?.length > 0 && !compact && (
          <p className="pq-card-sizes">
            Sizes: {product.sizes.slice(0, 4).join(', ')}{product.sizes.length > 4 ? '...' : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
