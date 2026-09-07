import React, { useState } from 'react';
import { X, Ruler, ChevronDown, ChevronUp, Check } from 'lucide-react';
import './SizeGuideModal.css';

const sizeData = [
  { size: 'XS', us: '0-2', bust: '31-32', waist: '24-25', hips: '34-35' },
  { size: 'S', us: '4-6', bust: '33-34', waist: '26-27', hips: '36-37' },
  { size: 'M', us: '8-10', bust: '35-36', waist: '28-29', hips: '38-39' },
  { size: 'L', us: '12-14', bust: '37-39', waist: '30-32', hips: '40-42' },
  { size: 'XL', us: '16-18', bust: '40-42', waist: '33-35', hips: '43-45' },
];

const measureSteps = [
  { label: 'Bust', instruction: 'Measure around the fullest part of your chest, keeping the tape level.', point: 'bust' },
  { label: 'Waist', instruction: 'Measure around your natural waistline, the narrowest part of your torso.', point: 'waist' },
  { label: 'Hips', instruction: 'Measure around the fullest part of your hips and seat.', point: 'hips' },
];

const BodyDiagram = ({ activePoint }) => (
  <svg viewBox="0 0 200 400" className="body-diagram" aria-label="Body measurement diagram">
    {/* Body outline */}
    <path
      d="M100 30 C115 30 125 45 125 60 C125 75 115 85 108 90 L115 120 L135 130 L140 170 L130 175 L120 140 L118 180 L125 280 L130 340 L120 380 L100 395 L80 380 L70 340 L75 280 L82 180 L80 140 L70 175 L60 170 L65 130 L85 120 L92 90 C85 85 75 75 75 60 C75 45 85 30 100 30Z"
      fill="var(--zq-gray-100)"
      stroke="var(--zq-gray-300)"
      strokeWidth="1.5"
    />
    {/* Head */}
    <circle cx="100" cy="20" r="15" fill="var(--zq-gray-100)" stroke="var(--zq-gray-300)" strokeWidth="1.5" />

    {/* Measurement lines */}
    {/* Bust */}
    <line x1="65" y1="130" x2="135" y2="130" stroke={activePoint === 'bust' ? 'var(--zq-primary)' : 'var(--zq-gray-300)'} strokeWidth="2" strokeDasharray={activePoint === 'bust' ? 'none' : '4,3'} />
    <circle cx="65" cy="130" r="4" fill={activePoint === 'bust' ? 'var(--zq-primary)' : 'var(--zq-gray-300)'} />
    <circle cx="135" cy="130" r="4" fill={activePoint === 'bust' ? 'var(--zq-primary)' : 'var(--zq-gray-300)'} />
    {activePoint === 'bust' && <text x="148" y="134" className="diagram-label">Bust</text>}

    {/* Waist */}
    <line x1="72" y1="170" x2="128" y2="170" stroke={activePoint === 'waist' ? 'var(--zq-primary)' : 'var(--zq-gray-300)'} strokeWidth="2" strokeDasharray={activePoint === 'waist' ? 'none' : '4,3'} />
    <circle cx="72" cy="170" r="4" fill={activePoint === 'waist' ? 'var(--zq-primary)' : 'var(--zq-gray-300)'} />
    <circle cx="128" cy="170" r="4" fill={activePoint === 'waist' ? 'var(--zq-primary)' : 'var(--zq-gray-300)'} />
    {activePoint === 'waist' && <text x="140" y="174" className="diagram-label">Waist</text>}

    {/* Hips */}
    <line x1="65" y1="220" x2="135" y2="220" stroke={activePoint === 'hips' ? 'var(--zq-primary)' : 'var(--zq-gray-300)'} strokeWidth="2" strokeDasharray={activePoint === 'hips' ? 'none' : '4,3'} />
    <circle cx="65" cy="220" r="4" fill={activePoint === 'hips' ? 'var(--zq-primary)' : 'var(--zq-gray-300)'} />
    <circle cx="135" cy="220" r="4" fill={activePoint === 'hips' ? 'var(--zq-primary)' : 'var(--zq-gray-300)'} />
    {activePoint === 'hips' && <text x="148" y="224" className="diagram-label">Hips</text>}
  </svg>
);

const SizeGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('chart');
  const [activePoint, setActivePoint] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="sg-overlay" onClick={onClose}>
      <div className="sg-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sg-header">
          <div className="sg-header-left">
            <Ruler size={20} strokeWidth={1.5} />
            <h2>Size Guide</h2>
          </div>
          <button className="sg-close" onClick={onClose} aria-label="Close size guide">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Tabs */}
        <div className="sg-tabs">
          <button className={`sg-tab ${activeTab === 'chart' ? 'active' : ''}`} onClick={() => setActiveTab('chart')}>
            Size Chart
          </button>
          <button className={`sg-tab ${activeTab === 'measure' ? 'active' : ''}`} onClick={() => setActiveTab('measure')}>
            How to Measure
          </button>
          <button className={`sg-tab ${activeTab === 'tips' ? 'active' : ''}`} onClick={() => setActiveTab('tips')}>
            Fit Tips
          </button>
          <div className={`sg-tab-indicator ${activeTab === 'chart' ? 'pos-0' : activeTab === 'measure' ? 'pos-1' : 'pos-2'}`}></div>
        </div>

        {/* Content */}
        <div className="sg-content">
          {/* Size Chart Tab */}
          {activeTab === 'chart' && (
            <div className="sg-chart-tab">
              <p className="sg-note">All measurements are in inches. Find your size by comparing your body measurements.</p>
              <div className="sg-table-wrap">
                <table className="sg-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>US</th>
                      <th>Bust</th>
                      <th>Waist</th>
                      <th>Hips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.map(row => (
                      <tr key={row.size}>
                        <td><strong>{row.size}</strong></td>
                        <td>{row.us}</td>
                        <td>{row.bust}</td>
                        <td>{row.waist}</td>
                        <td>{row.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sg-chart-note">If you're between sizes, we recommend sizing down for a fitted look or up for a relaxed fit.</p>
            </div>
          )}

          {/* How to Measure Tab */}
          {activeTab === 'measure' && (
            <div className="sg-measure-tab">
              <div className="sg-measure-layout">
                <div className="sg-diagram-wrap">
                  <BodyDiagram activePoint={activePoint} />
                </div>
                <div className="sg-steps">
                  {measureSteps.map((step, i) => (
                    <button
                      key={step.label}
                      className={`sg-step ${expandedStep === i ? 'expanded' : ''} ${activePoint === step.point ? 'active' : ''}`}
                      onClick={() => { setExpandedStep(expandedStep === i ? null : i); setActivePoint(activePoint === step.point ? null : step.point); }}
                      onMouseEnter={() => setActivePoint(step.point)}
                      onMouseLeave={() => setActivePoint(null)}
                    >
                      <div className="sg-step-header">
                        <div className={`sg-step-num ${activePoint === step.point ? 'active' : ''}`}>{i + 1}</div>
                        <span className="sg-step-label">{step.label}</span>
                        {expandedStep === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                      {expandedStep === i && (
                        <div className="sg-step-body">
                          <p>{step.instruction}</p>
                        </div>
                      )}
                    </button>
                  ))}
                  <div className="sg-measure-tip">
                    <p><strong>Tip:</strong> Use a soft measuring tape and keep it snug but not tight. Measure over undergarments for the most accurate result.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fit Tips Tab */}
          {activeTab === 'tips' && (
            <div className="sg-tips-tab">
              <div className="sg-tip-card">
                <h4>Between Sizes?</h4>
                <p>If your measurements fall between two sizes, choose the smaller size for a more fitted silhouette or the larger size for a relaxed, comfortable fit.</p>
              </div>
              <div className="sg-tip-card">
                <h4>Size Up</h4>
                <ul className="sg-tip-list">
                  <li><Check size={14} strokeWidth={2} /> Prefer a relaxed or oversized fit</li>
                  <li><Check size={14} strokeWidth={2} /> Have broader shoulders or fuller bust</li>
                  <li><Check size={14} strokeWidth={2} /> Are purchasing structured fabrics</li>
                </ul>
              </div>
              <div className="sg-tip-card">
                <h4>Size Down</h4>
                <ul className="sg-tip-list">
                  <li><Check size={14} strokeWidth={2} /> Prefer a body-hugging fit</li>
                  <li><Check size={14} strokeWidth={2} /> Have a petite frame</li>
                  <li><Check size={14} strokeWidth={2} /> Are purchasing stretchy or flowy fabrics</li>
                </ul>
              </div>
              <div className="sg-tip-card sg-tip-help">
                <h4>Still unsure?</h4>
                <p>Our team is happy to help you find your perfect fit. Reach out to us on WhatsApp or email with your measurements.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
