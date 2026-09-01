import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="page-container container text-center">
        <h1 style={{ marginTop: '4rem' }}>Your Cart is Empty</h1>
        <p style={{ marginTop: '1rem', color: 'var(--color-gray-dark)' }}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/shop" style={{ marginTop: '2rem', display: 'inline-block' }}>
          <Button variant="primary">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container container">
      <div className="cart-header text-center">
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item-image-wrapper">
                <img src={item.image} alt={item.name} className="cart-item-image" />
              </Link>
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                {item.selectedSize && <p className="cart-item-size">Size: {item.selectedSize}</p>}
                <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="cart-item-subtotal">
                <p>₹{(item.price * item.quantity).toLocaleString()}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.id, item.selectedSize)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{cartTotal >= 50000 ? 'Free' : '₹1,500'}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{(cartTotal + (cartTotal >= 50000 ? 0 : 1500)).toLocaleString()}</span>
          </div>
          <Button variant="primary" className="checkout-btn">Proceed to Checkout</Button>
          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
          <Link to="/shop" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
