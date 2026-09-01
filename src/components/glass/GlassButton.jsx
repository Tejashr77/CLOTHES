import React from 'react';

const GlassButton = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  return (
    <button className={`glass-btn glass-btn-${variant} glass-btn-${size} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default GlassButton;
