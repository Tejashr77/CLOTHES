import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import Button from '../components/Button';
import './Bespoke.css';

const BespokeCouture = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    bust: '', waist: '', hips: '', height: '',
    fabric: 'Flowy & Light (e.g., Chiffon, Silk)', colorPreference: '', notes: ''
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/account');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      if (fileInputRef.current?.files[0]) {
        formData.append('inspirationImage', fileInputRef.current.files[0]);
      }
      formData.append('measurements', JSON.stringify({
        bust: Number(form.bust), waist: Number(form.waist),
        hips: Number(form.hips), height: Number(form.height),
      }));
      formData.append('fabricPreference', form.fabric);
      formData.append('colorPreference', form.colorPreference);
      formData.append('additionalNotes', form.notes);
      await api.createBespoke(formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="page-container container text-center">
        <div style={{ marginTop: '4rem' }}>
          <h1>Design Request Received!</h1>
          <p style={{ marginTop: '1rem', color: 'var(--color-gray-dark)', maxWidth: 600, margin: '1rem auto' }}>
            Thank you for your bespoke order. Our design team will review your inspiration and measurements,
            and reach out within 48 hours to begin the collaborative design process.
          </p>
          <p style={{ color: 'var(--color-gold)', fontWeight: 600, marginTop: '1rem' }}>
            40% advance payment link will be sent via email.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Button variant="primary" onClick={() => setSubmitted(false)}>Submit Another Request</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bespoke-page page-container container">
      <div className="bespoke-header text-center">
        <h1>Bespoke Couture</h1>
        <p>Design your own ZaQueen masterpiece. Upload your inspiration and let's begin.</p>
      </div>

      <div className="bespoke-form-container">
        {error && <p style={{ color: 'var(--color-accent)', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
        <form className="bespoke-form" onSubmit={handleSubmit}>
          <div className="form-step">
            <h3>1. Upload Inspiration</h3>
            <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
              {fileName ? (
                <p style={{ color: 'var(--color-gold)', fontWeight: 500 }}>{fileName}</p>
              ) : (
                <>
                  <p>Click to upload or drag & drop your outfit photo here</p>
                  <Button variant="outline" type="button">Select Image</Button>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
          </div>

          <div className="form-step">
            <h3>2. Your Measurements</h3>
            <p className="help-text">Your privacy is important to us. These details are kept secure.</p>
            <div className="grid measurement-grid gap-md">
              <div className="form-group">
                <label>Bust (inches)</label>
                <input type="number" placeholder="e.g. 34" value={form.bust} onChange={e => setForm({ ...form, bust: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Waist (inches)</label>
                <input type="number" placeholder="e.g. 26" value={form.waist} onChange={e => setForm({ ...form, waist: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Hips (inches)</label>
                <input type="number" placeholder="e.g. 36" value={form.hips} onChange={e => setForm({ ...form, hips: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <input type="number" placeholder="e.g. 165" value={form.height} onChange={e => setForm({ ...form, height: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="form-step">
            <h3>3. Customization Details</h3>
            <div className="grid measurement-grid gap-md" style={{ marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Preferred Fabric Feel</label>
                <select className="form-select" value={form.fabric} onChange={e => setForm({ ...form, fabric: e.target.value })}>
                  <option>Flowy & Light (e.g., Chiffon, Silk)</option>
                  <option>Structured & Heavy (e.g., Velvet, Brocade)</option>
                  <option>Stretchy & Form-fitting</option>
                  <option>Leave it to the Designer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Color Palette Preference</label>
                <input type="text" placeholder="e.g., Jewel tones, Bright Reds, Pastels..." value={form.colorPreference} onChange={e => setForm({ ...form, colorPreference: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Additional Notes</label>
              <textarea placeholder="Tell us what you love about the inspiration and any changes you'd like..." rows="4" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}></textarea>
            </div>
          </div>

          <div className="form-actions text-center mt-lg">
            <p className="payment-note">40% upfront payment is required to begin the design process.</p>
            <Button variant="primary" disabled={loading}>{loading ? 'Submitting...' : 'Proceed to Payment (40%)'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BespokeCouture;
