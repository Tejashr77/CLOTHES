import React, { useState, useEffect } from 'react';
import './preloader.css';

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('reveal'), 2200);
    const timer2 = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 3200);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`preloader ${phase === 'reveal' ? 'preloader-exit' : ''}`}>
      <div className="preloader-content">
        <img src="/logo.svg" alt="ZaQueen" className="preloader-logo" />
        <div className="preloader-tagline">
          <span className="preloader-word" style={{ animationDelay: '0.5s' }}>Your</span>
          <span className="preloader-word" style={{ animationDelay: '0.7s' }}>design,</span>
          <span className="preloader-word" style={{ animationDelay: '0.9s' }}>our</span>
          <span className="preloader-word" style={{ animationDelay: '1.1s' }}>couture.</span>
        </div>
        <div className="preloader-line" />
      </div>
      <div className="preloader-curtain preloader-curtain-left" />
      <div className="preloader-curtain preloader-curtain-right" />
    </div>
  );
};

export default Preloader;
