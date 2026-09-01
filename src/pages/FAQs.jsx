import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import './FAQs.css';

const faqData = [
  { q: 'What sizes do you offer?', a: 'Our Ready-to-Wear collection is available in sizes XS through XL. Our Bespoke Couture service is fully custom and made to your exact measurements.', category: 'Sizing' },
  { q: 'How do I find my size?', a: 'Each product page has a Size Guide button with a measurement chart and fit predictor. If you\'re between sizes, we recommend sizing down for a fitted look or up for relaxed.', category: 'Sizing' },
  { q: 'How long does bespoke couture take?', a: 'From initial consultation to final delivery, bespoke orders typically take 4-6 weeks. Rush orders may be available for an additional fee.', category: 'Bespoke' },
  { q: 'Can I customize an existing design?', a: 'Absolutely! Our bespoke service allows you to customize any aspect — fabric, color, neckline, length, and more.', category: 'Bespoke' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship worldwide. Domestic orders above ₹50,000 qualify for free express shipping. International rates vary by location.', category: 'Shipping' },
  { q: 'How long does shipping take?', a: 'Domestic standard: 5-7 business days. Domestic express: 3-5 business days. International: 10-15 business days. You\'ll receive tracking via email.', category: 'Shipping' },
  { q: 'What is your return policy?', a: 'RTW items can be exchanged within 7 days of delivery if unworn with tags. Bespoke orders are final sale. Contact hello@zaqueen.com to initiate.', category: 'Returns' },
  { q: 'How do I exchange an item?', a: 'Contact us with your order number and the item you\'d like to exchange. We\'ll arrange a pickup and send your new item once received.', category: 'Returns' },
  { q: 'How do I care for my garment?', a: 'Each garment includes specific care instructions. Generally: dry clean for embellished/structured pieces, gentle hand wash for lighter fabrics. Store in the provided garment bag.', category: 'Care' },
  { q: 'Do you offer alterations?', a: 'Yes! Complimentary alterations on RTW purchases within 15 days. Visit any of our stores with your receipt.', category: 'Care' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, and select wallets. Bespoke orders require 40% advance payment.', category: 'Payment' },
  { q: 'Is my payment information secure?', a: 'Yes. All transactions are processed through PCI-compliant payment gateways with end-to-end encryption.', category: 'Payment' },
];

const categories = ['All', ...new Set(faqData.map(f => f.category))];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return faqData.filter(f => {
      const matchesSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="faqs-page">
      <div className="container">
        <div className="text-center" style={{ padding: 'var(--zq-space-16) 0 var(--zq-space-8)' }}>
          <p className="uppercase tracking-widest text-xs mb-2" style={{ color: 'var(--zq-gold)' }}>Support</p>
          <h1>FAQs</h1>
          <p className="text-muted mt-4" style={{ maxWidth: 500, margin: 'var(--zq-space-4) auto 0' }}>Everything you need to know about shopping with ZaQueen.</p>
        </div>

        <div className="faqs-search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)} className="glass-input" />
        </div>

        <div className="faq-categories flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button key={cat} className={`faq-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </div>

        <div className="faqs-list">
          {filtered.length === 0 && (
            <p className="text-center text-muted" style={{ padding: 'var(--zq-space-12) 0' }}>No matching questions found.</p>
          )}
          {filtered.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === index ? null : index)} aria-expanded={openIndex === index}>
                <span>{faq.q}</span>
                <span className="faq-badge">{faq.category}</span>
                {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openIndex === index && (
                <div className="faq-answer"><p>{faq.a}</p></div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contact-cta text-center glass-card mt-12">
          <h3>Still have questions?</h3>
          <p className="text-muted mt-2 mb-6">Our support team is here to help.</p>
          <a href="mailto:hello@zaqueen.com" className="glass-btn glass-btn-primary">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
