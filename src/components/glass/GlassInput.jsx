import React from 'react';

const GlassInput = ({ label, type = 'text', className = '', textarea = false, ...props }) => {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <Tag className={`glass-input ${textarea ? 'glass-textarea' : ''}`} type={textarea ? undefined : type} {...props} />
    </div>
  );
};

export default GlassInput;
