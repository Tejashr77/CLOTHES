import React from 'react';

const GlassNav = ({ children, className = '' }) => (
  <nav className={`glass-nav ${className}`} role="navigation" aria-label="Main navigation">
    {children}
  </nav>
);

export default GlassNav;
