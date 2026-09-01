import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useInfiniteScroll } from '../hooks';
import { GlassButton, GlassInput, GlassModal } from '../components/glass';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Grid3X3, LayoutGrid, X, ChevronDown } from 'lucide-react';
import './Shop.css';

const Shop = () => {
  const { products, loading } = useProducts();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [displayCount, setDisplayCount] = useState(12);
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('zq-recent') || '[]'); } catch { return []; }
  });

  // Filter & Sort
  let filtered = products.filter(p => {
    if (filter !== 'All' && p.category !== filter) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  switch (sort) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'new': filtered.reverse(); break;
    case 'popularity': break;
    default: break;
  }

  const visibleProducts = filtered.slice(0, displayCount);
  const hasMore = displayCount < filtered.length;

  const loadMore = useCallback(() => {
    setDisplayCount(prev => prev + 12);
  }, []);

  const loadMoreRef = useInfiniteScroll(loadMore, hasMore);

  // Recently Viewed
  const addRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p._id !== product._id && p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  useEffect(() => {
    localStorage.setItem('zq-recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const categories = ['All', 'Statement', 'Premium', 'Accessible'];
  const colors = ['Gold', 'Black', 'Red', 'Blue', 'Green', 'Pink', 'Ivory'];

  return (
    <div className="shop-page">
      <div className="container">
        {/* Header */}
        <div className="shop-page-header">
          <Reveal>
            <p className="uppercase tracking-widest text-xs mb-2" style={{ color: 'var(--zq-gold)' }}>Collection</p>
            <h1>Ready-to-Wear</h1>
          </Reveal>
        </div>

        {/* Toolbar */}
        <div className="shop-toolbar glass">
          <div className="shop-toolbar-left">
            <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={18} />
              <span className="hide-mobile">Filters</span>
            </button>
            <span className="result-count">{filtered.length} Results</span>
          </div>
          <div className="shop-toolbar-right">
            <div className="view-toggle">
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} aria-label="Grid view">
                <Grid3X3 size={18} />
              </button>
              <button className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`} onClick={() => setViewMode('masonry')} aria-label="Masonry view">
                <LayoutGrid size={18} />
              </button>
            </div>
            <select className="sort-select glass-input" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="new">New Arrivals</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className={`shop-sidebar glass ${showFilters ? 'sidebar-open' : ''}`}>
            <div className="sidebar-header">
              <h3>Filters</h3>
              <button onClick={() => setShowFilters(false)} className="hide-mobile-only"><X size={18} /></button>
            </div>

            <div className="filter-section">
              <h4>Category</h4>
              {categories.map(cat => (
                <button key={cat} className={`filter-chip ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>
                  {cat === 'All' ? 'All Collections' : cat === 'Accessible' ? 'Accessible Luxury' : cat === 'Statement' ? 'Statement Pieces' : cat}
                </button>
              ))}
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-range">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
              <input type="range" min="0" max="100000" step="5000" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])} className="price-slider" />
            </div>

            <div className="filter-section">
              <h4>Color</h4>
              <div className="color-chips">
                {colors.map(color => (
                  <button key={color} className={`color-chip ${selectedColors.includes(color) ? 'active' : ''}`} onClick={() => {
                    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
                  }}>
                    <span className="color-dot" style={{ background: color.toLowerCase() === 'ivory' ? '#FAF8F5' : color.toLowerCase() }} />
                    <span>{color}</span>
                  </button>
                ))}
              </div>
            </div>

            <GlassButton variant="outline" className="clear-filters" onClick={() => { setFilter('All'); setPriceRange([0, 100000]); setSelectedColors([]); }}>
              Clear All Filters
            </GlassButton>
          </aside>

          {/* Product Grid */}
          <main className="shop-main">
            {loading ? (
              <div className="loading-grid">
                {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}
              </div>
            ) : (
              <div className={`product-grid ${viewMode === 'masonry' ? 'masonry-grid' : ''}`}>
                {visibleProducts.map(product => (
                  <ProductCard key={product._id || product.id} product={product} onQuickView={() => { setQuickViewProduct(product); addRecentlyViewed(product); }} />
                ))}
              </div>
            )}

            {hasMore && <div ref={loadMoreRef} className="load-more-trigger" />}

            {!loading && visibleProducts.length === 0 && (
              <div className="empty-state text-center">
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="recently-viewed">
            <h3 className="mb-6">Recently Viewed</h3>
            <div className="recently-grid">
              {recentlyViewed.slice(0, 4).map(product => (
                <ProductCard key={product._id || product.id} product={product} compact />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Quick View Modal */}
      <GlassModal isOpen={!!quickViewProduct} onClose={() => { setQuickViewProduct(null); setSelectedSize(null); }} title="Quick View" size="lg">
        {quickViewProduct && (
          <div className="quick-view-content">
            <div className="quick-view-image">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} />
            </div>
            <div className="quick-view-details">
              <p className="uppercase tracking-widest text-xs mb-2" style={{ color: 'var(--zq-gold)' }}>{quickViewProduct.category}</p>
              <h3 className="mb-2">{quickViewProduct.name}</h3>
              <p className="mb-4" style={{ fontSize: 'var(--zq-text-xl)', fontWeight: 600 }}>₹{quickViewProduct.price.toLocaleString()}</p>
              <p className="mb-6" style={{ color: 'var(--zq-gray-500)', fontSize: 'var(--zq-text-sm)' }}>{quickViewProduct.description}</p>
              {quickViewProduct.sizes && (
                <div className="mb-4">
                  <p className="text-sm mb-2" style={{ fontWeight: 500 }}>Size</p>
                  <div className="flex gap-2">
                    {quickViewProduct.sizes.map(size => (
                      <button key={size} className={`size-btn ${selectedSize === size ? 'active' : ''}`} onClick={() => setSelectedSize(size)}>{size}</button>
                    ))}
                  </div>
                </div>
              )}
              <GlassButton variant="primary" className="w-full">Add to Cart</GlassButton>
            </div>
          </div>
        )}
      </GlassModal>
    </div>
  );
};

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${inView ? 'reveal-visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

export default Shop;
