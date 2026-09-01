import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content container text-center">
          <h1>Our Story</h1>
          <p className="about-hero-subtitle">Where vision meets couture</p>
        </div>
      </section>

      <section className="section container">
        <div className="about-content">
          <div className="about-text">
            <h2>The ZaQueen Philosophy</h2>
            <p>
              ZaQueen was born from a singular belief: every woman deserves to feel like royalty.
              We don't just design clothes — we craft confidence, one stitch at a time.
            </p>
            <p>
              Founded with a passion for blending contemporary aesthetics with timeless elegance,
              our atelier brings together skilled artisans, premium fabrics, and an unwavering
              attention to detail that transforms fabric into wearable art.
            </p>
          </div>
          <div className="about-text">
            <h2>Our Craft</h2>
            <p>
              Every ZaQueen piece tells a story. From our accessible luxury line to our statement
              couture creations, we prioritize quality over quantity. Our garments are designed
              for women who refuse to blend in — who choose to reign.
            </p>
            <p>
              We also offer a bespoke couture service, where your vision becomes our blueprint.
              Upload your inspiration, share your measurements, and watch as our design team
              brings your dream garment to life.
            </p>
          </div>
          <div className="about-text">
            <h2>Our Promise</h2>
            <p>
              We are committed to sustainable practices, fair labor, and creating pieces that
              stand the test of time. When you wear ZaQueen, you're not just wearing a brand —
              you're wearing a promise of quality, beauty, and empowerment.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta text-center section">
        <div className="container">
          <h2>Ready to Reign?</h2>
          <p style={{ marginBottom: 'var(--spacing-lg)' }}>Explore our collection and find the piece that speaks to you.</p>
          <div className="flex justify-center gap-md" style={{ flexWrap: 'wrap' }}>
            <Link to="/shop"><Button variant="primary">Shop RTW</Button></Link>
            <Link to="/bespoke"><Button variant="outline">Bespoke Couture</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
