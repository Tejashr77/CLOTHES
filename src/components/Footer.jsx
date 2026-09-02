import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="zq-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/logo-full.svg" alt="ZaQueen" className="footer-logo-img" />
          </Link>
          <p className="footer-tagline">Your design, our couture, designed to reign.</p>
          <div className="footer-socials">
            <a href="https://instagram.com/zaqueen" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://facebook.com/zaqueen" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://pinterest.com/zaqueen" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 1 8 0c0 4-3 8-3 8"/><line x1="12" y1="12" x2="12" y2="22"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Shop</h4>
          <Link to="/shop">All Collections</Link>
          <Link to="/shop">Statement Pieces</Link>
          <Link to="/shop">Premium</Link>
          <Link to="/shop">Accessible Luxury</Link>
          <Link to="/bespoke">Bespoke Couture</Link>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Company</h4>
          <Link to="/about">Our Story</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/find-us">Store Locator</Link>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Support</h4>
          <Link to="/faqs">FAQs</Link>
          <Link to="/returns">Returns & Exchanges</Link>
          <Link to="/policies">Shipping Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/account">My Account</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} ZaQueen. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/terms">Terms</Link>
          <span className="footer-dot">&middot;</span>
          <Link to="/privacy">Privacy</Link>
          <span className="footer-dot">&middot;</span>
          <Link to="/policies">Shipping</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
