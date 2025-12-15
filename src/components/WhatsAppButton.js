import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const handleClick = () => {
    const phoneNumber = '94767634359'; // Remove + and spaces
    const message = encodeURIComponent('Hello! I visited your portfolio and would like to get in touch.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="whatsapp-float" onClick={handleClick} aria-label="Contact on WhatsApp">
      <div className="whatsapp-icon">
        <i className="fab fa-whatsapp"></i>
      </div>
      <span className="whatsapp-tooltip">Chat on WhatsApp</span>
    </div>
  );
};

export default WhatsAppButton;

