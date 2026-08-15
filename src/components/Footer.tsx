"use client"

import React from "react"

interface SocialLink {
  platform: string
  label?: string | null
  url: string
  icon?: string | null
}

interface FooterProps {
  fullName?: string
  bioNote?: string
  location?: string
  email?: string
  phone?: string
  whatsappNumber?: string
  socialLinks?: SocialLink[]
}

export default function Footer({
  fullName = "Mathan Monishan",
  bioNote = "A passionate IT student and web developer focused on creating meaningful digital experiences through innovative solutions.",
  location = "Thalaimannar, Mannar, Sri Lanka",
  email = "mathanmonishan@gmail.com",
  phone = "+94 76 763 4359",
  whatsappNumber = "94767634359",
  socialLinks = [],
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  const defaultSocials: SocialLink[] = [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/mathan-monishan2003",
      icon: "fab fa-linkedin-in",
    },
    {
      platform: "github",
      url: "https://github.com/Monishan2003",
      icon: "fab fa-github",
    },
    {
      platform: "x",
      url: "https://x.com/Monishan2003",
      icon: "fab fa-twitter",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/monishan_2003",
      icon: "fab fa-instagram",
    },
    {
      platform: "whatsapp",
      url: `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`,
      icon: "fab fa-whatsapp",
    },
  ]

  const linksToRender = socialLinks.length > 0 ? socialLinks : defaultSocials

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
    }
  }

  const quickLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #090642 0%, #1b0072 100%)",
        color: "#ffffff",
        padding: "70px 0 25px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "40px",
            marginBottom: "50px",
          }}
        >
          {/* Column 1: Info & Socials */}
          <div>
            <h3
              style={{
                fontSize: "24px",
                color: "#ffffff",
                marginBottom: "16px",
                fontFamily: "var(--font-heading)",
              }}
            >
              {fullName}
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.75)",
                fontSize: "15px",
                lineHeight: "1.7",
                marginBottom: "24px",
              }}
            >
              {bioNote}
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {linksToRender.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label || s.platform}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent-color)"
                    e.currentTarget.style.transform = "translateY(-3px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  <i className={s.icon || "fas fa-link"}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              style={{
                fontSize: "20px",
                color: "#ffffff",
                marginBottom: "16px",
                fontFamily: "var(--font-heading)",
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {quickLinks.map((item) => (
                <li key={item.id} style={{ marginBottom: "10px" }}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontSize: "15px",
                      transition: "color 0.3s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-color)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)"
                    }}
                  >
                    <i
                      className="fas fa-chevron-right"
                      style={{ fontSize: "11px", color: "var(--accent-color)" }}
                    ></i>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3
              style={{
                fontSize: "20px",
                color: "#ffffff",
                marginBottom: "16px",
                fontFamily: "var(--font-heading)",
              }}
            >
              Contact Info
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "14px",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontSize: "15px",
                }}
              >
                <i
                  className="fas fa-map-marker-alt"
                  style={{ color: "var(--accent-color)", marginTop: "4px" }}
                ></i>
                <span>{location}</span>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "14px",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontSize: "15px",
                }}
              >
                <i
                  className="fas fa-envelope"
                  style={{ color: "var(--accent-color)", marginTop: "4px" }}
                ></i>
                <a
                  href={`mailto:${email}`}
                  style={{ color: "inherit", wordBreak: "break-all" }}
                >
                  {email}
                </a>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "14px",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontSize: "15px",
                }}
              >
                <i
                  className="fab fa-whatsapp"
                  style={{ color: "#25d366", marginTop: "4px", fontSize: "17px" }}
                ></i>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}
                >
                  {phone} (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "25px",
            textAlign: "center",
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <span>
            Created By{" "}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              style={{ color: "var(--accent-color)", fontWeight: 600 }}
            >
              {fullName}
            </a>{" "}
            | © {currentYear} All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
