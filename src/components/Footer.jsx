import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container grid footer-grid">
        <div className="footer-brand">
          <h2>ZAQUEEN</h2>
          <p>Your vision. Our couture. Designed to reign.</p>
          <div className="footer-socials flex gap-md">
            <a href="#" className="social-icon">IG</a>
            <a href="#" className="social-icon">FB</a>
          </div>
        </div>
        
        <div className="footer-links-group">
          <h3>Support</h3>
          <ul>
            <li><Link to="/policies">Our Policies</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>
        
        <div className="footer-links-group">
          <h3>Info</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/find-us">Find Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p>&copy; {new Date().getFullYear()} ZaQueen. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
