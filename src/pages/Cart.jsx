import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { GlassButton, GlassFlyout } from '../components/glass';
import { formatPrice } from '../utils/helpers';
import { Trash2, Plus, Minus, ArrowRight, Gift } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [giftNote, setGiftNote] = useState('');
  const [showGift, setShowGift] = useState(false);

  const shippingPrice = cartTotal >= 50000 ? 0 : 1500;
  const totalWithShipping = cartTotal + shippingPrice;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="text-center" style={{ padding: 'var(--zq-space-12) 0 var(--zq-space-8)' }}>
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: 'var(--zq-gold)' }}>Shopping Bag</p>
          <h1>Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart text-center">
            <div className="empty-cart-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--zq-gray-300)" strokeWidth="1"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
            <h3 className="mt-6 mb-4">Your bag is empty</h3>
            <p className="text-muted mb-8">Discover our collection and find something you love.</p>
            <Link to="/shop"><GlassButton variant="primary">Start Shopping</GlassButton></Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="cart-item glass-card">
                  <Link to={`/product/${item._id || item.id}`} className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className="cart-item-details">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item._id || item.id}`} className="cart-item-name">{item.name}</Link>
                        {item.selectedSize && <p className="text-sm text-muted mt-1">Size: {item.selectedSize}</p>}
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id || item._id, item.selectedSize)} aria-label="Remove">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="quantity-selector-sm">
                        <button onClick={() => updateQuantity(item.id || item._id, item.selectedSize, item.quantity - 1)}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id || item._id, item.selectedSize, item.quantity + 1)}><Plus size={14} /></button>
                      </div>
                      <p className="cart-item-price">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Gift Note */}
              <div className="gift-section">
                <button className="gift-toggle" onClick={() => setShowGift(!showGift)}>
                  <Gift size={18} />
                  <span>Add a gift note</span>
                </button>
                {showGift && (
                  <div className="gift-note-form">
                    <textarea placeholder="Add a personal message..." value={giftNote} onChange={e => setGiftNote(e.target.value)} rows={3} className="glass-input glass-textarea" />
                  </div>
                )}
              </div>
            </div>

            <div className="cart-summary glass-card">
              <h3 className="mb-6">Order Summary</h3>
              <div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shippingPrice === 0 ? 'Free' : formatPrice(shippingPrice)}</span></div>
              {shippingPrice > 0 && <p className="free-ship-note">Free shipping on orders above ₹50,000</p>}
              <div className="summary-row total"><span>Total</span><span>{formatPrice(totalWithShipping)}</span></div>
              <GlassButton variant="primary" size="lg" className="w-full mt-6" onClick={() => navigate(isAuthenticated ? '/checkout' : '/account')}>
                Proceed to Checkout <ArrowRight size={16} />
              </GlassButton>
              <button className="clear-cart-link mt-4" onClick={clearCart}>Clear Cart</button>
              <Link to="/shop" className="continue-link mt-4">Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
