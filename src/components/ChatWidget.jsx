import React, { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to ZaQueen! How can we help you today?' },
    { from: 'bot', text: 'Ask us about orders, sizing, bespoke couture, or anything else.' },
  ]);
  const [input, setInput] = useState('');

  const quickReplies = ['Track my order', 'Size help', 'Bespoke inquiry', 'Return/Exchange'];

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    // Simulated bot response
    setTimeout(() => {
      const responses = {
        'Track my order': 'Please share your order ID and we\'ll look it up for you.',
        'Size help': 'Our size guide is available on every product page. Would you like help with a specific item?',
        'Bespoke inquiry': 'Our bespoke team will get back to you within 24 hours. You can also start a bespoke request at /bespoke.',
        'Return/Exchange': 'RTW items can be exchanged within 7 days. Please contact hello@zaqueen.com with your order number.',
      };
      setMessages(prev => [...prev, { from: 'bot', text: responses[text] || 'Thanks for your message! Our team will respond shortly via WhatsApp or email.' }]);
    }, 1000);
  };

  return (
    <>
      <button className="chat-fab" onClick={() => setIsOpen(!isOpen)} data-cursor="link" aria-label="Open chat">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && <span className="chat-fab-pulse" />}
      </button>

      {isOpen && (
        <div className="chat-window glass">
          <div className="chat-header glass-dark">
            <div>
              <h4>ZaQueen Concierge</h4>
              <p className="chat-status">Online now</p>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg-${msg.from}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="chat-quick-replies">
            {quickReplies.map(reply => (
              <button key={reply} className="quick-reply" onClick={() => sendMessage(reply)}>{reply}</button>
            ))}
          </div>

          <div className="chat-input-area">
            <input type="text" placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage(input)} />
            <button onClick={() => sendMessage(input)} aria-label="Send"><Send size={18} /></button>
          </div>

          <div className="chat-footer">
            <span>Powered by ZaQueen Concierge</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
