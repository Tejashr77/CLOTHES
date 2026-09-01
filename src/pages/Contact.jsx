import React, { useState } from 'react';
import api from '../api/client';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.submitContact(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container container">
      <div className="contact-layout">
        <div className="contact-info">
          <h1>Contact Us</h1>
          <p className="contact-subtitle">We'd love to hear from you. Reach out for orders, inquiries, or collaborations.</p>

          <div className="contact-details">
            <div className="contact-detail">
              <h3>Email</h3>
              <p>hello@zaqueen.com</p>
            </div>
            <div className="contact-detail">
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </div>
            <div className="contact-detail">
              <h3>Atelier Hours</h3>
              <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
              <p>Sunday: By Appointment Only</p>
            </div>
            <div className="contact-detail">
              <h3>Address</h3>
              <p>ZaQueen Atelier</p>
              <p>123 Fashion Avenue, Bandra West</p>
              <p>Mumbai, Maharashtra 400050</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          {submitted ? (
            <div className="contact-success">
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <Button variant="primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>Send Another Message</Button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {error && <p style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>{error}</p>}
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select className="form-select" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required>
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="bespoke">Bespoke Couture</option>
                  <option value="return">Returns & Exchanges</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell us how we can help..." rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required></textarea>
              </div>
              <Button variant="primary" className="contact-submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
