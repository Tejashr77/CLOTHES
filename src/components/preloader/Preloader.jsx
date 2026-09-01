import React, { useState, useEffect } from 'react';
import './preloader.css';

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading'); // loading -> reveal -> done

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('reveal'), 1800);
    const timer2 = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 2800);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`preloader ${phase === 'reveal' ? 'preloader-exit' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-logo">
          <div className="preloader-z">Z</div>
          <div className="preloader-q">Q</div>
        </div>
        <div className="preloader-tagline">
          <span className="preloader-word" style={{ animationDelay: '0.3s' }}>Your</span>
          <span className="preloader-word" style={{ animationDelay: '0.5s' }}>vision.</span>
          <span className="preloader-word" style={{ animationDelay: '0.8s' }}>Our</span>
          <span className="preloader-word" style={{ animationDelay: '1.0s' }}>couture.</span>
        </div>
        <div className="preloader-line" />
      </div>
      <div className="preloader-curtain preloader-curtain-left" />
      <div className="preloader-curtain preloader-curtain-right" />
    </div>
  );
};

export default Preloader;
