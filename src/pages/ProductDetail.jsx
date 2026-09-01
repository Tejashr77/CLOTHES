import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  if (!product) {
    return (
      <div className="page-container container text-center">
        <h1 style={{ marginTop: '4rem' }}>Product Not Found</h1>
        <p style={{ marginTop: '1rem', color: 'var(--color-gray-dark)' }}>
          The product you're looking for doesn't exist.
        </p>
        <Link to="/shop" style={{ marginTop: '2rem', display: 'inline-block' }}>
          <Button variant="primary">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-container container">
      <div className="product-detail">
        <div className="product-detail-image-section">
          <div className="product-detail-image-wrapper">
            <img src={product.image} alt={product.name} className="product-detail-image" />
            {product.scarcity && (
              <span className="product-badge scarcity-badge">{product.scarcity}</span>
            )}
            {product.isPreorder && (
              <span className="product-badge preorder-badge">Pre-Order</span>
            )}
          </div>
        </div>

        <div className="product-detail-info">
          <p className="product-detail-category">{product.category}</p>
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">₹{product.price.toLocaleString()}</p>
          <p className="product-detail-description">{product.description}</p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="product-detail-sizes">
              <h3>Select Size</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-detail-quantity">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="product-detail-actions">
            <Button variant="primary" onClick={handleAddToCart}>
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/cart')}>View Cart</Button>
          </div>

          <div className="product-detail-meta">
            <p>Free shipping on orders above ₹50,000</p>
            <p>7-day exchange policy for RTW items</p>
            <p>Bespoke orders are final sale</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
