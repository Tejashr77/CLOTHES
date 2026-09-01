import React from 'react';

const GlassFlyout = ({ isOpen, onClose, title, children, footer }) => (
  <>
    <div className={`glass-flyout-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
    <div className={`glass-flyout ${isOpen ? 'active' : ''}`} role="dialog" aria-label={title}>
      <div className="flex justify-between items-center" style={{ padding: 'var(--zq-space-6)', borderBottom: '1px solid var(--zq-glass-border)' }}>
        <h3 style={{ fontFamily: 'var(--zq-font-display)', fontSize: 'var(--zq-text-xl)' }}>{title}</h3>
        <button onClick={onClose} aria-label="Close" style={{ padding: 'var(--zq-space-2)', borderRadius: 'var(--zq-radius-full)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--zq-space-6)' }}>
        {children}
      </div>
      {footer && (
        <div style={{ padding: 'var(--zq-space-6)', borderTop: '1px solid var(--zq-glass-border)' }}>
          {footer}
        </div>
      )}
    </div>
  </>
);

export default GlassFlyout;
