import React, { useEffect } from 'react';

const GlassModal = ({ isOpen, onClose, children, title, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <div className={`glass-modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className={`glass-modal ${size === 'lg' ? 'max-w-2xl' : ''}`} onClick={e => e.stopPropagation()}>
        {title && (
          <div className="flex justify-between items-center mb-6">
            <h3 style={{ fontSize: 'var(--zq-text-xl)' }}>{title}</h3>
            <button onClick={onClose} aria-label="Close" className="glass-btn glass-btn-ghost glass-btn-sm" style={{ padding: 'var(--zq-space-2)', borderRadius: 'var(--zq-radius-full)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default GlassModal;
