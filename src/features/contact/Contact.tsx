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
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus({ type: null, msg: "" })

    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          msg: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus({
          type: "error",
          msg: data.error || "Failed to send message. Please try emailing me directly.",
        })
      }
    } catch {
      setStatus({
        type: "error",
        msg: "An unexpected error occurred. Please reach out via WhatsApp or email.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-wrapper bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="section-label">
            <i className="fas fa-paper-plane text-blue-600 text-xs" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
            Let&apos;s build something meaningful.
          </h2>
          <p className="section-subtext">
            Whether you have an engineering role, an ambitious software project, or an AI automation challenge, I am always open to exploring high-impact collaborations.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-7 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Direct Channels
              </h3>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 text-sm">
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Email
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 text-sm">
                  <i className="fab fa-whatsapp text-base" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    WhatsApp & Phone
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0 text-sm">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Location
                  </div>
                  <div className="text-base font-medium text-slate-800">
                    {location}
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-slate-200/70">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hello%20Monishan!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20collaborate.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 rounded-xl shadow-xs hover:shadow-md transition-all"
                >
                  <i className="fab fa-whatsapp text-lg" />
                  <span>Start Instant Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Fast Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-8 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Send a Direct Message
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Fill out the form below, and I will respond to your inquiry within 24 hours.
              </p>

              {status.type && (
                <div
                  className={`p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-2.5 ${
                    status.type === "success"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  <i
                    className={`fas ${
                      status.type === "success" ? "fa-check-circle" : "fa-exclamation-triangle"
                    }`}
                  />
                  <span>{status.msg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Subject / Project Nature
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Engineering Role / AI Automation Inquiry"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, team requirements, or objectives..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-3.5 text-sm"
                >
                  {submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane text-xs" />
                      <span>Send Inquiry Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
