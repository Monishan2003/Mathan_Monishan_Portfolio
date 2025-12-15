import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const phoneNumber = '94767634359';
    const message = encodeURIComponent('Hello! I visited your portfolio and would like to get in touch.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Mathan Monishan</h3>
            <p>
              A passionate IT student and web developer focused on creating meaningful 
              digital experiences through innovative solutions.
            </p>
            <div className="social-links">
              <a 
                href="https://www.linkedin.com/in/mathan-monishan2003" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="https://github.com/Monishan2003" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a 
                href="https://x.com/Monishan2003?t=Zqbc0FzwBRojAUvPEy4h7w&s=09" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://www.instagram.com/monishan_2003?igsh=MThiNGJrd3AwYWhrNg==" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://wa.me/94767634359" 
                onClick={handleWhatsAppClick}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{ background: 'rgba(37, 211, 102, 0.2)' }}
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home"><i className="fas fa-chevron-right"></i> Home</a></li>
              <li><a href="#about"><i className="fas fa-chevron-right"></i> About</a></li>
              <li><a href="#education"><i className="fas fa-chevron-right"></i> Education</a></li>
              <li><a href="#projects"><i className="fas fa-chevron-right"></i> Projects</a></li>
              <li><a href="#skills"><i className="fas fa-chevron-right"></i> Skills</a></li>
              <li><a href="#contact"><i className="fas fa-chevron-right"></i> Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Info</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i> Thalaimannar, Mannar, Sri Lanka
                </a>
              </li>
              <li>
                <a href="mailto:mathanmonishan@gmail.com">
                  <i className="fas fa-envelope"></i> mathanmonishan@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/94767634359" onClick={handleWhatsAppClick}>
                  <i className="fab fa-whatsapp"></i> +94 76 763 4359 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          <span>
            Created By <a href="#home">Mathan Monishan</a> | 
            <span className="far fa-copyright"></span> {currentYear} All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

