import React, { useState, useEffect, useCallback } from 'react';
import './cursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const addHoverListeners = () => {
      document.querySelectorAll('[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => setCursorState(el.dataset.cursor));
        el.addEventListener('mouseleave', () => setCursorState('default'));
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const getCursorIcon = () => {
    switch (cursorState) {
      case 'view': return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--zq-gold)" strokeWidth="1.5">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      );
      case 'add': return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--zq-gold)" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      );
      case 'drag': return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--zq-gold)" strokeWidth="1.5">
          <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3"/>
        </svg>
      );
      case 'link': return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--zq-gold)" strokeWidth="1.5">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      );
      default: return null;
    }
  };

  return (
    <>
      <div
        className={`custom-cursor ${isVisible ? 'visible' : ''} state-${cursorState}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div className="cursor-dot" />
        {cursorState !== 'default' && (
          <div className="cursor-icon">{getCursorIcon()}</div>
        )}
      </div>
      <div
        className={`cursor-ring ${isVisible ? 'visible' : ''} state-${cursorState}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
    </>
  );
};

export default CustomCursor;
