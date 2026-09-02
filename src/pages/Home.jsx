import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlassButton, GlassInput } from '../components/glass';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { ChevronLeft, ChevronRight, ArrowRight, Camera, Star } from 'lucide-react';
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
    }, { threshold: options.threshold || 0.1, rootMargin: options.rootMargin || '0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

/* ─── Reveal Wrapper ─── */
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

  const categories = [
    { name: 'Statement Pieces', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=600', link: '/shop' },
    { name: 'Premium', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600', link: '/shop' },
    { name: 'Accessible Luxury', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600', link: '/shop' },
  ];

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
            <p className="hero-eyebrow">Haute Couture &middot; Ready-to-Wear &middot; Bespoke</p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="hero-title">Designed<br/>to <em>reign</em>.</h1>
          </Reveal>
          <Reveal delay={400}>
            <p className="hero-subtitle">Your vision. Our couture. Crafted for women who refuse to blend in.</p>
          </Reveal>
          <Reveal delay={600}>
            <div className="hero-actions">
              <Link to="/shop">
                <GlassButton variant="primary" size="lg">Shop Collection</GlassButton>
              </Link>
              <Link to="/bespoke">
                <GlassButton variant="glass" size="lg">Bespoke Couture</GlassButton>
              </Link>
            </div>
          </Reveal>
          <div className="hero-scroll-indicator">
            <div className="scroll-line" />
            <span className="scroll-text">Scroll</span>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED CATEGORIES ═══ */}
      <section className="section categories-section">
        <div className="container">
          <Reveal>
            <div className="section-header text-center">
              <p className="section-eyebrow">Explore</p>
              <h2 className="section-title">Shop by Category</h2>
            </div>
          </Reveal>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Reveal key={i} delay={i * 120}>
                <Link to={cat.link} className="category-card" data-cursor="view">
                  <div className="category-image-wrapper">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                    <div className="category-overlay" />
                  </div>
                  <div className="category-content">
                    <h3 className="category-name">{cat.name}</h3>
                    <span className="category-link">Shop Now <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED COLLECTION CAROUSEL ═══ */}
      <section className="section featured-section" style={{ background: 'var(--zq-white)' }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <p className="section-eyebrow">Curated Selection</p>
              <h2 className="section-title">Ready-to-Wear</h2>
              <p className="section-subtitle">Occasion and party wear, designed in-house.</p>
            </div>
          </Reveal>

          <div className="carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(-${carousel.current * (100 / (isMobile ? 1 : 4))}%)` }}>
              {featuredProducts.map((product, i) => (
                <Reveal key={product._id || product.id} delay={i * 80} className="carousel-slide">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
            <div className="carousel-nav">
              <button className="carousel-arrow" onClick={carousel.prev} disabled={!carousel.canPrev} aria-label="Previous">
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <div className="carousel-dots">
                {Array.from({ length: Math.ceil(featuredProducts.length / (isMobile ? 1 : 4)) }).map((_, i) => (
                  <span key={i} className={`carousel-dot ${i === carousel.current ? 'active' : ''}`} />
                ))}
              </div>
              <button className="carousel-arrow" onClick={carousel.next} disabled={!carousel.canNext} aria-label="Next">
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <Reveal>
            <div className="text-center mt-10">
              <Link to="/shop">
                <GlassButton variant="outline">View All Collection <ArrowRight size={16} /></GlassButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ EDITORIAL LOOKBOOK GRID ═══ */}
      <section className="section">
        <div className="container-wide">
          <Reveal>
            <div className="section-header text-center">
              <p className="section-eyebrow">The Edit</p>
              <h2 className="section-title">Lookbook</h2>
            </div>
          </Reveal>
          <div className="lookbook-grid">
            {lookbookImages.map((img, i) => (
              <Reveal key={i} delay={i * 80} className={`lookbook-item lookbook-${img.span}`}>
                <div className="lookbook-img-wrapper" data-cursor="view">
                  <img src={img.src} alt={`Lookbook ${i + 1}`} loading="lazy" />
                  <div className="lookbook-overlay">
                    <span className="lookbook-label">View Look</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BESPOKE HIGHLIGHT ═══ */}
      <section className="section bespoke-section" style={{ background: 'var(--zq-white)' }}>
        <div className="container">
          <div className="bespoke-grid">
            <Reveal className="bespoke-visual">
              <div className="bespoke-image-frame" data-cursor="view">
                <img src="https://images.unsplash.com/photo-1550614000-4b95d466f20d?auto=format&fit=crop&q=80&w=800" alt="Bespoke Process" loading="lazy" />
                <div className="bespoke-image-badge glass-dark">
                  <span>Handcrafted</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200} className="bespoke-content">
              <p className="section-eyebrow">Bespoke Couture</p>
              <h2 className="bespoke-title">Your Vision,<br/>Made <em>Real</em>.</h2>
              <p className="bespoke-desc">
                Upload your inspiration. Our artisans craft a made-to-measure masterpiece tailored uniquely to your body and vision.
              </p>
              <div className="bespoke-steps">
                {['Upload Inspiration', 'Guided Measurements', 'Collaborative Design', 'Delivered to You'].map((step, i) => (
                  <div key={i} className="bespoke-step">
                    <span className="bespoke-step-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="bespoke-step-text">{step}</span>
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

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section testimonials-section">
        <div className="container">
          <Reveal>
            <div className="section-header text-center">
              <p className="section-eyebrow">Testimonials</p>
              <h2 className="section-title">What Our Clients Say</h2>
            </div>
          </Reveal>
          <div className="testimonials-grid">
            {[
              { name: 'Priya M.', text: 'Absolutely stunning quality. The fit is perfect and the fabric feels luxurious. Worth every penny.', rating: 5 },
              { name: 'Ananya K.', text: 'Got so many compliments! The craftsmanship is impeccable. Will be ordering more.', rating: 5 },
              { name: 'Meera R.', text: 'Beautiful dress, runs slightly large. Size down if between sizes. Overall, love it!', rating: 4 },
            ].map((review, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="testimonial-card glass-card">
                  <div className="testimonial-stars">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} fill={j < review.rating ? 'var(--zq-gold)' : 'var(--zq-gray-200)'} stroke="none" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{review.text}"</p>
                  <p className="testimonial-name">{review.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRESS LOGOS STRIP ═══ */}
      <section className="press-strip">
        <div className="container">
          <Reveal>
            <p className="press-eyebrow text-center">As Seen In</p>
          </Reveal>
          <div className="press-logos">
            {pressLogos.map((name, i) => (
              <Reveal key={i} delay={i * 80}>
                <span className="press-logo">{name}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INSTAGRAM / UGC FEED ═══ */}
      <section className="section" style={{ background: 'var(--zq-white)' }}>
        <div className="container-wide">
          <Reveal>
            <div className="section-header text-center">
              <Camera size={24} className="section-icon" />
              <h2 className="section-title">@ZaQueen</h2>
              <p className="section-subtitle">Tag us to be featured</p>
            </div>
          </Reveal>
          <div className="instagram-grid">
            {CameraPosts.map((src, i) => (
              <Reveal key={i} delay={i * 60}>
                <a href="https://instagram.com/zaqueen" target="_blank" rel="noopener noreferrer" className="instagram-item" data-cursor="link">
                  <img src={src} alt={`Instagram post ${i + 1}`} loading="lazy" />
                  <div className="instagram-overlay">
                    <Camera size={22} />
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
            <div className="newsletter-card text-center">
              <p className="section-eyebrow">Exclusive Access</p>
              <h3 className="newsletter-title">Join the Inner Circle</h3>
              <p className="newsletter-desc">
                Early access to new drops, private sales, and behind-the-scenes content from our atelier.
              </p>
              {subscribed ? (
                <div className="subscribe-success">
                  <p>Welcome to the inner circle. Check your inbox.</p>
                </div>
              ) : (
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input glass-input"
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

/* ─── Parallax Hook ─── */
function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  return [ref, offset];
}

export default Home;
