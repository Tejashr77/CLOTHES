import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const searchInputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setMobileSubmenu(null);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* ─── Top Announcement Bar ─── */}
      <div className={`zq-topbar ${scrolled ? 'hidden-bar' : ''}`}>
        <p>Complimentary shipping on orders above ₹50,000</p>
      </div>

      {/* ─── Main Navbar ─── */}
      <nav className={`zq-nav ${scrolled ? 'scrolled' : ''} ${!scrolled ? 'has-topbar' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="zq-nav-inner container">
          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            data-cursor="link"
          >
            <span className={`hamburger ${mobileOpen ? 'open' : ''}`}>
              <span />
              <span />
              <span />
            </span>
          </button>

          {/* Logo */}
          <Link to="/" className="nav-logo" data-cursor="link">
            <img src="/logo.svg" alt="ZaQueen" className="nav-logo-img" />
            <span className="nav-brand-name">ZAQUEEN</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>
              Shop
            </Link>
            <Link to="/bespoke" className={`nav-link ${location.pathname === '/bespoke' ? 'active' : ''}`}>
              Bespoke
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              Story
            </Link>
            <Link to="/journal" className={`nav-link ${location.pathname === '/journal' ? 'active' : ''}`}>
              Journal
            </Link>
          </div>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Search Toggle */}
            <button
              className={`nav-icon-btn ${searchOpen ? 'active' : ''}`}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              data-cursor="link"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="nav-user-menu">
                <Link to="/account" className="nav-icon-btn" data-cursor="link">
                  <User size={19} strokeWidth={1.5} />
                </Link>
                <div className="user-dropdown glass">
                  <div className="user-dropdown-header">
                    <p className="user-name">{user?.name}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>
                  <div className="user-dropdown-divider" />
                  <Link to="/account" className="user-dropdown-item">
                    <User size={15} /> My Account
                  </Link>
                  <Link to="/orders" className="user-dropdown-item">
                    <ShoppingBag size={15} /> My Orders
                  </Link>
                  <Link to="/wishlist" className="user-dropdown-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    Wishlist
                  </Link>
                  {user?.role === 'admin' && (
                    <>
                      <div className="user-dropdown-divider" />
                      <Link to="/admin" className="user-dropdown-item">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                        Admin Dashboard
                      </Link>
                    </>
                  )}
                  <div className="user-dropdown-divider" />
                  <button onClick={logout} className="user-dropdown-item logout">
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/account" className="nav-icon-btn" data-cursor="link">
                <User size={19} strokeWidth={1.5} />
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="nav-icon-btn cart-icon" data-cursor="link">
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ─── Search Drawer ─── */}
        <div className={`search-drawer ${searchOpen ? 'open' : ''}`}>
          <div className="container">
            <form className="search-form" onSubmit={handleSearch}>
              <Search size={20} className="search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search products"
              />
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={20} />
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="mobile-logo" onClick={() => setMobileOpen(false)}>
            <img src="/logo.svg" alt="ZaQueen" className="mobile-logo-img" />
            <span className="mobile-brand-name">ZAQUEEN</span>
          </Link>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="mobile-menu-nav">
          <Link to="/" className="mobile-link" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link to="/shop" className="mobile-link" onClick={() => setMobileOpen(false)}>
            Shop RTW
          </Link>
          <Link to="/bespoke" className="mobile-link" onClick={() => setMobileOpen(false)}>
            Bespoke Couture
          </Link>
          <Link to="/about" className="mobile-link" onClick={() => setMobileOpen(false)}>
            Our Story
          </Link>
          <Link to="/journal" className="mobile-link" onClick={() => setMobileOpen(false)}>
            Journal
          </Link>
        </div>

        <div className="mobile-menu-divider" />

        <div className="mobile-menu-links">
          {isAuthenticated ? (
            <>
              <Link to="/account" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>
                My Account
              </Link>
              <Link to="/orders" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>
                My Orders
              </Link>
              <Link to="/wishlist" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>
                Wishlist
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>
                  Admin Dashboard
                </Link>
              )}
              <button className="mobile-sub-link logout" onClick={() => { logout(); setMobileOpen(false); }}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/account" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>
              Sign In / Create Account
            </Link>
          )}
        </div>

        <div className="mobile-menu-footer">
          <Link to="/cart" className="mobile-cart-link" onClick={() => setMobileOpen(false)}>
            <ShoppingBag size={18} />
            <span>Shopping Bag</span>
            {cartCount > 0 && <span className="mobile-cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
