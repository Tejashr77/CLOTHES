import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { GlassButton, GlassModal } from '../components/glass';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/helpers';
import { Heart, Share2, Truck, RotateCcw, Shield, Star, ChevronDown, ZoomIn, Minus, Plus } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products, loading } = useProducts();
  const { addToCart } = useCart();
  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const imageRef = useRef(null);

  const relatedProducts = products.filter(p => p._id !== product?._id && p.category === product?.category).slice(0, 4);
  const crossSellProducts = products.filter(p => p._id !== product?._id).sort(() => Math.random() - 0.5).slice(0, 4);

  const allImages = product ? [
    product.image,
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
  ] : [];

  const reviews = [
    { id: 1, name: 'Priya M.', rating: 5, date: '2 weeks ago', verified: true, text: 'Absolutely stunning quality. The fit is perfect and the fabric feels luxurious. Worth every penny.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { id: 2, name: 'Ananya K.', rating: 5, date: '1 month ago', verified: true, text: 'Got so many compliments! The craftsmanship is impeccable. Will be ordering more.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
    { id: 3, name: 'Meera R.', rating: 4, date: '1 month ago', verified: false, text: 'Beautiful dress, runs slightly large. Size down if between sizes.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' },
  ];

  const sizeGuideData = [
    { size: 'XS', bust: '32', waist: '24', hips: '34' },
    { size: 'S', bust: '34', waist: '26', hips: '36' },
    { size: 'M', bust: '36', waist: '28', hips: '38' },
    { size: 'L', bust: '38', waist: '30', hips: '40' },
    { size: 'XL', bust: '40', waist: '32', hips: '42' },
  ];

  const colorSwatches = [
    { name: 'Midnight', color: '#1a1a2e' },
    { name: 'Ruby', color: '#e74c3c' },
    { name: 'Emerald', color: '#2ecc71' },
    { name: 'Gold', color: '#C9A84C' },
  ];

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) { alert('Please select a size'); return; }
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    if (product.sizes?.length > 0 && !selectedSize) { alert('Please select a size'); return; }
    addToCart(product, quantity, selectedSize);
    navigate('/checkout');
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      const days = Math.floor(Math.random() * 3) + 3;
      setDeliveryEstimate({ days, date: new Date(Date.now() + days * 86400000).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' }) });
    }
  };

  if (loading) return (
    <div className="pdp-loading">
      <div className="pdp-loading-skeleton" />
      <p>Loading...</p>
    </div>
  );

  if (!product) {
    return (
      <div className="pdp-not-found container text-center">
        <h1>Product Not Found</h1>
        <p className="text-muted mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop"><GlassButton variant="primary">Back to Shop</GlassButton></Link>
      </div>
    );
  }

  return (
    <div className="pdp-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/shop">Shop</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="pdp-layout">
          {/* Gallery */}
          <div className="pdp-gallery">
            <div className="pdp-thumbnails">
              {allImages.map((img, i) => (
                <button key={i} className={`pdp-thumb ${activeImage === i ? 'active' : ''}`} onClick={() => setActiveImage(i)}>
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
            <div className="pdp-main-image" ref={imageRef} onClick={() => setShowZoom(true)} data-cursor="view">
              <img src={allImages[activeImage]} alt={product.name} />
              <div className="pdp-image-badges">
                {product.scarcity && <span className="pd-badge pd-badge-scarcity">{product.scarcity}</span>}
                {product.isPreorder && <span className="pd-badge pd-badge-preorder">Pre-Order</span>}
              </div>
              <button className="zoom-btn" aria-label="Zoom image"><ZoomIn size={18} strokeWidth={1.5} /></button>
            </div>
          </div>

          {/* Details */}
          <div className="pdp-info">
            <p className="pdp-category">{product.category}</p>
            <h1 className="pdp-name">{product.name}</h1>
            <div className="pdp-price-row">
              <p className="pdp-price">{formatPrice(product.price)}</p>
            </div>

            {/* Color Swatches */}
            <div className="pdp-section">
              <p className="pdp-label">Color{selectedColor ? `: ${selectedColor}` : ''}</p>
              <div className="color-swatches">
                {colorSwatches.map(c => (
                  <button key={c.name} className={`swatch ${selectedColor === c.name ? 'active' : ''}`} onClick={() => setSelectedColor(c.name)} style={{ background: c.color }} title={c.name} aria-label={c.name} />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="pdp-section">
                <div className="pdp-label-row">
                  <p className="pdp-label">Size{selectedSize ? `: ${selectedSize}` : ''}</p>
                  <button className="size-guide-link" onClick={() => setShowSizeGuide(true)}>Size Guide</button>
                </div>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button key={size} className={`size-btn ${selectedSize === size ? 'active' : ''}`} onClick={() => setSelectedSize(size)}>{size}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="pdp-section">
              <p className="pdp-label">Quantity</p>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease" disabled={quantity <= 1}>
                  <Minus size={16} strokeWidth={1.5} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase">
                  <Plus size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pdp-actions">
              <GlassButton variant="primary" size="lg" className="pdp-add-btn" onClick={handleAddToCart}>
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </GlassButton>
              <button className="pdp-action-icon" onClick={handleBuyNow} aria-label="Buy now" title="Buy now">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              </button>
              <button className={`pdp-action-icon ${isWishlisted ? 'active' : ''}`} onClick={() => setIsWishlisted(!isWishlisted)} aria-label="Add to wishlist">
                <Heart size={20} strokeWidth={1.5} fill={isWishlisted ? 'var(--zq-gold)' : 'none'} />
              </button>
              <button className="pdp-action-icon" aria-label="Share"><Share2 size={20} strokeWidth={1.5} /></button>
            </div>

            {/* Delivery Estimator */}
            <div className="pdp-delivery">
              <div className="delivery-header">
                <Truck size={18} strokeWidth={1.5} />
                <span>Delivery</span>
              </div>
              <div className="delivery-input">
                <input type="text" placeholder="Enter pincode" value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} className="glass-input" />
                <GlassButton variant="ghost" size="sm" onClick={checkDelivery}>Check</GlassButton>
              </div>
              {deliveryEstimate && (
                <p className="delivery-estimate">Estimated delivery: <strong>{deliveryEstimate.date}</strong></p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="pdp-trust">
              <div className="trust-item"><Truck size={16} strokeWidth={1.5} /><span>Free shipping above ₹50,000</span></div>
              <div className="trust-item"><RotateCcw size={16} strokeWidth={1.5} /><span>7-day exchange for RTW</span></div>
              <div className="trust-item"><Shield size={16} strokeWidth={1.5} /><span>Authenticity guaranteed</span></div>
            </div>

            {/* Tabs */}
            <div className="pdp-tabs">
              <div className="tab-nav">
                {['details', 'care', 'reviews'].map(tab => (
                  <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                    {tab === 'details' ? 'Details' : tab === 'care' ? 'Fabric & Care' : `Reviews (${reviews.length})`}
                  </button>
                ))}
              </div>
              <div className="tab-content">
                {activeTab === 'details' && (
                  <div className="tab-panel">
                    <p>{product.description}</p>
                    <ul className="detail-list">
                      <li>Category: {product.category}</li>
                      <li>Available in: {product.sizes?.join(', ')}</li>
                      <li>Handcrafted in our Mumbai atelier</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="tab-panel">
                    <p>Each ZaQueen garment is crafted with the finest materials. Handle with care to preserve its beauty.</p>
                    <ul className="detail-list">
                      <li>Dry clean recommended for embellished pieces</li>
                      <li>Hand wash in cold water for lighter fabrics</li>
                      <li>Store in the provided garment bag</li>
                      <li>Avoid direct sunlight when storing</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="tab-panel">
                    <div className="reviews-summary">
                      <div className="rating-big">4.8</div>
                      <div>
                        <div className="stars">
                          {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="var(--zq-gold)" stroke="none" />)}
                        </div>
                        <p className="text-sm text-muted">Based on {reviews.length} reviews</p>
                      </div>
                    </div>
                    {reviews.map(review => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <img src={review.image} alt={review.name} className="review-avatar" />
                          <div className="review-info">
                            <p className="review-name">{review.name} {review.verified && <span className="verified-badge">Verified</span>}</p>
                            <p className="text-xs text-muted">{review.date}</p>
                          </div>
                          <div className="review-stars">
                            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= review.rating ? 'var(--zq-gold)' : 'var(--zq-gray-200)'} stroke="none" />)}
                          </div>
                        </div>
                        <p className="review-text">{review.text}</p>
                      </div>
                    ))}
                    <GlassButton variant="outline" className="mt-4">Write a Review</GlassButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cross-sell */}
        {crossSellProducts.length > 0 && (
          <section className="pdp-cross-sell">
            <h3 className="text-center mb-8">Complete the Look</h3>
            <div className="cross-sell-grid">
              {crossSellProducts.map(p => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size Guide Modal */}
      <GlassModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} title="Size Guide">
        <p className="mb-4 text-muted">All measurements are in inches. Measure yourself and compare.</p>
        <table className="size-guide-table">
          <thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hips</th></tr></thead>
          <tbody>
            {sizeGuideData.map(row => (
              <tr key={row.size}><td><strong>{row.size}</strong></td><td>{row.bust}</td><td>{row.waist}</td><td>{row.hips}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4" style={{ background: 'var(--zq-gold-muted)', borderRadius: 'var(--zq-radius-md)', padding: 'var(--zq-space-4)' }}>
          <p className="text-sm"><strong>Fit Predictor:</strong> If you're between sizes, we recommend sizing down for a fitted look or up for a relaxed fit.</p>
        </div>
      </GlassModal>

      {/* Zoom Modal */}
      <GlassModal isOpen={showZoom} onClose={() => setShowZoom(false)}>
        <div className="zoom-view">
          <img src={allImages[activeImage]} alt={product.name} style={{ width: '100%', borderRadius: 'var(--zq-radius-md)' }} />
        </div>
      </GlassModal>
    </div>
  );
};

export default ProductDetail;
