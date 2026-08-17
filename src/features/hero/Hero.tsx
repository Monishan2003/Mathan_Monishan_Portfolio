"use client"

import React from "react"
import Link from "next/link"

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
}

export default function Hero({
  greeting,
  name = "Mathan Monishan",
  headline = "Software Developer & Full-Stack / AI Engineer",
  description = "I build intelligent software systems today and engineer intelligent physical systems for tomorrow. Founder & Lead Engineer at Pynimox.",
  heroIntro,
  avatarUrl = "/monishan.jpeg",
  resumeUrl = "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
  socialLinks,
  cards,
  imagePosition = "top center",
  imageScale = 1.0,
  imageBorderRadius,
}: HeroProps) {
  const defaultSocials = [
    { platform: "github", url: "https://github.com/Monishan2003", icon: "fab fa-github" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/mathan-monishan2003", icon: "fab fa-linkedin-in" },
    { platform: "twitter", url: "https://x.com/Monishan2003", icon: "fab fa-twitter" },
    { platform: "whatsapp", url: "https://wa.me/94767634359", icon: "fab fa-whatsapp" },
  ]

  const defaultCards: HeroCardItem[] = [
    { icon: "fas fa-crown", title: "Founder", subtitle: "Pynimox AI Studio" },
    { icon: "fas fa-laptop-code", title: "Specialization", subtitle: "AI, Next.js & .NET" },
    { icon: "fas fa-graduation-cap", title: "Dual Degree", subtitle: "Mechatronics & IT" },
  ]

  const links = socialLinks && socialLinks.length > 0 ? socialLinks : defaultSocials
  const heroCards = cards && cards.length > 0 ? cards : defaultCards
  const topGreeting = greeting || heroIntro || "Hello, my name is"
  const bioDescription = description || (heroIntro && heroIntro !== topGreeting ? heroIntro : "I build intelligent software systems today and engineer intelligent physical systems for tomorrow. Founder & Lead Engineer at Pynimox.")

  return (
    <section className="home" id="home">
      <div className="home__container container grid">
        {/* Top Social Follow Bar */}
        <div className="home__social">
          <span className="home__social-follow">{name}</span>
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

        {/* Hero Vignette Blended Profile Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl || "/monishan.jpeg"}
          alt={name}
          className="home__img"
          style={{
            objectPosition: imagePosition,
            transform: `scale(${imageScale})`,
            borderRadius: imageBorderRadius || undefined,
          }}
        />

        {/* Hero Text Information */}
        <div className="home__data">
          <span className="home__greeting">{topGreeting}</span>
          <h1 className="home__title">{name}</h1>
          <h3 className="home__subtitle">{headline}</h3>
          <p className="home__description">{bioDescription}</p>

          <div className="home__buttons">
            <Link href="#contact" className="button">
              <i className="fas fa-paper-plane" />
              <span>Contact Me</span>
            </Link>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline"
            >
              <i className="fas fa-download" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="my__info">
          {heroCards.map((c, i) => (
            <div key={i} className="info__item">
              <i className={`${c.icon} info__icon`} />
              <div>
                <h3 className="info__title">{c.title}</h3>
                <span className="info__subtitle">{c.subtitle}</span>
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
          padding: 80px 0;
        }

        .home__container {
          position: relative;
          height: 100%;
          min-height: 80vh;
          align-items: center;
          display: flex;
          width: 100%;
        }

        .home__social {
          position: absolute;
          top: 1.8rem;
          left: 0;
          display: flex;
          align-items: center;
          column-gap: 3.5rem;
          z-index: 10;
          animation: fadeInLeft 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }

        .home__social-follow {
          font-weight: var(--font-medium, 500);
          position: relative;
          color: var(--title-color, rgb(241, 241, 243));
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }

        .home__social-follow::after {
          content: "";
          position: absolute;
          width: 1.5rem;
          height: 2px;
          background-color: var(--skin-color, #3482ff);
          right: -2rem;
          top: 50%;
          transform: translateY(-50%);
        }

        .home__social-links {
          display: inline-flex;
          column-gap: 1.2rem;
        }

        .home__social-link {
          font-size: 1.15rem;
          color: var(--text-color, rgb(214, 214, 220));
          transition: all 0.3s ease;
        }

        .home__social-link:hover {
          color: var(--skin-color, #3482ff);
          transform: translateY(-3px);
        }

        /* Desktop Edge-blended Mask Vignette */
        .home__img {
          display: block;
          position: absolute;
          right: -2rem;
          bottom: 0;
          height: 94%;
          width: auto;
          max-width: 52%;
          object-fit: cover;
          object-position: top center;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 32%,
            black 78%,
            transparent 100%
          ),
          linear-gradient(
            to top,
            transparent 0%,
            black 16%
          );
          -webkit-mask-composite: source-in;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 32%,
            black 78%,
            transparent 100%
          ),
          linear-gradient(
            to top,
            transparent 0%,
            black 16%
          );
          mask-composite: intersect;
          opacity: 0.92;
          pointer-events: none;
          z-index: 1;
          animation: heroFloat 6s ease-in-out infinite, photoPulse 4s ease-in-out infinite;
        }

        .home__data {
          max-width: 580px;
          z-index: 5;
          position: relative;
        }

        .home__greeting {
          display: block;
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--skin-color, #3482ff);
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
          animation: fadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }

        .home__title {
          font-size: var(--biggest-font-size, 3rem);
          font-weight: 700;
          color: var(--title-color, rgb(241, 241, 243));
          line-height: 1.15;
          margin-bottom: 0.5rem;
          animation: fadeInLeft 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }

        .home__subtitle {
          font-size: var(--h3-font-size, 1.25rem);
          font-weight: var(--font-medium, 500);
          color: var(--skin-color, #3482ff);
          margin-bottom: 1.2rem;
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both;
        }

        .home__description {
          font-size: 1.02rem;
          line-height: 1.8;
          color: var(--text-color, rgb(214, 214, 220));
          margin-bottom: 2rem;
          max-width: 500px;
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both;
        }

        .home__buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.85s both;
        }

        .my__info {
          display: flex;
          column-gap: 2.2rem;
          position: absolute;
          left: 0;
          bottom: 1.5rem;
          z-index: 10;
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1s both;
        }

        .info__item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .info__icon {
          font-size: 1.6rem;
          color: var(--skin-color, #3482ff);
        }

        .info__title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--title-color, rgb(241, 241, 243));
          line-height: 1.2;
        }

        .info__subtitle {
          font-size: 0.82rem;
          color: var(--text-muted, rgb(155, 155, 168));
        }

        @media screen and (max-width: 1024px) {
          .home {
            min-height: auto;
            padding: 100px 0 60px;
          }

          .home__container {
            flex-direction: column;
            align-items: flex-start;
            min-height: auto;
          }

          .home__social {
            position: static;
            margin-bottom: 2rem;
          }

          .home__img {
            position: relative;
            right: auto;
            bottom: auto;
            height: auto;
            width: 280px;
            max-width: 80%;
            margin: 1.5rem 0 2rem;
            border-radius: 20px;
            -webkit-mask-image: none;
            mask-image: none;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            border: 1px solid var(--box-border);
          }

          .my__info {
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
