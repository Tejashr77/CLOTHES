import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { ArrowRight, Camera, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './Home.css';

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

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? 'reveal-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 8);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const categories = [
    { name: 'Statement Pieces', tag: 'Bold & Unapologetic', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800', link: '/shop' },
    { name: 'Premium Edit', tag: 'Refined Elegance', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800', link: '/shop' },
    { name: 'Everyday Luxe', tag: 'Effortless Style', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', link: '/shop' },
  ];

  const lookbookImages = [
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800', span: 'wide' },
    { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600', span: 'tall' },
    { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600', span: 'normal' },
    { src: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600', span: 'normal' },
    { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800', span: 'wide' },
    { src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600', span: 'tall' },
  ];

  const pressLogos = ['Vogue', 'Harper\'s Bazaar', 'Elle', 'Marie Claire', 'GQ', 'Cosmopolitan'];

  const testimonials = [
    { name: 'Priya M.', location: 'Mumbai', text: 'Absolutely stunning quality. The fit is perfect and the fabric feels luxurious. This is what couture should feel like.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { name: 'Ananya K.', location: 'Delhi', text: 'Got so many compliments at the gala. The craftsmanship is impeccable — every stitch tells a story. Will be ordering more.', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' },
    { name: 'Meera R.', location: 'Bangalore', text: 'ZaQueen made my wedding outfit dreams come true. The bespoke process was seamless and the result was breathtaking.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
  ];

  return (
    <div className="home">
      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
            alt=""
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <Reveal>
            <div className="hero-badge">Est. 2025</div>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="hero-title">
              <span className="hero-title-line">Designed</span>
              <span className="hero-title-line hero-title-accent">to Reign</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="hero-subtitle">
              Haute couture & ready-to-wear for women who refuse to blend in.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="hero-ctas">
              <Link to="/shop" className="hero-btn hero-btn-primary">
                Shop Collection
                <ArrowRight size={18} />
              </Link>
              <Link to="/bespoke" className="hero-btn hero-btn-ghost">
                Bespoke Couture
              </Link>
            </div>
          </Reveal>
          <div className="hero-scroll">
            <div className="hero-scroll-line" />
            <span>Scroll</span>
          </div>
        </div>

        <div className="hero-side-text">ZaQueen — Designed to Reign</div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="marquee-item">
              New Arrivals &nbsp;&middot;&nbsp; Free Shipping on Orders Over $200 &nbsp;&middot;&nbsp; Bespoke Available &nbsp;&middot;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ═══ BRAND STATEMENT ═══ */}
      <section className="brand-statement">
        <div className="container">
          <Reveal>
            <div className="brand-statement-inner">
              <span className="brand-statement-label">Our Promise</span>
              <h2 className="brand-statement-text">
                Every woman deserves to feel like <em>royalty</em>.
                We don't just design clothes — we craft confidence,
                one stitch at a time.
              </h2>
              <div className="brand-statement-line" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="section categories-section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">Explore</span>
              <h2 className="section-heading">Shop by Category</h2>
            </div>
          </Reveal>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Reveal key={i} delay={i * 150}>
                <Link to={cat.link} className="category-card">
                  <div className="category-img-wrap">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                    <div className="category-gradient" />
                  </div>
                  <div className="category-info">
                    <span className="category-tag">{cat.tag}</span>
                    <h3 className="category-name">{cat.name}</h3>
                    <span className="category-cta">Shop Now <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="section featured-section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <div>
                <span className="section-label">Curated Selection</span>
                <h2 className="section-heading">Ready-to-Wear</h2>
              </div>
              <Link to="/shop" className="section-view-all">
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="products-grid">
            {featuredProducts.map((product, i) => (
              <Reveal key={product._id || product.id} delay={i * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EDITORIAL LOOKBOOK ═══ */}
      <section className="section lookbook-section">
        <div className="container-wide">
          <Reveal>
            <div className="section-header text-center">
              <span className="section-label">The Edit</span>
              <h2 className="section-heading">Lookbook</h2>
            </div>
          </Reveal>
          <div className="lookbook-grid">
            {lookbookImages.map((img, i) => (
              <Reveal key={i} delay={i * 80} className={`lookbook-item lookbook-${img.span}`}>
                <div className="lookbook-img">
                  <img src={img.src} alt={`Lookbook ${i + 1}`} loading="lazy" />
                  <div className="lookbook-hover">
                    <span>View Look</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BESPOKE CTA ═══ */}
      <section className="section bespoke-section">
        <div className="container">
          <div className="bespoke-split">
            <Reveal className="bespoke-visual">
              <div className="bespoke-img-frame">
                <img src="https://images.unsplash.com/photo-1550614000-4b95d466f20d?auto=format&fit=crop&q=80&w=800" alt="Bespoke" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={200} className="bespoke-content">
              <span className="section-label">Bespoke Couture</span>
              <h2 className="bespoke-title">Your Vision,<br />Made <em>Real</em>.</h2>
              <p className="bespoke-desc">
                Upload your inspiration. Our artisans craft a made-to-measure masterpiece
                tailored uniquely to your body and vision.
              </p>
              <div className="bespoke-steps">
                {['Upload Inspiration', 'Guided Measurements', 'Collaborative Design', 'Delivered to You'].map((step, i) => (
                  <div key={i} className="bespoke-step">
                    <span className="bespoke-step-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="bespoke-step-text">{step}</span>
                  </div>
                ))}
              </div>
              <Link to="/bespoke" className="hero-btn hero-btn-primary" style={{ display: 'inline-flex' }}>
                Start Your Design <ArrowRight size={18} />
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
              <span className="section-label">Testimonials</span>
              <h2 className="section-heading">What Our Clients Say</h2>
            </div>
          </Reveal>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="testimonial-card">
                  <div className="testimonial-stars">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} fill={j < t.rating ? 'var(--zq-accent)' : 'var(--zq-gray-200)'} stroke="none" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                    <div>
                      <p className="testimonial-name">{t.name}</p>
                      <p className="testimonial-location">{t.location}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRESS ═══ */}
      <section className="press-strip">
        <div className="container">
          <Reveal>
            <p className="press-label">As Featured In</p>
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

      {/* ═══ INSTAGRAM ═══ */}
      <section className="section instagram-section">
        <div className="container-wide">
          <Reveal>
            <div className="section-header text-center">
              <Camera size={20} className="section-icon" />
              <h2 className="section-heading">@ZaQueen</h2>
              <p className="section-sub">Tag us to be featured</p>
            </div>
          </Reveal>
          <div className="instagram-grid">
            {[
              'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400',
              'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=400',
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
              'https://images.unsplash.com/photo-1544957992-20514f595d6f?auto=format&fit=crop&q=80&w=400',
              'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=400',
              'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=400',
            ].map((src, i) => (
              <Reveal key={i} delay={i * 60}>
                <a href="https://instagram.com/zaqueen" target="_blank" rel="noopener noreferrer" className="instagram-item">
                  <img src={src} alt="" loading="lazy" />
                  <div className="instagram-overlay">
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
            <div className="newsletter-card">
              <span className="section-label">Exclusive Access</span>
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
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">Subscribe</button>
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
