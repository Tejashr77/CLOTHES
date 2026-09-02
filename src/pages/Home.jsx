import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 8);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const categories = [
    {
      name: 'Statement Pieces',
      desc: 'Bold silhouettes that command the room. Designed for the woman who never whispers.',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
      link: '/shop',
    },
    {
      name: 'The Premium Edit',
      desc: 'Refined fabrics, precise tailoring. Quiet luxury that speaks volumes.',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1200',
      link: '/shop',
    },
    {
      name: 'Everyday Couture',
      desc: 'Elevated essentials for the moments between. Because style never clocks out.',
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=1200',
      link: '/shop',
    },
  ];

  const lookbookImages = [
    { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200', style: 'lb-wide' },
    { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800', style: 'lb-tall' },
    { src: 'https://images.unsplash.com/photo-1544957992-20514f595d6f?auto=format&fit=crop&q=80&w=800', style: 'lb-standard' },
    { src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800', style: 'lb-standard' },
    { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200', style: 'lb-wide' },
    { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800', style: 'lb-tall' },
    { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800', style: 'lb-standard' },
    { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200', style: 'lb-wide' },
  ];

  const testimonials = [
    { quote: 'The moment I put it on, I understood what couture actually means. It is not clothing. It is architecture for the body.', name: 'Priya M.', context: 'Bespoke evening wear' },
    { quote: 'I have never felt so seen by a garment. Every stitch, every line — it was made for me and only me.', name: 'Ananya K.', context: 'Wedding collection' },
    { quote: 'ZaQueen does not follow trends. They create moments. I wore their piece to a gala and the room went silent.', name: 'Meera R.', context: 'Statement piece' },
  ];

  return (
    <div className="home">

      {/* ═══ HERO — Typographic moment ═══ */}
      <section className={`hero ${heroLoaded ? 'hero--loaded' : ''}`}>
        <div className="hero__image">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000"
            alt=""
          />
        </div>
        <div className="hero__content">
          <h1 className="hero__headline">
            <span className="hero__line hero__line--1">Designed</span>
            <span className="hero__line hero__line--2">to&nbsp;</span>
            <span className="hero__line hero__line--3">reign.</span>
          </h1>
          <p className="hero__tagline">
            Your vision. Our couture. Crafted for women who refuse to blend in.
          </p>
          <div className="hero__actions">
            <Link to="/shop" className="hero__link">Shop the collection</Link>
            <span className="hero__divider">/</span>
            <Link to="/bespoke" className="hero__link">Bespoke couture</Link>
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="philosophy">
        <div className="container">
          <p className="philosophy__text">
            ZaQueen was born from a singular belief: every woman deserves to feel
            like royalty. We don't just design clothes — we craft confidence,
            one stitch at a time.
          </p>
        </div>
      </section>

      {/* ═══ CATEGORIES — Split-screen panels ═══ */}
      <section className="categories">
        {categories.map((cat, i) => (
          <Link to={cat.link} key={i} className={`cat-panel ${i % 2 !== 0 ? 'cat-panel--reversed' : ''}`}>
            <div className="cat-panel__image">
              <img src={cat.image} alt={cat.name} loading="lazy" />
            </div>
            <div className="cat-panel__text">
              <span className="cat-panel__number">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="cat-panel__name">{cat.name}</h2>
              <p className="cat-panel__desc">{cat.desc}</p>
              <span className="cat-panel__cta">
                Explore <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="products">
        <div className="container">
          <div className="products__head">
            <h2 className="products__title">Ready-to-wear</h2>
            <Link to="/shop" className="products__viewall">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="products__grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LOOKBOOK — Asymmetric editorial grid ═══ */}
      <section className="lookbook">
        <div className="lookbook__header">
          <h2 className="lookbook__title">The edit</h2>
        </div>
        <div className="lookbook__grid">
          {lookbookImages.map((img, i) => (
            <div key={i} className={`lookbook__item ${img.style}`}>
              <img src={img.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BESPOKE ═══ */}
      <section className="bespoke">
        <div className="container">
          <div className="bespoke__split">
            <div className="bespoke__image">
              <img src="https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=1000" alt="Bespoke process" loading="lazy" />
            </div>
            <div className="bespoke__content">
              <h2 className="bespoke__title">
                Your vision,<br />made real.
              </h2>
              <p className="bespoke__desc">
                Upload your inspiration. Our artisans craft a made-to-measure
                masterpiece tailored uniquely to your body and vision.
              </p>
              <ol className="bespoke__steps">
                <li>Upload your inspiration</li>
                <li>Guided measurements</li>
                <li>Collaborative design process</li>
                <li>Delivered to your door</li>
              </ol>
              <Link to="/bespoke" className="bespoke__link">
                Start your design <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — Editorial pull-quotes ═══ */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="pullquote">
                <p className="pullquote__text">{t.quote}</p>
                <footer className="pullquote__attr">
                  <span className="pullquote__name">{t.name}</span>
                  <span className="pullquote__context">{t.context}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRESS ═══ */}
      <section className="press">
        <div className="container">
          <p className="press__label">As featured in</p>
          <div className="press__logos">
            {['Vogue', 'Harper\'s Bazaar', 'Elle', 'Marie Claire', 'GQ', 'Cosmopolitan'].map((name) => (
              <span key={name} className="press__name">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER — Minimal ═══ */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter__inner">
            <h3 className="newsletter__title">Stay in the world of ZaQueen</h3>
            <p className="newsletter__desc">
              New collections, private sales, and stories from the atelier.
            </p>
            {subscribed ? (
              <p className="newsletter__success">Welcome. Check your inbox.</p>
            ) : (
              <form className="newsletter__form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter__input"
                />
                <button type="submit" className="newsletter__btn">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
