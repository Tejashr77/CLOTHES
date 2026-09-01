import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container container flex justify-between items-center">
        <div className="navbar-mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <img src="/logo_0_0.jpeg" alt="ZaQueen Logo" className="logo-image" />
          </Link>
        </div>

        <div className="navbar-links flex items-center gap-md">
          <Link to="/shop" className="nav-link">Shop RTW</Link>
          <Link to="/bespoke" className="nav-link">Bespoke Couture</Link>
          <Link to="/about" className="nav-link">Our Story</Link>
        </div>

        <div className="navbar-icons flex items-center gap-sm">
          <button className="icon-btn"><Search size={20} /></button>
          <Link to="/account" className="icon-btn"><User size={20} /></Link>
          <Link to="/cart" className="icon-btn relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/shop" className="mobile-link" onClick={() => setMobileOpen(false)}>Shop RTW</Link>
          <Link to="/bespoke" className="mobile-link" onClick={() => setMobileOpen(false)}>Bespoke Couture</Link>
          <Link to="/about" className="mobile-link" onClick={() => setMobileOpen(false)}>Our Story</Link>
          <Link to="/account" className="mobile-link" onClick={() => setMobileOpen(false)}>My Account</Link>
          <Link to="/cart" className="mobile-link" onClick={() => setMobileOpen(false)}>Cart ({cartCount})</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
