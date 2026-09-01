import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="zq-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/logo_0_0.jpeg" alt="ZaQueen" className="footer-logo-img" />
          </Link>
          <p className="footer-tagline">Your design, our couture, designed to reign.</p>
          <div className="footer-socials">
            <a href="https://instagram.com/zaqueen" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
            <a href="https://facebook.com/zaqueen" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
            <a href="https://pinterest.com/zaqueen" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">PIN</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shop">All Collections</Link>
          <Link to="/shop">Statement Pieces</Link>
          <Link to="/shop">Premium</Link>
          <Link to="/shop">Accessible Luxury</Link>
          <Link to="/bespoke">Bespoke Couture</Link>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">Our Story</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/find-us">Store Locator</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/faqs">FAQs</Link>
          <Link to="/returns">Returns & Exchanges</Link>
          <Link to="/policies">Shipping Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/account">My Account</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ZaQueen. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
