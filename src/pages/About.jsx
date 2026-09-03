import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './About.css';

const RevealImg = ({ children, className = '' }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal-img ${className}`}>{children}</div>;
};

const About = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content container">
          <h1>Our Story</h1>
          <p className="about-hero-subtitle">Where vision meets couture</p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="about-section container">
        <div className="about-content">
          <div className="about-origin">
            <span className="about-label">The Beginning</span>
            <h2>Born at Midnight</h2>
            <p>
              ZaQueen was born in the quiet hours of midnight — at the exact moment a personal
              dream of entering the medical field shifted into a grander destiny. Our House was
              founded on a powerful realization: that when our initial plans don't work out, it is
              because a higher blueprint is waiting for us.
            </p>
            <p>
              Instead of healing through medicine, the Founder chose to empower through design.
            </p>
          </div>
        </div>
      </section>

      {/* Image Break 1 */}
      <RevealImg className="about-image-break">
        <img src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Fashion atelier" loading="lazy" />
        <div className="image-break-overlay"></div>
        <div className="image-break-caption">
          <span className="caption-line"></span>
          <span className="caption-text">Crafted with intention</span>
          <span className="caption-line"></span>
        </div>
      </RevealImg>

      {/* The Turning Point */}
      <section className="about-section about-section-alt">
        <div className="about-content">
          <div className="about-origin">
            <span className="about-label">The Turning Point</span>
            <h2>From Frustration to Fashion</h2>
            <p>
              Driven by a midnight frustration — watching millions discover stunning outfits online,
              only to find them completely unreachable in the real market — the Founder took to the
              streets to find answers.
            </p>
            <p>
              It was at this crucial turning point that destiny brought an invaluable guide into the
              picture. Through profound, step-by-step mentorship and unwavering strategic guidance,
              those raw late-night ideas were shaped into a true business strategy.
            </p>
            <p>
              Together, through real-world consumer research, a gap in the market was validated — and
              a fashion house was born.
            </p>
          </div>
        </div>
      </section>

      {/* Image Break 2 */}
      <RevealImg className="about-image-break">
        <img src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Elegant fashion design" loading="lazy" />
        <div className="image-break-overlay"></div>
        <div className="image-break-caption">
          <span className="caption-line"></span>
          <span className="caption-text">From dream to reality</span>
          <span className="caption-line"></span>
        </div>
      </RevealImg>

      {/* Philosophy */}
      <section className="about-section container">
        <div className="about-content">
          <div className="about-origin">
            <span className="about-label">Our Philosophy</span>
            <h2>Trust Your Journey</h2>
            <p>
              ZaQueen stands as living proof that life's unexpected detours — and the mentors sent
              to guide us through them — are exactly where you are meant to shine.
            </p>
            <p>
              This isn't just apparel. It is a reminder to trust your journey, embrace your
              redirection, and wear your confidence like a crown.
            </p>
          </div>
        </div>
      </section>

      {/* Dual Image */}
      <section className="about-dual-image">
        <RevealImg className="dual-img-item">
          <img src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Fashion detail" loading="lazy" />
        </RevealImg>
        <RevealImg className="dual-img-item">
          <img src="https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Couture craftsmanship" loading="lazy" />
        </RevealImg>
      </section>

      {/* Our Craft */}
      <section className="about-section about-section-alt">
        <div className="about-content">
          <div className="about-origin">
            <span className="about-label">Our Craft</span>
            <h2>Designed to Reign</h2>
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
        </div>
      </section>

      {/* Full Width Image */}
      <RevealImg className="about-full-image">
        <img src="https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Fashion runway" loading="lazy" />
        <div className="full-image-overlay"></div>
        <div className="full-image-text">
          <h3>Designed to Reign</h3>
          <p>Where every stitch tells a story</p>
        </div>
      </RevealImg>

      {/* Welcome */}
      <section className="about-welcome">
        <div className="about-content text-center">
          <h2>Welcome to ZaQueen.</h2>
          <p className="about-welcome-sub">The search is officially over.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta text-center section">
        <div className="container">
          <h2>Ready to Reign?</h2>
          <p>Explore our collection and find the piece that speaks to you.</p>
          <div className="about-cta-buttons">
            <Link to="/shop"><Button variant="primary">Shop RTW</Button></Link>
            <Link to="/bespoke"><Button variant="outline">Bespoke Couture</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
