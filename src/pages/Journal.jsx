import React from 'react';
import { Link } from 'react-router-dom';
import { GlassButton } from '../components/glass';
import { Calendar, Clock } from 'lucide-react';
import './Journal.css';

const articles = [
  { id: 1, title: 'The Art of Hand Embellishment', excerpt: 'Inside our atelier, where every bead is placed with intention and every stitch tells a story.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800', date: 'Aug 15, 2026', readTime: '5 min', category: 'Craft' },
  { id: 2, title: 'Behind the Velvet Curtain: AW26 Campaign', excerpt: 'A look at the making of our latest campaign, shot in the palaces of Rajasthan.', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800', date: 'Aug 8, 2026', readTime: '8 min', category: 'Campaign' },
  { id: 3, title: 'Sustainable Luxury: Our Fabric Journey', excerpt: 'How we source the finest silk and velvet while respecting the environment.', image: 'https://images.unsplash.com/photo-1550614000-4b95d466f20d?auto=format&fit=crop&q=80&w=800', date: 'Jul 28, 2026', readTime: '6 min', category: 'Sustainability' },
  { id: 4, title: 'Styling Guide: From Day to Gala', excerpt: 'One dress, three ways. Our creative director shows how to transition your look effortlessly.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', date: 'Jul 20, 2026', readTime: '4 min', category: 'Styling' },
  { id: 5, title: 'Meet the Makers: Our Artisan Collective', excerpt: 'The talented hands behind every ZaQueen creation share their stories.', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800', date: 'Jul 12, 2026', readTime: '7 min', category: 'People' },
  { id: 6, title: 'Color Theory in Couture', excerpt: 'Why jewel tones dominate our palette and how to wear them with confidence.', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800', date: 'Jul 5, 2026', readTime: '5 min', category: 'Design' },
];

const Journal = () => (
  <div className="journal-page">
    <div className="container">
      <div className="text-center" style={{ padding: 'var(--zq-space-16) 0 var(--zq-space-12)' }}>
        <p className="uppercase tracking-widest text-xs mb-2" style={{ color: 'var(--zq-gold)' }}>The Journal</p>
        <h1>Stories, Style & Craft</h1>
        <p className="text-muted mt-4" style={{ maxWidth: 500, margin: 'var(--zq-space-4) auto 0' }}>Behind the seams of ZaQueen — design processes, artisan stories, and styling inspiration.</p>
      </div>

      <div className="journal-grid">
        {articles.map((article, i) => (
          <Link key={article.id} to="#" className={`journal-card ${i === 0 ? 'journal-featured' : ''}`}>
            <div className="journal-card-image">
              <img src={article.image} alt={article.title} loading="lazy" />
              <div className="journal-card-overlay">
                <span className="journal-category">{article.category}</span>
              </div>
            </div>
            <div className="journal-card-content">
              <div className="journal-meta">
                <span><Calendar size={12} /> {article.date}</span>
                <span><Clock size={12} /> {article.readTime}</span>
              </div>
              <h3 className="journal-card-title">{article.title}</h3>
              <p className="journal-card-excerpt">{article.excerpt}</p>
              <span className="journal-read-more">Read More</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Journal;
