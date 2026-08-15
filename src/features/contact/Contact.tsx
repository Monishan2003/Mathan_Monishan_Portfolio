"use client"

import React, { useState } from "react"

interface ContactProps {
  fullName?: string
  location?: string
  email?: string
  phone?: string
  whatsappNumber?: string
}

export default function Contact({
  fullName = "Mathan Monishan",
  location = "Thalaimannar, Mannar, Sri Lanka",
  email = "mathanmonishan@gmail.com",
  phone = "+94 76 763 4359",
  whatsappNumber = "94767634359",
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
        setStatusMessage(
          "Thank you! Your message has been sent successfully. I'll get back to you soon."
        )
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 6000)
      } else {
        throw new Error(data.error || "Failed to submit form")
      }
    } catch (err) {
      console.error("Contact submit error:", err)
      // Fallback: offer mailto or show error
      setStatus("error")
      setStatusMessage(
        "Could not send directly via server. Opening your email client instead..."
      )
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        formData.subject || "Contact from Portfolio"
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`
      window.location.href = mailtoLink
      setTimeout(() => setStatus("idle"), 7000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "")
    const msg = encodeURIComponent(
      "Hello! I visited your portfolio and would like to get in touch."
    )
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, "_blank")
  }

  return (
    <section id="contact" style={{ background: "transparent" }}>
      <div className="container">
        <h2 className="section-title">
          Contact Me
          <span className="section-subtitle">Get In Touch</span>
        </h2>

        <div className="contact-grid">
          {/* Left Column: Contact Details */}
          <div className="contact-info-panel">
            <h3 className="contact-subhead">Get in Touch</h3>
            <p className="contact-text">
              Feel free to reach out to me for any inquiries, collaboration
              opportunities, or just to say hello. I&apos;m always open to
              discussing new projects and ideas.
            </p>

            <div className="contact-details-list">
              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-user" />
                </div>
                <div>
                  <h4 className="detail-label">Name</h4>
                  <p className="detail-value">{fullName}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <h4 className="detail-label">Location</h4>
                  <p className="detail-value">{location}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <h4 className="detail-label">Email</h4>
                  <a href={`mailto:${email}`} className="detail-value">
                    {email}
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon whatsapp-icon-bg">
                  <i className="fab fa-whatsapp" />
                </div>
                <div>
                  <h4 className="detail-label">WhatsApp</h4>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-value"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="whatsapp-action-btn"
              >
                <i className="fab fa-whatsapp" /> Message me on WhatsApp
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-panel">
            <h3 className="contact-subhead">Send a Message</h3>

            {status === "success" && (
              <div className="form-alert success">
                <i className="fas fa-check-circle" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === "error" && (
              <div className="form-alert error">
                <i className="fas fa-info-circle" />
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
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
                    placeholder="Enter your name"
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
                    placeholder="Enter your email"
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
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="btn"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" /> Sending Message...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 50px;
        }

        .contact-info-panel,
        .contact-form-panel {
          background: #ffffff;
          padding: 36px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(43, 63, 167, 0.08);
        }

        .contact-subhead {
          font-size: 22px;
          color: var(--secondary-color);
          margin-bottom: 16px;
          font-family: var(--font-heading);
        }

        .contact-text {
          font-size: 15px;
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .contact-details-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .detail-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: rgba(43, 63, 167, 0.1);
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .whatsapp-icon-bg {
          background: rgba(37, 211, 102, 0.15);
          color: #25d366;
        }

        .detail-label {
          font-size: 13px;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .detail-value {
          font-size: 15px;
          color: var(--text-dark);
          font-weight: 600;
          text-decoration: none;
        }

        .whatsapp-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25d366;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }

        .whatsapp-action-btn:hover {
          background: #20ba59;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.3);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-dark);
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14.5px;
          font-family: inherit;
          color: var(--text-dark);
          background: #f8fafc;
          transition: all 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(43, 63, 167, 0.15);
        }

        .form-alert {
          padding: 14px 18px;
          border-radius: 8px;
          margin-bottom: 18px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .form-alert.success {
          background: #e6f9ed;
          color: #1b873f;
          border: 1px solid #c2eecf;
        }

        .form-alert.error {
          background: #f0f4ff;
          color: var(--primary-color);
          border: 1px solid #d4e0ff;
        }

        @media (max-width: 868px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
