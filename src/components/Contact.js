import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // EmailJS configuration
    // Option 1: Use environment variables (recommended for production)
    // Create a .env file with: REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, REACT_APP_EMAILJS_PUBLIC_KEY
    // Option 2: Replace these values directly (less secure)
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
    
    // Check if EmailJS is configured
    if (serviceID === 'YOUR_SERVICE_ID' || templateID === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      // Fallback: Open email client with pre-filled message
      const mailtoLink = `mailto:mathanmonishan@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      
      // Show success message
      setSubmitStatus('info');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 8000);
      return;
    }

    try {
      // Send email using EmailJS
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'mathanmonishan@gmail.com',
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '94767634359'; // Remove + and spaces
    const message = encodeURIComponent('Hello! I visited your portfolio and would like to get in touch.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">
          Contact Me
          <span className="section-subtitle">Get In Touch</span>
        </h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-text">Get in Touch</div>
            <p>
              Feel free to reach out to me for any inquiries, collaboration opportunities, 
              or just to say hello. I'm always open to discussing new projects and ideas.
            </p>
            
            <div className="contact-details">
              <div className="contact-detail">
                <i className="fas fa-user"></i>
                <div className="info">
                  <h4>Name</h4>
                  <p>Mathan Monishan</p>
                </div>
              </div>
              <div className="contact-detail">
                <i className="fas fa-map-marker-alt"></i>
                <div className="info">
                  <h4>Location</h4>
                  <p>Thalaimannar, Mannar, Sri Lanka</p>
                </div>
              </div>
              <div className="contact-detail">
                <i className="fas fa-envelope"></i>
                <div className="info">
                  <h4>Email</h4>
                  <p>mathanmonishan@gmail.com</p>
                </div>
              </div>
              <div className="contact-detail">
                <i className="fab fa-whatsapp"></i>
                <div className="info">
                  <h4>WhatsApp</h4>
                  <p>+94 76 763 4359</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Contact Button */}
            <div className="whatsapp-quick-contact">
              <button 
                type="button" 
                className="whatsapp-btn"
                onClick={handleWhatsAppClick}
              >
                <i className="fab fa-whatsapp"></i>
                Message me on WhatsApp
              </button>
            </div>
          </div>

          <div className="contact-form">
            <div className="form-title">Send a Message</div>
            <form id="contactForm" onSubmit={handleSubmit}>
              {submitStatus === 'success' && (
                <div className="form-message success">
                  <i className="fas fa-check-circle"></i>
                  Thank you! Your message has been sent. I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'info' && (
                <div className="form-message info">
                  <i className="fas fa-info-circle"></i>
                  <div>
                    <strong>EmailJS not configured yet.</strong> Opening your email client instead. 
                    <br />
                    <small>To enable automatic email notifications, set up EmailJS (see EMAILJS_SETUP.md) or use the WhatsApp button below.</small>
                  </div>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="form-message error">
                  <i className="fas fa-exclamation-circle"></i>
                  Oops! Something went wrong. Please try again or contact me via WhatsApp.
                </div>
              )}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
