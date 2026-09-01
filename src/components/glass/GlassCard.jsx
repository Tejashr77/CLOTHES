import React from 'react';
import { Link } from 'react-router-dom';

const GlassCard = ({ children, className = '', hover = true, to, ...props }) => {
  const classes = `glass-card ${hover ? '' : 'no-hover'} ${className}`;
  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>;
  }
  return <div className={classes} {...props}>{children}</div>;
};

export default GlassCard;
