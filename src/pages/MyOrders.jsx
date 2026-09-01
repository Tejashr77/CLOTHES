import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import Button from '../components/Button';
import './MyOrders.css';

const MyOrders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/account');
      return;
    }
    api.getMyOrders()
      .then(data => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated, navigate]);

  if (loading) return <div className="page-container container text-center"><p style={{ marginTop: '4rem' }}>Loading orders...</p></div>;

  if (orders.length === 0) {
    return (
      <div className="page-container container text-center">
        <h1 style={{ marginTop: '4rem' }}>No Orders Yet</h1>
        <p style={{ marginTop: '1rem', color: 'var(--color-gray-dark)' }}>Start shopping to see your orders here.</p>
        <Link to="/shop" style={{ marginTop: '2rem', display: 'inline-block' }}>
          <Button variant="primary">Shop Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container container">
      <div className="orders-header text-center">
        <h1>My Orders</h1>
      </div>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-card-header">
              <div>
                <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <span className={`order-status status-${order.status}`}>{order.status}</span>
            </div>
            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <img src={item.image} alt={item.name} className="order-item-img" />
                  <div>
                    <p className="order-item-name">{item.name}</p>
                    {item.selectedSize && <p className="order-item-size">Size: {item.selectedSize}</p>}
                    <p className="order-item-qty">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-card-footer">
              <p>Total: ₹{order.totalPrice.toLocaleString()}</p>
              <p className={`payment-status ${order.isPaid ? 'paid' : 'unpaid'}`}>{order.isPaid ? 'Paid' : 'Pending'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
