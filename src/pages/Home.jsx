import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal, useParallax, useMediaQuery } from '../hooks';
import { GlassButton, GlassCard, GlassInput } from '../components/glass';
import { formatPrice, getImageUrl } from '../utils/helpers';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { ChevronLeft, ChevronRight, ArrowRight, Play, Camera } from 'lucide-react';
import './Home.css';

/* ─── Intersection Observer Hook ─── */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.unobserve(el); }
    }, { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

/* ─── Stagger Reveal Wrapper ─── */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? 'reveal-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/* ─── Carousel Hook ─── */
const useCarousel = (totalItems, visibleItems = 4) => {
  const [current, setCurrent] = useState(0);
  const maxIndex = Math.max(0, totalItems - visibleItems);
  const next = () => setCurrent(i => Math.min(i + 1, maxIndex));
  const prev = () => setCurrent(i => Math.max(i - 1, 0));
  return { current, next, prev, canNext: current < maxIndex, canPrev: current > 0 };
};

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 8);
  const [heroParallaxRef, heroOffset] = useParallax(0.3);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const carousel = useCarousel(featuredProducts.length, isMobile ? 1 : 4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const lookbookImages = [
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800', span: 'wide' },
    { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600', span: 'tall' },
    { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600', span: 'normal' },
    { src: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600', span: 'normal' },
    { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800', span: 'wide' },
    { src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600', span: 'tall' },
  ];

  const pressLogos = ['Vogue', 'Harper\'s Bazaar', 'Elle', 'Marie Claire', 'GQ', 'Cosmopolitan'];

  const CameraPosts = [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1544957992-20514f595d6f?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=400',
  ];

  return (
    <div className="home">
      {/* ═══ HERO SECTION ═══ */}
      <section className="hero-full" ref={heroParallaxRef}>
        <div className="hero-video-container">
          <video
            className="hero-video"
            autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-in-a-studio-40286-large.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>
        <div className="hero-content container" style={{ transform: `translateY(${heroOffset * 0.15}px)` }}>
          <Reveal>
            <p className="hero-eyebrow tracking-widest uppercase text-sm" style={{ color: 'var(--zq-gray-400)' }}>
              Haute Couture &middot; Ready-to-Wear &middot; Bespoke
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="hero-title">Designed<br/>to <em>reign</em>.</h1>
          </Reveal>
          <Reveal delay={400}>
            <p className="hero-subtitle">Your vision. Our couture. Crafted for women who refuse to blend in.</p>
          </Reveal>
          <Reveal delay={600}>
            <div className="hero-actions flex gap-4 justify-center">
              <Link to="/shop">
                <GlassButton variant="primary" size="lg">Shop Collection</GlassButton>
              </Link>
              <Link to="/bespoke">
                <GlassButton variant="glass" size="lg">
                  <Play size={16} /> Bespoke Couture
                </GlassButton>
              </Link>
            </div>
          </Reveal>
          <div className="hero-scroll-indicator">
            <div className="scroll-line" />
            <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--zq-gray-500)' }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED COLLECTION CAROUSEL ═══ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header text-center mb-12">
              <p className="uppercase tracking-widest text-xs mb-4" style={{ color: 'var(--zq-gold)' }}>Curated Selection</p>
              <h2 className="section-title">Ready-to-Wear</h2>
              <p className="section-subtitle">Occasion and party wear, designed in-house.</p>
            </div>
          </Reveal>

          <div className="carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(-${carousel.current * (100 / (isMobile ? 1 : 4))}%)` }}>
              {featuredProducts.map((product, i) => (
                <Reveal key={product._id || product.id} delay={i * 100} className="carousel-slide">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
            <div className="carousel-nav">
              <button className="carousel-arrow glass" onClick={carousel.prev} disabled={!carousel.canPrev} data-cursor="link">
                <ChevronLeft size={20} />
              </button>
              <button className="carousel-arrow glass" onClick={carousel.next} disabled={!carousel.canNext} data-cursor="link">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <Reveal>
            <div className="text-center mt-8">
              <Link to="/shop">
                <GlassButton variant="outline">View All Collection <ArrowRight size={16} /></GlassButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ EDITORIAL LOOKBOOK GRID ═══ */}
      <section className="section" style={{ background: 'var(--zq-white)' }}>
        <div className="container-wide">
          <Reveal>
            <div className="section-header text-center mb-12">
              <p className="uppercase tracking-widest text-xs mb-4" style={{ color: 'var(--zq-gold)' }}>The Edit</p>
              <h2 className="section-title">Lookbook</h2>
            </div>
          </Reveal>

          <div className="lookbook-grid">
            {lookbookImages.map((img, i) => (
              <Reveal key={i} delay={i * 80} className={`lookbook-item lookbook-${img.span}`}>
                <div className="lookbook-img-wrapper" data-cursor="view">
                  <img src={img.src} alt={`Lookbook ${i + 1}`} loading="lazy" />
                  <div className="lookbook-overlay">
                    <span className="uppercase tracking-wider text-xs" style={{ color: 'var(--zq-ivory)' }}>View Look</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BESPOKE HIGHLIGHT ═══ */}
      <section className="section bespoke-hero-section">
        <div className="container">
          <div className="bespoke-hero-grid">
            <Reveal className="bespoke-hero-visual">
              <div className="bespoke-image-frame" data-cursor="view">
                <img src="https://images.unsplash.com/photo-1550614000-4b95d466f20d?auto=format&fit=crop&q=80&w=800" alt="Bespoke Process" loading="lazy" />
                <div className="bespoke-image-badge glass-dark">
                  <span className="text-xs uppercase tracking-wider">Handcrafted</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200} className="bespoke-hero-content">
              <p className="uppercase tracking-widest text-xs mb-4" style={{ color: 'var(--zq-gold)' }}>Bespoke Couture</p>
              <h2 className="mb-6" style={{ fontSize: 'var(--zq-text-4xl)' }}>Your Vision,<br/>Made <em>Real</em>.</h2>
              <p className="mb-8" style={{ maxWidth: 440, color: 'var(--zq-gray-500)', lineHeight: 'var(--zq-leading-relaxed)' }}>
                Upload your inspiration. Our artisans craft a made-to-measure masterpiece tailored uniquely to your body and vision.
              </p>
              <div className="bespoke-steps-list mb-8">
                {['Upload Inspiration', 'Guided Measurements', 'Collaborative Design', 'Delivered to You'].map((step, i) => (
                  <div key={i} className="bespoke-step">
                    <span className="bespoke-step-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <Link to="/bespoke">
                <GlassButton variant="primary" size="lg">Start Your Design</GlassButton>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ PRESS LOGOS STRIP ═══ */}
      <section className="press-strip">
        <div className="container">
          <Reveal>
            <p className="text-center uppercase tracking-widest text-xs mb-8" style={{ color: 'var(--zq-gray-400)' }}>As Seen In</p>
          </Reveal>
          <div className="press-logos flex justify-center items-center gap-12 flex-wrap">
            {pressLogos.map((name, i) => (
              <Reveal key={i} delay={i * 80}>
                <span className="press-logo" data-cursor="link">{name}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Camera / UGC FEED ═══ */}
      <section className="section" style={{ background: 'var(--zq-white)' }}>
        <div className="container-wide">
          <Reveal>
            <div className="section-header text-center mb-8">
              <Camera size={24} style={{ color: 'var(--zq-gold)', margin: '0 auto var(--zq-space-4)' }} />
              <h2 className="section-title" style={{ fontSize: 'var(--zq-text-3xl)' }}>@ZaQueen</h2>
              <p className="section-subtitle">Tag us to be featured</p>
            </div>
          </Reveal>
          <div className="Camera-grid">
            {CameraPosts.map((src, i) => (
              <Reveal key={i} delay={i * 60}>
                <a href="https://Camera.com/zaqueen" target="_blank" rel="noopener noreferrer" className="Camera-item" data-cursor="link">
                  <img src={src} alt={`Camera post ${i + 1}`} loading="lazy" />
                  <div className="Camera-overlay">
                    <Camera size={20} />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="section newsletter-section">
        <div className="container-narrow">
          <Reveal>
            <div className="glass-card newsletter-card text-center">
              <p className="uppercase tracking-widest text-xs mb-4" style={{ color: 'var(--zq-gold)' }}>Exclusive Access</p>
              <h3 className="mb-4" style={{ fontSize: 'var(--zq-text-3xl)' }}>Join the Inner Circle</h3>
              <p className="mb-8" style={{ color: 'var(--zq-gray-500)', maxWidth: 480, margin: '0 auto' }}>
                Early access to new drops, private sales, and behind-the-scenes content from our atelier.
              </p>
              {subscribed ? (
                <div className="subscribe-success">
                  <p style={{ color: 'var(--zq-gold)', fontWeight: 600 }}>Welcome to the inner circle. Check your inbox.</p>
                </div>
              ) : (
                <form className="newsletter-form flex gap-3 justify-center" onSubmit={handleSubscribe}>
                  <GlassInput
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                  <GlassButton variant="primary" type="submit">Subscribe</GlassButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
