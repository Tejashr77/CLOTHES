import React, { useState } from 'react';
import { GlassButton, GlassInput } from '../components/glass';
import { Package, ArrowRight, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import './Returns.css';

const statusIcons = {
  pending: <Clock size={20} />,
  approved: <CheckCircle size={20} />,
  shipped: <Truck size={20} />,
  completed: <CheckCircle size={20} />,
  rejected: <XCircle size={20} />,
};

const Returns = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="returns-page container">
      <div className="text-center" style={{ padding: 'var(--zq-space-16) 0 var(--zq-space-8)' }}>
        <p className="uppercase tracking-widest text-xs mb-2" style={{ color: 'var(--zq-gold)' }}>Returns & Exchanges</p>
        <h1>Easy Returns</h1>
        <p className="text-muted mt-4" style={{ maxWidth: 500, margin: 'var(--zq-space-4) auto 0' }}>We want you to love your purchase. If something isn't right, we'll make it easy to return or exchange.</p>
      </div>

      <div className="returns-layout">
        <div className="returns-info">
          <h3>Return Policy</h3>
          <div className="policy-steps">
            <div className="policy-step">
              <div className="step-icon"><Package size={20} /></div>
              <div>
                <h4>Initiate Return</h4>
                <p>Fill out the form with your order details within 7 days of delivery.</p>
              </div>
            </div>
            <div className="policy-step">
              <div className="step-icon"><Truck size={20} /></div>
              <div>
                <h4>Pickup Scheduled</h4>
                <p>We'll arrange a free pickup from your address.</p>
              </div>
            </div>
            <div className="policy-step">
              <div className="step-icon"><CheckCircle size={20} /></div>
              <div>
                <h4>Refund or Exchange</h4>
                <p>Choose a refund to original payment or exchange for a different size/item.</p>
              </div>
            </div>
          </div>

          <div className="policy-notes">
            <h4>Important Notes</h4>
            <ul>
              <li>Items must be unworn, unwashed, with all original tags attached</li>
              <li>RTW items eligible within 7 days of delivery</li>
              <li>Bespoke/couture orders are final sale</li>
              <li>Free exchanges for different sizes</li>
              <li>Refunds processed within 7-10 business days</li>
            </ul>
          </div>
        </div>

        <div className="returns-form-container glass-card">
          {submitted ? (
            <div className="returns-success text-center">
              <CheckCircle size={48} style={{ color: 'var(--zq-success)', marginBottom: 'var(--zq-space-4)' }} />
              <h3>Return Request Submitted</h3>
              <p className="text-muted mt-2 mb-6">We'll review your request and email you within 24 hours with next steps.</p>
              <GlassButton variant="primary" onClick={() => setSubmitted(false)}>Submit Another Request</GlassButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="mb-6">Start a Return</h3>
              <div className="form-group mb-4">
                <label className="form-label">Order ID</label>
                <input type="text" placeholder="e.g. ZQ-123456" value={orderId} onChange={e => setOrderId(e.target.value)} className="glass-input" required />
              </div>
              <div className="form-group mb-4">
                <label className="form-label">Email Address</label>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="glass-input" required />
              </div>
              <div className="form-group mb-4">
                <label className="form-label">Reason for Return</label>
                <select value={reason} onChange={e => setReason(e.target.value)} className="glass-input glass-select" required>
                  <option value="">Select a reason</option>
                  <option value="size">Wrong size</option>
                  <option value="quality">Quality issue</option>
                  <option value="wrong-item">Wrong item received</option>
                  <option value="not-as-described">Not as described</option>
                  <option value="changed-mind">Changed my mind</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label className="form-label">Additional Details</label>
                <textarea placeholder="Tell us more..." rows={4} value={details} onChange={e => setDetails(e.target.value)} className="glass-input glass-textarea" />
              </div>
              <GlassButton variant="primary" type="submit" className="w-full">Submit Return Request</GlassButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Returns;
