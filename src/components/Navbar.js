import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e, section) => {
    e.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrollY > 20 ? 'sticky' : ''}`}>
      <div className="container">
        <div className="logo">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
            Mathan Monishan
          </a>
        </div>
        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#education" 
              className={activeSection === 'education' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'education')}
            >
              Education
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'projects')}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#skills" 
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'skills')}
            >
              Skills
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="menu-btn" onClick={handleMenuClick}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

