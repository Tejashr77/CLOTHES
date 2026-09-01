import React from 'react';
import './Legal.css';

const Policies = () => (
  <div className="page-container container">
    <div className="legal-content">
      <h1>Our Policies</h1>

      <section>
        <h2>Shipping Policy</h2>
        <p>All Ready-to-Wear orders are dispatched within 3-5 business days. Domestic orders above ₹50,000 qualify for complimentary express shipping. Standard domestic delivery takes 5-7 business days. International orders are shipped via premium courier services and typically arrive within 10-15 business days.</p>
        <p>You will receive tracking information via email once your order has been dispatched.</p>
      </section>

      <section>
        <h2>Exchange Policy</h2>
        <p>We want you to love your purchase. If an RTW item doesn't fit perfectly, we offer exchanges within 7 days of delivery. Items must be unworn, unwashed, and have all original tags attached.</p>
        <p>To initiate an exchange, please contact us at hello@zaqueen.com with your order number and reason for exchange.</p>
      </section>

      <section>
        <h2>Refund Policy</h2>
        <p>Refunds are processed for defective or damaged items upon verification. Refunds are credited to the original payment method within 7-10 business days. Bespoke couture orders are final sale and non-refundable.</p>
      </section>

      <section>
        <h2>Bespoke Orders</h2>
        <p>All bespoke couture orders require a 40% upfront payment to begin the design process. The remaining 60% is due upon completion and before delivery. Bespoke orders are final sale and cannot be returned or exchanged.</p>
      </section>
    </div>
  </div>
);

export default Policies;
