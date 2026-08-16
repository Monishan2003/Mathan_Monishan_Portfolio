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
  fullName: _fullName = "Mathan Monishan",
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
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("idle")

    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus("error")
        setErrorMessage(data.error || "Failed to send message. Please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Network error. Please reach out directly via WhatsApp or Email.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-wrapper contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <i className="fas fa-paper-plane" />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-headline">
            Let&apos;s build something meaningful.
          </h2>
          <p className="section-subtext">
            Available for engineering internships, technical collaborations, AI automation projects, and innovative venture opportunities.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="contact-grid">
          {/* Left Column: Direct Channels */}
          <div className="contact-info-column">
            <div className="contact-info-card">
              <h3 className="info-card-title">Direct Channels</h3>
              <p className="info-card-desc">
                Feel free to reach out directly through email, phone, or instant WhatsApp messaging.
              </p>

              <div className="channels-list">
                {/* Email */}
                <a href={`mailto:${email}`} className="channel-item">
                  <div className="channel-icon-box email">
                    <i className="fas fa-envelope" />
                  </div>
                  <div>
                    <div className="channel-label">Email Address</div>
                    <div className="channel-value">{email}</div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    "Hello Monishan! I visited your portfolio and would like to connect."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item"
                >
                  <div className="channel-icon-box whatsapp">
                    <i className="fab fa-whatsapp" />
                  </div>
                  <div>
                    <div className="channel-label">WhatsApp (Fast Response)</div>
                    <div className="channel-value">{phone}</div>
                  </div>
                </a>

                {/* Location */}
                <div className="channel-item static">
                  <div className="channel-icon-box location">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div>
                    <div className="channel-label">Location & Base</div>
                    <div className="channel-value">{location}</div>
                  </div>
                </div>
              </div>

              {/* Founder Note */}
              <div className="founder-callout">
                <div className="callout-header">
                  <i className="fas fa-rocket text-blue" />
                  <span>Looking to automate your workflows?</span>
                </div>
                <p className="callout-text">
                  You can also schedule an AI automation discovery call directly for your company or startup through <strong>Pynimox</strong>.
                </p>
                <a
                  href="https://www.pynimox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="callout-link"
                >
                  <span>Explore Pynimox Studio</span>
                  <i className="fas fa-arrow-right" style={{ fontSize: "11px" }} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Fast Inquiry Form */}
          <div className="contact-form-column">
            <div className="contact-form-card">
              <h3 className="form-card-title">Send a Direct Message</h3>

              {status === "success" && (
                <div className="alert-box success">
                  <i className="fas fa-check-circle" />
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p>Thank you for reaching out. I will respond to your inquiry promptly.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="alert-box error">
                  <i className="fas fa-exclamation-circle" />
                  <div>
                    <strong>Submission failed</strong>
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Your Name <span className="req">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject <span className="req">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="e.g. Internship Opportunity / Software Project"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Describe your project, idea, or role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary form-submit-btn"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane" />
                      <span>Send Direct Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          background: #ffffff;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 36px;
          align-items: start;
        }

        .contact-info-card,
        .contact-form-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 36px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .info-card-title,
        .form-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .info-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 24px;
        }

        .channels-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 28px;
        }

        .channel-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 16px 20px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .channel-item:not(.static):hover {
          border-color: #93c5fd;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.08);
          transform: translateX(4px);
        }

        .channel-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .channel-icon-box.email {
          background: rgba(37, 99, 235, 0.08);
          color: #2563eb;
        }

        .channel-icon-box.whatsapp {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .channel-icon-box.location {
          background: rgba(239, 68, 68, 0.08);
          color: #dc2626;
        }

        .channel-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .channel-value {
          font-size: 14.5px;
          font-weight: 600;
          color: #0f172a;
          margin-top: 2px;
        }

        .founder-callout {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px;
        }

        .callout-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .text-blue {
          color: #2563eb;
        }

        .callout-text {
          font-size: 13px;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 12px;
        }

        .callout-link {
          font-size: 13px;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s ease;
        }

        .callout-link:hover {
          gap: 9px;
          color: #1d4ed8;
        }

        /* Form */
        .inquiry-form {
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

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        .req {
          color: #ef4444;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 14px;
          color: #0f172a;
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .form-submit-btn {
          width: 100%;
          padding: 14px;
          font-size: 15px;
          border-radius: 10px;
          margin-top: 6px;
        }

        .alert-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 13.5px;
        }

        .alert-box.success {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
        }

        .alert-box.error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-info-card,
          .contact-form-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  )
}
