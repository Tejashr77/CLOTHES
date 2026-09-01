import React from 'react';
import { MapPin } from 'lucide-react';
import './FindUs.css';

const locations = [
  { name: 'ZaQueen Flagship Atelier', address: '123 Fashion Avenue, Bandra West, Mumbai 400050', hours: 'Mon-Sat: 10AM-7PM', phone: '+91 98765 43210' },
  { name: 'ZaQueen Delhi Studio', address: '45 Design Colony, Shahpur Jat, New Delhi 110049', hours: 'Mon-Sat: 11AM-8PM', phone: '+91 98765 43211' },
  { name: 'ZaQueen Bangalore Atelier', address: '78 Brigade Road, Bangalore 560001', hours: 'Tue-Sat: 10AM-6PM', phone: '+91 98765 43212' },
];

const FindUs = () => {
  return (
    <div className="page-container container">
      <div className="findus-header text-center">
        <h1>Find Us</h1>
        <p>Visit our ateliers for a personal styling experience and bespoke consultations.</p>
      </div>

      <div className="locations-grid">
        {locations.map((loc, index) => (
          <div key={index} className="location-card">
            <div className="location-icon">
              <MapPin size={28} />
            </div>
            <h3>{loc.name}</h3>
            <p>{loc.address}</p>
            <p><strong>Hours:</strong> {loc.hours}</p>
            <p><strong>Phone:</strong> {loc.phone}</p>
          </div>
        ))}
      </div>

      <div className="map-placeholder">
        <div className="map-box">
          <p>Map integration available with Google Maps API key.</p>
          <p>Contact us for appointment-based visits.</p>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
