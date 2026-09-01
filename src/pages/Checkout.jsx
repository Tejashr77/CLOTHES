import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../api/client';
import Button from '../components/Button';
import './Checkout.css';

const Checkout = () => {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
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
    if (!isAuthenticated) {
      navigate('/account');
      return;
    }
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
      <div className="page-container container text-center">
        <div style={{ marginTop: '4rem' }}>
          <h1>Order Placed!</h1>
          <p style={{ marginTop: '1rem', color: 'var(--color-gray-dark)' }}>
            Thank you for your order. You can track it in your account.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Button variant="primary" onClick={() => navigate('/orders')}>View My Orders</Button>
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
    <div className="page-container container">
      <div className="checkout-header text-center">
        <h1>Checkout</h1>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Shipping Address</h2>
          <div className="form-group">
            <label>Street Address</label>
            <input type="text" placeholder="123 Main St" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} required />
          </div>
          <div className="checkout-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="Mumbai" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" placeholder="Maharashtra" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input type="text" placeholder="400050" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} required />
          </div>

          {error && <p style={{ color: 'var(--color-accent)', marginTop: '1rem' }}>{error}</p>}

          <Button variant="primary" className="checkout-submit" disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order — ₹${totalPrice.toLocaleString()}`}
          </Button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          {cartItems.map(item => (
            <div key={`${item.id}-${item.selectedSize}`} className="checkout-item">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="checkout-item">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString()}</span>
          </div>
          <div className="checkout-item">
            <span>Shipping</span>
            <span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString()}`}</span>
          </div>
          <div className="checkout-item total">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
