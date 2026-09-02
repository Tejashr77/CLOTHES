import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { GlassButton } from '../components/glass';
import { formatPrice } from '../utils/helpers';
import { Trash2, Plus, Minus, ArrowRight, Gift, ShoppingBag, ArrowLeft, Truck } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [giftNote, setGiftNote] = useState('');
  const [showGift, setShowGift] = useState(false);

  const shippingPrice = cartTotal >= 50000 ? 0 : 1500;
  const totalWithShipping = cartTotal + shippingPrice;
  const freeShippingDiff = 50000 - cartTotal;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-page-header">
          <p className="section-eyebrow">Shopping Bag</p>
          <h1>Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart text-center">
            <div className="empty-cart-icon">
              <ShoppingBag size={64} strokeWidth={1} />
            </div>
            <h3 className="empty-cart-title">Your bag is empty</h3>
            <p className="empty-cart-desc">Discover our collection and find something you love.</p>
            <Link to="/shop">
              <GlassButton variant="primary">Start Shopping</GlassButton>
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              {/* Free Shipping Progress */}
              {freeShippingDiff > 0 && (
                <div className="free-ship-progress">
                  <Truck size={16} strokeWidth={1.5} />
                  <p>Add <strong>{formatPrice(freeShippingDiff)}</strong> more for free shipping</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(100, (cartTotal / 50000) * 100)}%` }} />
                  </div>
                </div>
              )}

              {cartItems.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                  <Link to={`/product/${item._id || item.id}`} className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <Link to={`/product/${item._id || item.id}`} className="cart-item-name">{item.name}</Link>
                        {item.selectedSize && <p className="cart-item-meta">Size: {item.selectedSize}</p>}
                      </div>
                      <button className="cart-remove-btn" onClick={() => removeFromCart(item.id || item._id, item.selectedSize)} aria-label="Remove item">
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="cart-quantity">
                        <button onClick={() => updateQuantity(item.id || item._id, item.selectedSize, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <Minus size={14} strokeWidth={1.5} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id || item._id, item.selectedSize, item.quantity + 1)}>
                          <Plus size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="cart-item-price">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Gift Note */}
              <div className="gift-section">
                <button className="gift-toggle" onClick={() => setShowGift(!showGift)}>
                  <Gift size={18} strokeWidth={1.5} />
                  <span>Add a gift note</span>
                  <ChevronDown size={14} className={`gift-chevron ${showGift ? 'open' : ''}`} />
                </button>
                {showGift && (
                  <div className="gift-note-form">
                    <textarea placeholder="Add a personal message..." value={giftNote} onChange={e => setGiftNote(e.target.value)} rows={3} className="glass-input glass-textarea" />
                  </div>
                )}
              </div>

              <Link to="/shop" className="continue-shopping">
                <ArrowLeft size={16} strokeWidth={1.5} />
                Continue Shopping
              </Link>
            </div>

            <div className="cart-summary">
              <h3 className="summary-title">Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className={shippingPrice === 0 ? 'text-success' : ''}>
                  {shippingPrice === 0 ? 'Free' : formatPrice(shippingPrice)}
                </span>
              </div>
              {shippingPrice > 0 && (
                <p className="free-ship-note">Free shipping on orders above ₹50,000</p>
              )}
              <div className="summary-divider" />
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{formatPrice(totalWithShipping)}</span>
              </div>
              <GlassButton variant="primary" size="lg" className="w-full checkout-btn" onClick={() => navigate(isAuthenticated ? '/checkout' : '/account')}>
                Proceed to Checkout <ArrowRight size={16} strokeWidth={1.5} />
              </GlassButton>
              <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
