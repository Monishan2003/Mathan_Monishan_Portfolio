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
    <section className="contact section" id="contact">
      <h2 className="section__title" data-heading="Get In Touch">
        Contact Me
      </h2>

      <div className="contact__container container grid">
        {/* Left Column: Contact Cards */}
        <div className="contact__content">
          <h3 className="contact__title">Talk to me</h3>

          <div className="contact__info">
            {/* Email Card */}
            <div className="contact__card">
              <i className="fas fa-envelope contact__card-icon" />
              <h3 className="contact__card-title">Email</h3>
              <span className="contact__card-data">{email}</span>
              <a
                href={`mailto:${email}`}
                className="contact__button"
              >
                <span>Write me</span>
                <i className="fas fa-arrow-right contact__button-icon" />
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="contact__card">
              <i className="fab fa-whatsapp contact__card-icon" />
              <h3 className="contact__card-title">WhatsApp</h3>
              <span className="contact__card-data">{phone}</span>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Hello Monishan! I visited your portfolio and would like to connect."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__button"
              >
                <span>Chat with me</span>
                <i className="fas fa-arrow-right contact__button-icon" />
              </a>
            </div>

            {/* Location Card */}
            <div className="contact__card">
              <i className="fas fa-map-marker-alt contact__card-icon" />
              <h3 className="contact__card-title">Location</h3>
              <span className="contact__card-data">{location}</span>
              <span className="contact__button" style={{ cursor: "default" }}>
                <span>Global Remote & Relocation</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact__content">
          <h3 className="contact__title">Write me your project</h3>

          {status === "success" && (
            <div className="contact__alert success">
              <i className="fas fa-check-circle" />
              <span>Thank you! Your message has been sent successfully. I will get back to you promptly.</span>
            </div>
          )}

          {status === "error" && (
            <div className="contact__alert error">
              <i className="fas fa-exclamation-circle" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact__form">
            <div className="contact__form-div">
              <label className="contact__form-tag">Names</label>
              <input
                type="text"
                required
                placeholder="Insert your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="contact__form-input"
              />
            </div>

            <div className="contact__form-div">
              <label className="contact__form-tag">Mail</label>
              <input
                type="email"
                required
                placeholder="Insert your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="contact__form-input"
              />
            </div>

            <div className="contact__form-div">
              <label className="contact__form-tag">Subject</label>
              <input
                type="text"
                required
                placeholder="Project / Role subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="contact__form-input"
              />
            </div>

            <div className="contact__form-div contact__form-area">
              <label className="contact__form-tag">Project</label>
              <textarea
                required
                rows={5}
                placeholder="Write your project or message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="contact__form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="button"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .contact__container {
          grid-template-columns: repeat(2, 1fr);
          column-gap: 4rem;
          align-items: start;
        }

        .contact__title {
          text-align: center;
          font-size: var(--h3-font-size, 1.25rem);
          margin-bottom: 1.8rem;
          color: var(--title-color, rgb(241, 241, 243));
        }

        .contact__info {
          display: grid;
          row-gap: 1.2rem;
        }

        .contact__card {
          background-color: var(--box-color, rgb(22, 22, 29));
          padding: 1.25rem;
          border-radius: 0.75rem;
          text-align: center;
          border: 1px solid var(--box-border);
          transition: all 0.3s ease;
        }

        .contact__card:hover {
          background-color: var(--box-color-hover, rgb(28, 28, 38));
          border-color: var(--box-border-hover);
          transform: translateY(-4px);
        }

        .contact__card-icon {
          font-size: 1.8rem;
          color: var(--skin-color, #3482ff);
          margin-bottom: 0.25rem;
          display: inline-block;
        }

        .contact__card-title {
          font-size: var(--small-font-size, 0.875rem);
          font-weight: var(--font-medium, 500);
          color: var(--title-color, rgb(241, 241, 243));
        }

        .contact__card-data {
          font-size: var(--smaller-font-size, 0.813rem);
          display: block;
          margin-bottom: 0.75rem;
          color: var(--text-color, rgb(214, 214, 220));
        }

        .contact__button {
          color: var(--skin-color, #3482ff);
          font-size: var(--small-font-size, 0.875rem);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          column-gap: 0.35rem;
          font-weight: 500;
        }

        .contact__button-icon {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .contact__button:hover .contact__button-icon {
          transform: translateX(4px);
        }

        .contact__form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact__form-div {
          position: relative;
          height: 3.5rem;
          margin-bottom: 0.5rem;
        }

        .contact__form-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: var(--text-color, rgb(214, 214, 220));
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          font-size: 0.95rem;
          z-index: 1;
          transition: border-color 0.3s ease;
        }

        .contact__form-input:focus {
          border-color: var(--skin-color, #3482ff);
          box-shadow: 0 0 10px rgba(52, 130, 255, 0.25);
        }

        .contact__form-tag {
          position: absolute;
          top: -0.75rem;
          left: 1rem;
          font-size: var(--smaller-font-size, 0.813rem);
          padding: 0.25rem 0.5rem;
          background-color: var(--body-color, rgb(10, 10, 15));
          color: var(--skin-color, #3482ff);
          font-weight: 500;
          z-index: 10;
          border-radius: 0.25rem;
        }

        .contact__form-area {
          height: 9rem;
        }

        .contact__form-area textarea {
          resize: none;
          padding-top: 1rem;
        }

        .contact__alert {
          padding: 1rem;
          border-radius: 0.5rem;
          font-size: 0.88rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }

        .contact__alert.success {
          background-color: rgba(16, 185, 129, 0.15);
          border: 1px solid #10b981;
          color: #34d399;
        }

        .contact__alert.error {
          background-color: rgba(239, 68, 68, 0.15);
          border: 1px solid #ef4444;
          color: #f87171;
        }

        @media screen and (max-width: 1024px) {
          .contact__container {
            grid-template-columns: 1fr;
            row-gap: 3rem;
          }
        }
      `}</style>
    </section>
  )
}
