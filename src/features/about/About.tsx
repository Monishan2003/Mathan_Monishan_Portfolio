"use client"

import React from "react"

interface AboutProps {
  avatarUrl?: string
  roles?: string[]
  bioShort?: string
  bioLong?: string
  resumeUrl?: string
}

export default function About({
  avatarUrl = "/monishan.jpeg",
  resumeUrl = "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
}: AboutProps) {
  return (
    <section className="about section" id="about">
      <h2 className="section__title" data-heading="My Intro">
        About Me
      </h2>

      <div className="about__container container grid">
        {/* Left Column: Portrait Card */}
        <div className="about__img-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt="Mathan Monishan"
            className="about__img"
          />
        </div>

        {/* Right Column: Information & Metric Cards */}
        <div className="about__data">
          <h3 className="about__heading">
            AI & Full-Stack Engineer Specializing in Mechatronics
          </h3>

          <p className="about__description">
            I am a results-driven engineer pursuing a dual-degree path: <strong>BSc (Hons) in Science & Technology (Mechatronics)</strong> at Uva Wellassa University of Sri Lanka, alongside a <strong>Bachelor of Information Technology (BIT)</strong> at the University of Moratuwa.
          </p>

          <p className="about__description">
            As the <strong>Founder & Lead Engineer of Pynimox</strong>, I design multi-agent AI pipelines, streaming LLM applications, and scalable cloud architectures. At <strong>NF Group of Companies</strong>, I build production enterprise ERP and POS modules utilizing Next.js, C#, and ASP.NET Core.
          </p>

          {/* 3 Metric Info Boxes */}
          <div className="about__info grid">
            <div className="about__box">
              <i className="fas fa-medal about__icon" />
              <h3 className="about__title">Experience</h3>
              <span className="about__subtitle">01+ Years Commercial</span>
            </div>

            <div className="about__box">
              <i className="fas fa-layer-group about__icon" />
              <h3 className="about__title">Completed</h3>
              <span className="about__subtitle">06+ Production Apps</span>
            </div>

            <div className="about__box">
              <i className="fas fa-crown about__icon" />
              <h3 className="about__title">Venture</h3>
              <span className="about__subtitle">Founder @ Pynimox</span>
            </div>
          </div>

          <div className="about__btn-row">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              <i className="fas fa-download" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about__container {
          grid-template-columns: repeat(2, 1fr);
          column-gap: 4rem;
          align-items: center;
        }

        .about__img-wrapper {
          justify-self: center;
          position: relative;
        }

        .about__img {
          width: 380px;
          border-radius: 1.25rem;
          border: 2px solid var(--box-border);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          transition: transform 0.4s ease, border-color 0.4s ease;
        }

        .about__img:hover {
          transform: translateY(-5px);
          border-color: var(--skin-color, #3482ff);
        }

        .about__heading {
          font-size: var(--h3-font-size, 1.25rem);
          color: var(--title-color, rgb(241, 241, 243));
          margin-bottom: var(--mb-1, 1rem);
          line-height: 1.4;
        }

        .about__description {
          font-size: 0.96rem;
          line-height: 1.8;
          color: var(--text-color, rgb(214, 214, 220));
          margin-bottom: 1.2rem;
        }

        .about__info {
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 1.8rem 0 2rem;
        }

        .about__box {
          background-color: var(--box-color, rgb(22, 22, 29));
          border-radius: 0.75rem;
          padding: 1.2rem 0.85rem;
          text-align: center;
          border: 1px solid var(--box-border);
          transition: all 0.3s ease;
        }

        .about__box:hover {
          background-color: var(--box-color-hover, rgb(28, 28, 38));
          border-color: var(--box-border-hover);
          transform: translateY(-4px);
        }

        .about__icon {
          font-size: 1.5rem;
          color: var(--skin-color, #3482ff);
          margin-bottom: 0.5rem;
          display: block;
        }

        .about__title {
          font-size: var(--small-font-size, 0.875rem);
          font-weight: var(--font-medium, 500);
          color: var(--title-color, rgb(241, 241, 243));
          line-height: 1.3;
        }

        .about__subtitle {
          font-size: var(--smaller-font-size, 0.813rem);
          color: var(--text-muted, rgb(155, 155, 168));
          margin-top: 0.2rem;
          display: block;
        }

        .about__btn-row {
          margin-top: 1.5rem;
        }

        @media screen and (max-width: 1024px) {
          .about__container {
            grid-template-columns: 1fr;
            row-gap: 2.5rem;
          }

          .about__img {
            width: 300px;
          }
        }

        @media screen and (max-width: 600px) {
          .about__info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
