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
      <div className="bespoke-page page-container container">
        <div className="bespoke-success">
          <h1>Design Request Received</h1>
          <p>
            Thank you for your bespoke order. Our design team will review your
            inspiration and measurements, and reach out within 48 hours to begin
            the collaborative design process.
          </p>
          <p className="success-highlight">
            40% advance payment link will be sent via email.
          </p>
          <div style={{ marginTop: 'var(--zq-space-8)' }}>
            <Button variant="primary" onClick={() => setSubmitted(false)}>
              Submit Another Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bespoke-page page-container container">
      <div className="bespoke-header">
        <h1>Bespoke Couture</h1>
        <p>Design your own ZaQueen masterpiece. Upload your inspiration and let's begin.</p>
      </div>

      <div className="bespoke-form-container">
        {error && <div className="bespoke-error">{error}</div>}

        <form className="bespoke-form" onSubmit={handleSubmit}>
          {/* Step 1: Upload Inspiration */}
          <div className="form-step">
            <div className="form-step-header">
              <span className="form-step-number">1</span>
              <span className="form-step-title">Upload Inspiration</span>
            </div>
            <p className="form-step-subtitle">Add a reference photo of the outfit you love.</p>
            <div
              className={`upload-area ${fileName ? 'has-file' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {fileName ? (
                <p className="upload-filename">{fileName}</p>
              ) : (
                <>
                  <div className="upload-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="upload-text">Click to upload or drag & drop your outfit photo here</p>
                  <button type="button" className="upload-btn">Select Image</button>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
          </div>

          <div className="form-divider"></div>

          {/* Step 2: Measurements */}
          <div className="form-step">
            <div className="form-step-header">
              <span className="form-step-number">2</span>
              <span className="form-step-title">Your Measurements</span>
            </div>
            <p className="form-step-subtitle">Your privacy is important to us. These details are kept secure.</p>
            <div className="measurement-grid">
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

          <div className="form-divider"></div>

          {/* Step 3: Customization */}
          <div className="form-step">
            <div className="form-step-header">
              <span className="form-step-number">3</span>
              <span className="form-step-title">Customization Details</span>
            </div>
            <p className="form-step-subtitle">Tell us how you'd like your piece to look and feel.</p>
            <div className="measurement-grid" style={{ marginBottom: 'var(--zq-space-5)' }}>
              <div className="form-group">
                <label>Preferred Fabric Feel</label>
                <select value={form.fabric} onChange={e => setForm({ ...form, fabric: e.target.value })}>
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

          {/* Submit */}
          <div className="form-actions">
            <p className="payment-note">40% upfront payment is required to begin the design process.</p>
            <Button variant="primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Proceed to Payment (40%)'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BespokeCouture;
