"use client"

import React, { useState } from "react"
import TypingEffect from "@/components/TypingEffect"

interface AboutProps {
  avatarUrl?: string | null
  roles?: string[]
  bioShort?: string | null
  bioLong?: string | null
  resumeUrl?: string | null
}

export default function About({
  avatarUrl = "/monishan.jpeg",
  roles = [
    "Full Stack Developer",
    "Mobile App Developer",
    "Coder",
    "UI/UX Designer",
    "Project Management Enthusiast",
    "Freelancer",
  ],
  bioShort = "Hello! I'm Monishan, an undergraduate Science and Technology student at Uva Wellassa University and a driven Information Technology student at the University of Moratuwa, with strong skills in frontend development, Python programming, and project management.",
  bioLong = "I started my journey with HTML, CSS, and JavaScript, and have continued to deepen my expertise in building responsive, user-friendly web interfaces. With hands-on experience in managing projects and collaborating in team environments, I'm passionate about creating solutions that make a difference.\n\nI'm currently seeking an internship opportunity where I can apply and grow my skills while contributing to impactful and innovative projects.",
  resumeUrl = "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
}: AboutProps) {
  const [imgSrc, setImgSrc] = useState(avatarUrl || "/monishan.jpeg")

  const paragraphs = bioLong
    ? bioLong.split("\n\n")
    : [
        bioShort || "",
        "I started my journey with HTML, CSS, and JavaScript, and have continued to deepen my expertise in building responsive, user-friendly web interfaces. With hands-on experience in managing projects and collaborating in team environments, I'm passionate about creating solutions that make a difference.",
        "I'm currently seeking an internship opportunity where I can apply and grow my skills while contributing to impactful and innovative projects.",
      ]

  return (
    <section id="about" style={{ background: "transparent" }}>
      <div className="container">
        <h2 className="section-title">
          About Me
          <span className="section-subtitle">Who I Am</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "50px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left Column: Full Image Display */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "100%",
                maxWidth: "360px",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(43, 63, 167, 0.22)",
                border: "4px solid #ffffff",
                background: "linear-gradient(135deg, #1b0072 0%, #2b3fa7 100%)",
                position: "relative",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              className="about-image-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt="Mathan Monishan"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "460px",
                  objectFit: "contain",
                  display: "block",
                  transition: "transform 0.4s ease",
                  backgroundColor: "#ffffff",
                }}
                onError={() => {
                  setImgSrc(
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%232b3fa7' opacity='0.1' rx='20'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%2314b1ff' opacity='0.2'/%3E%3Crect x='120' y='250' width='160' height='20' rx='10' fill='%231b0072' opacity='0.3'/%3E%3Crect x='140' y='280' width='120' height='15' rx='7' fill='%231b0072' opacity='0.3'/%3E%3C/svg%3E"
                  )
                }}
              />
            </div>
          </div>

          {/* Right Column: Bio */}
          <div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "var(--text-dark)",
                marginBottom: "18px",
              }}
            >
              I&apos;m Monishan and I&apos;m a{" "}
              <span style={{ color: "var(--primary-color)" }}>
                <TypingEffect strings={roles} typeSpeed={90} backSpeed={50} loop={true} />
              </span>
            </div>

            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#4a5568",
                  marginBottom: "16px",
                }}
              >
                {p}
              </p>
            ))}

            {resumeUrl && (
              <div style={{ marginTop: "24px" }}>
                <a
                  href={resumeUrl}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    borderWidth: "2px",
                    fontWeight: 600,
                  }}
                >
                  <i className="fas fa-file-download"></i> Download CV
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-image-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(43, 63, 167, 0.3) !important;
        }

        @media (max-width: 900px) {
          :global(.about-grid) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
