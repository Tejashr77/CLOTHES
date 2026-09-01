import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <nav className={`zq-nav ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="zq-nav-inner container">
          <div className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} data-cursor="link">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </div>

          <Link to="/" className="nav-logo" data-cursor="link">
            <img src="/logo_0_0.jpeg" alt="ZaQueen" className="nav-logo-img" />
          </Link>

          <div className="nav-links">
            <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>Shop</Link>
            <Link to="/bespoke" className={`nav-link ${location.pathname === '/bespoke' ? 'active' : ''}`}>Bespoke</Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>Story</Link>
            <Link to="/journal" className={`nav-link ${location.pathname === '/journal' ? 'active' : ''}`}>Journal</Link>
          </div>

          <div className="nav-actions">
            <button className="nav-icon-btn" aria-label="Search" data-cursor="link"><Search size={20} /></button>
            {isAuthenticated ? (
              <div className="nav-user-menu">
                <Link to="/account" className="nav-icon-btn" data-cursor="link"><User size={20} /></Link>
                <div className="user-dropdown glass">
                  <p className="user-name">{user?.name}</p>
                  <Link to="/account">My Account</Link>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/wishlist">Wishlist</Link>
                  {user?.role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
                  <button onClick={logout}><LogOut size={14} /> Sign Out</button>
                </div>
              </div>
            ) : (
              <Link to="/account" className="nav-icon-btn" data-cursor="link"><User size={20} /></Link>
            )}
            <Link to="/cart" className="nav-icon-btn cart-icon" data-cursor="link">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <Link to="/" className="mobile-logo" onClick={() => setMobileOpen(false)}>
            <img src="/logo_0_0.jpeg" alt="ZaQueen" className="mobile-logo-img" />
          </Link>
          <div className="mobile-divider" />
          <Link to="/shop" className="mobile-link">Shop RTW</Link>
          <Link to="/bespoke" className="mobile-link">Bespoke Couture</Link>
          <Link to="/about" className="mobile-link">Our Story</Link>
          <Link to="/journal" className="mobile-link">Journal</Link>
          <div className="mobile-divider" />
          {isAuthenticated ? (
            <>
              <Link to="/account" className="mobile-link">My Account</Link>
              <Link to="/orders" className="mobile-link">My Orders</Link>
              <Link to="/wishlist" className="mobile-link">Wishlist</Link>
              {user?.role === 'admin' && <Link to="/admin" className="mobile-link">Admin</Link>}
              <button className="mobile-link" onClick={logout}>Sign Out</button>
            </>
          ) : (
            <Link to="/account" className="mobile-link">Sign In</Link>
          )}
          <Link to="/cart" className="mobile-link">Cart ({cartCount})</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
