import React from 'react';

const Placeholder = ({ title }) => {
  return (
    <div className="page-container container text-center">
      <h1 style={{ marginTop: '4rem' }}>{title}</h1>
      <p style={{ marginTop: '1rem', color: 'var(--color-gray-dark)' }}>
        This page is a placeholder for the prototype.
      </p>
    </div>
  );
};

export default Placeholder;
