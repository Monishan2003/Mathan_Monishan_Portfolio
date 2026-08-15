"use client"

import React from "react"
import TypingEffect from "@/components/TypingEffect"

interface HeroProps {
  intro?: string
  name?: string
  roles?: string[]
}

export default function Hero({
  intro = "Hello, my name is",
  name = "Mathan Monishan",
  roles = [
    "Full Stack Developer",
    "Mobile App Developer",
    "Coder",
    "UI/UX Designer",
    "Project Management Enthusiast",
    "Freelancer",
  ],
}: HeroProps) {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById("contact")
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      id="home"
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "120px 0 80px",
      }}
    >
      {/* Background Image & Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1454117096348-e4abbeba002c?q=80&w=1170&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 249, 250, 0.88) 50%, rgba(255, 255, 255, 0.85) 100%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "850px", animation: "fadeInUp 1s ease-out" }}>
          <div
            style={{
              fontSize: "26px",
              marginBottom: "12px",
              color: "var(--primary-color)",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
            className="hero-text-1"
          >
            {intro}
          </div>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              marginBottom: "12px",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #1b0072 0%, #2b3fa7 50%, #14b1ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-1px",
              fontFamily: "var(--font-heading)",
            }}
            className="hero-text-2"
          >
            {name}
          </h1>
          <div
            style={{
              fontSize: "36px",
              margin: "8px 0 35px",
              fontWeight: 500,
              color: "var(--text-dark)",
            }}
            className="hero-text-3"
          >
            And I&apos;m a{" "}
            <span style={{ color: "var(--primary-color)", fontWeight: 600 }}>
              <TypingEffect strings={roles} typeSpeed={90} backSpeed={50} loop={true} />
            </span>
          </div>
          <div>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="btn"
              style={{
                boxShadow: "0 6px 20px rgba(43, 63, 167, 0.35)",
              }}
            >
              <i className="fas fa-paper-plane"></i> Hire Me
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          :global(.hero-text-2) {
            font-size: 60px !important;
          }
          :global(.hero-text-3) {
            font-size: 30px !important;
          }
        }
        @media (max-width: 768px) {
          :global(.hero-text-1) {
            font-size: 20px !important;
          }
          :global(.hero-text-2) {
            font-size: 44px !important;
          }
          :global(.hero-text-3) {
            font-size: 24px !important;
          }
        }
        @media (max-width: 480px) {
          :global(.hero-text-2) {
            font-size: 36px !important;
          }
          :global(.hero-text-3) {
            font-size: 20px !important;
          }
        }
      `}</style>
    </section>
  )
}
