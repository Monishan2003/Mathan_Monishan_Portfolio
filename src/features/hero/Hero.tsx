"use client"

import React from "react"

export interface HeroCardItem {
  icon: string
  title: string
  subtitle: string
}

interface SocialLinkItem {
  id?: string
  platform: string
  url: string
  icon?: string
}

interface HeroProps {
  greeting?: string
  name?: string
  headline?: string
  description?: string
  heroIntro?: string
  roles?: string[]
  avatarUrl?: string
  resumeUrl?: string
  socialLinks?: SocialLinkItem[]
  cards?: HeroCardItem[]
  imagePosition?: string
  imageScale?: number
  imageBorderRadius?: string
  email?: string
  phone?: string
  whatsappNumber?: string
  location?: string
}

export default function Hero({
  name = "Mathan Monishan",
  headline = "AI & Full-Stack Engineer | Mechatronics Engineer",
  description = "I build intelligent software systems today and engineer intelligent physical systems for tomorrow. Combining software engineering rigor with mechatronics and AI innovation.",
  avatarUrl = "/monishan.jpeg",
  socialLinks,
  cards,
  imagePosition = "top center",
  imageScale = 1.0,
  email = "mathanmonishan@gmail.com",
  phone = "+94 76 763 4359",
  location = "Mannar, Sri Lanka",
}: HeroProps) {
  const defaultSocials = [
    { platform: "facebook", url: "https://facebook.com", icon: "fab fa-facebook-f" },
    { platform: "instagram", url: "https://instagram.com", icon: "fab fa-instagram" },
    { platform: "github", url: "https://github.com/Monishan2003", icon: "fab fa-github" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/mathan-monishan2003", icon: "fab fa-linkedin-in" },
  ]

  const defaultBottomInfo: HeroCardItem[] = [
    { icon: "fab fa-facebook-messenger", title: "Location", subtitle: location || "Mannar, Sri Lanka" },
    { icon: "fab fa-whatsapp", title: "WhatsApp", subtitle: phone || "+94 76 763 4359" },
    { icon: "far fa-envelope", title: "Email", subtitle: email || "mathanmonishan@gmail.com" },
  ]

  const links = socialLinks && socialLinks.length > 0 ? socialLinks : defaultSocials
  const bottomCards = cards && cards.length > 0 ? cards : defaultBottomInfo

  return (
    <section className="home" id="home">
      <div className="home__container container">
        {/* 1. Top Social Follow Bar */}
        <div className="home__social">
          <span className="home__social-name">{name}</span>
          <span className="home__social-dash">—</span>
          <div className="home__social-links">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="home__social-link"
                aria-label={link.platform}
              >
                <i className={link.icon || "fas fa-link"} />
              </a>
            ))}
          </div>
        </div>

        {/* 2. Hero Vignette Blended Profile Image */}
        <div className="home__img-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl || "/monishan.jpeg"}
            alt={name}
            className="home__img"
            style={{
              objectPosition: imagePosition,
              transform: `scale(${imageScale})`,
            }}
          />
        </div>

        {/* 3. Hero Main Content */}
        <div className="home__data">
          <h1 className="home__title">{name}</h1>
          <h3 className="home__subtitle">{headline}</h3>
          <p className="home__description">{description}</p>

          <div className="home__actions">
            <a href="#about" className="home__btn-primary">
              <i className="far fa-user" />
              <span>About Me..</span>
            </a>
          </div>
        </div>

        {/* 4. Bottom Contact / Feature Info Bar */}
        <div className="home__info-bar">
          {bottomCards.map((c, i) => (
            <div key={i} className="info__item">
              <div className="info__icon-wrap">
                <i className={c.icon} />
              </div>
              <div className="info__text-wrap">
                <span className="info__label">{c.title}</span>
                <span className="info__val">{c.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .home {
          background-color: var(--body-color, rgb(10, 10, 15));
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 0;
        }

        .home__container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 5rem;
          padding-bottom: 6rem;
        }

        /* Top Social Header */
        .home__social {
          position: absolute;
          top: 2.8rem;
          left: 0;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          z-index: 15;
          animation: fadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }

        .home__social-name {
          font-weight: 600;
          color: var(--title-color, #ffffff);
          font-size: 0.95rem;
          letter-spacing: 0.4px;
        }

        .home__social-dash {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 300;
          font-size: 0.9rem;
        }

        .home__social-links {
          display: inline-flex;
          align-items: center;
          gap: 1.15rem;
        }

        .home__social-link {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .home__social-link:hover {
          color: var(--skin-color, #3482ff);
          transform: translateY(-2px);
        }

        /* Hero Image - Perfectly Blended with Dark Canvas */
        .home__img-wrapper {
          position: absolute;
          right: 0;
          bottom: 0;
          top: 0;
          width: 54%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          pointer-events: none;
          z-index: 2;
        }

        .home__img {
          height: 92%;
          width: auto;
          max-width: 100%;
          object-fit: cover;
          object-position: top center;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.8) 22%,
            black 50%,
            black 90%,
            transparent 100%
          ),
          linear-gradient(
            to top,
            transparent 0%,
            black 15%
          );
          -webkit-mask-composite: source-in;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.8) 22%,
            black 50%,
            black 90%,
            transparent 100%
          ),
          linear-gradient(
            to top,
            transparent 0%,
            black 15%
          );
          mask-composite: intersect;
          opacity: 0.95;
        }

        /* Main Left Text Content */
        .home__data {
          max-width: 580px;
          z-index: 10;
          position: relative;
          margin-top: 1rem;
        }

        .home__title {
          font-size: 3.6rem;
          font-weight: 700;
          color: var(--title-color, #ffffff);
          line-height: 1.15;
          margin-bottom: 0.75rem;
          letter-spacing: -0.5px;
          font-family: var(--font-heading, 'Poppins', sans-serif);
          animation: fadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }

        .home__subtitle {
          font-size: 1.25rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.35rem;
          letter-spacing: 0.2px;
          animation: fadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
        }

        .home__description {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-muted, #94a3b8);
          margin-bottom: 2.2rem;
          max-width: 480px;
          animation: fadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
        }

        /* Primary Action Button (Matches "About Me.." in Reference) */
        .home__actions {
          display: flex;
          align-items: center;
          animation: fadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both;
        }

        .home__btn-primary {
          background-color: var(--skin-color, #3482ff);
          color: #ffffff;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(52, 130, 255, 0.35);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .home__btn-primary:hover {
          background-color: #226de8;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(52, 130, 255, 0.5);
        }

        /* Bottom Feature / Contact Info Bar */
        .home__info-bar {
          display: flex;
          align-items: center;
          gap: 3.5rem;
          position: absolute;
          left: 0;
          bottom: 2.4rem;
          z-index: 10;
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
        }

        .info__item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .info__icon-wrap {
          font-size: 1.45rem;
          color: var(--skin-color, #3482ff);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info__text-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .info__label {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-muted, #94a3b8);
          letter-spacing: 0.2px;
        }

        .info__val {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--title-color, #ffffff);
          letter-spacing: 0.2px;
        }

        @media screen and (max-width: 1024px) {
          .home {
            min-height: auto;
            padding: 100px 0 60px;
          }

          .home__container {
            min-height: auto;
            padding-top: 1rem;
            padding-bottom: 2rem;
          }

          .home__social {
            position: static;
            margin-bottom: 2rem;
          }

          .home__img-wrapper {
            position: relative;
            width: 100%;
            height: auto;
            margin: 1.5rem 0 2.5rem;
            justify-content: flex-start;
          }

          .home__img {
            height: 320px;
            width: auto;
            border-radius: 16px;
            -webkit-mask-image: none;
            mask-image: none;
            border: 1px solid var(--box-border);
          }

          .home__title {
            font-size: 2.5rem;
          }

          .home__subtitle {
            font-size: 1.1rem;
          }

          .home__info-bar {
            position: static;
            flex-wrap: wrap;
            gap: 1.5rem;
            margin-top: 3rem;
          }
        }
      `}</style>
    </section>
  )
}
