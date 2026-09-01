import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { GlassButton } from '../components/glass';
import './Wishlist.css';

const Wishlist = () => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('zq-wishlist') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('zq-wishlist', JSON.stringify(items));
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="page-container container text-center">
        <h1 style={{ marginTop: '4rem' }}>Wishlist</h1>
        <p className="text-muted mt-4 mb-8">Save items you love for later.</p>
        <Link to="/shop"><GlassButton variant="primary">Browse Collection</GlassButton></Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page container">
      <div className="text-center" style={{ padding: 'var(--zq-space-12) 0 var(--zq-space-8)' }}>
        <p className="uppercase tracking-widest text-xs mb-2" style={{ color: 'var(--zq-gold)' }}>Saved Items</p>
        <h1>Wishlist</h1>
      </div>
      <div className="wishlist-grid">
        {items.map(product => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
