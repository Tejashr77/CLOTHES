import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQs.css';

const faqData = [
  { q: 'What sizes do you offer?', a: 'Our Ready-to-Wear collection is available in sizes XS through XL. Our Bespoke Couture service is fully custom and made to your exact measurements.' },
  { q: 'How long does bespoke couture take?', a: 'From initial consultation to final delivery, bespoke orders typically take 4-6 weeks. Rush orders may be available for an additional fee.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship worldwide. Domestic orders above ₹50,000 qualify for free shipping. International shipping rates vary by location.' },
  { q: 'What is your return policy?', a: 'RTW items can be exchanged within 7 days of delivery, provided they are unworn and have all tags attached. Bespoke orders are final sale.' },
  { q: 'How do I provide measurements for bespoke orders?', a: 'After placing a bespoke order, you will receive a detailed measurement guide with video instructions. You can also visit our atelier for a professional fitting.' },
  { q: 'Can I request modifications to an existing design?', a: 'Absolutely! Our bespoke service allows you to customize any aspect of a design — from fabric and color to neckline and length.' },
  { q: 'Do you offer alterations?', a: 'Yes, we offer complimentary alterations on RTW purchases within 15 days. Simply visit any of our stores with your receipt.' },
  { q: 'How do I care for my ZaQueen garment?', a: 'Each garment comes with specific care instructions. Generally, we recommend dry cleaning for embellished and structured pieces, and gentle hand wash for lighter fabrics.' },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-container container">
      <div className="faqs-header text-center">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about shopping with ZaQueen.</p>
      </div>

      <div className="faqs-list">
        {faqData.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => toggle(index)}>
              <span>{faq.q}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
