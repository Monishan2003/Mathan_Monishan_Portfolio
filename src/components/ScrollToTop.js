import React from 'react';
import './ScrollToTop.css';

const ScrollToTop = ({ scrollY }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`scroll-up-btn ${scrollY > 500 ? 'active' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <i className="fas fa-angle-up"></i>
    </div>
  );
};

export default ScrollToTop;

