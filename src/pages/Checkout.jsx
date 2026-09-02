import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../api/client';
import { GlassButton } from '../components/glass';
import { formatPrice } from '../utils/helpers';
import { Check, Lock, Truck, ShieldCheck } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
  });

  const shippingPrice = cartTotal >= 50000 ? 0 : 1500;
  const totalPrice = cartTotal + shippingPrice;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { navigate('/account'); return; }
    setError('');
    setLoading(true);
    try {
      const orderItems = cartItems.map(item => ({
        product: item._id || item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
      }));
      await api.createOrder({ items: orderItems, shippingAddress: address, paymentMethod: 'razorpay' });
      await clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-success">
        <div className="checkout-success-card text-center">
          <div className="success-icon">
            <Check size={40} strokeWidth={2} />
          </div>
          <h1 className="success-title">Order Placed!</h1>
          <p className="success-desc">
            Thank you for your order. You can track it in your account.
          </p>
          <div className="success-actions">
            <GlassButton variant="primary" onClick={() => navigate('/orders')}>View My Orders</GlassButton>
            <GlassButton variant="outline" onClick={() => navigate('/shop')}>Continue Shopping</GlassButton>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-page-header text-center">
          <p className="section-eyebrow">Checkout</p>
          <h1>Secure Checkout</h1>
        </div>

        {/* Steps Indicator */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-line" />
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-label">Review</span>
          </div>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            {step === 1 && (
              <div className="checkout-section">
                <h2 className="checkout-section-title">Shipping Address</h2>
                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input type="text" placeholder="123 Main St" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="glass-input" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" placeholder="Mumbai" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="glass-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input type="text" placeholder="Maharashtra" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} className="glass-input" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Pincode</label>
                  <input type="text" placeholder="400050" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })} className="glass-input" required />
                </div>
                <GlassButton variant="primary" size="lg" className="w-full" type="button" onClick={() => setStep(2)}>
                  Review Order
                </GlassButton>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-section">
                <h2 className="checkout-section-title">Review Your Order</h2>
                <div className="review-address glass-subtle" style={{ padding: 'var(--zq-space-4)', borderRadius: 'var(--zq-radius-lg)', marginBottom: 'var(--zq-space-6)' }}>
                  <p className="text-sm font-semibold mb-2">Shipping To:</p>
                  <p className="text-sm text-muted">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                  <button type="button" className="edit-link" onClick={() => setStep(1)}>Edit</button>
                </div>

                {cartItems.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="review-item">
                    <img src={item.image} alt={item.name} className="review-item-img" />
                    <div className="review-item-info">
                      <p className="review-item-name">{item.name}</p>
                      {item.selectedSize && <p className="text-xs text-muted">Size: {item.selectedSize}</p>}
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="review-item-price">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}

                {error && <p className="checkout-error">{error}</p>}

                <GlassButton variant="primary" size="lg" className="w-full" disabled={loading} type="submit">
                  <Lock size={16} strokeWidth={1.5} />
                  {loading ? 'Placing Order...' : `Place Order — ${formatPrice(totalPrice)}`}
                </GlassButton>
              </div>
            )}
          </form>

          <div className="checkout-summary">
            <h2 className="checkout-summary-title">Order Summary</h2>
            {cartItems.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="summary-item">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span className={shippingPrice === 0 ? 'text-success' : ''}>
                {shippingPrice === 0 ? 'Free' : formatPrice(shippingPrice)}
              </span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item summary-total">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="checkout-trust">
              <div className="trust-item"><Lock size={14} strokeWidth={1.5} /><span>Secure payment</span></div>
              <div className="trust-item"><Truck size={14} strokeWidth={1.5} /><span>Free shipping above ₹50,000</span></div>
              <div className="trust-item"><ShieldCheck size={14} strokeWidth={1.5} /><span>Buyer protection</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
