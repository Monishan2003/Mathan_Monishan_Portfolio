"use client"

import React from "react"

interface AboutProps {
  avatarUrl?: string
  roles?: string[]
  bioShort?: string
  bioLong?: string
  resumeUrl?: string
  imagePosition?: string
  imageScale?: number
  imageBorderRadius?: string
}

export default function About({
  avatarUrl = "/about_me.jpg",
  bioShort,
  bioLong,
  resumeUrl = "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
  imagePosition = "top center",
  imageScale = 1.0,
  imageBorderRadius = "1.5rem",
}: AboutProps) {
  return (
    <section className="about section" id="about">
      <h2 className="section__title" data-heading="My Intro">
        About Me
      </h2>

      <div className="about__container container grid">
        {/* Left Column: Enlarged Portrait Frame */}
        <div className="about__img-wrapper">
          <div className="about__img-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl || "/about_me.jpg"}
              alt="Mathan Monishan"
              className="about__img"
              style={{
                objectPosition: imagePosition,
                transform: `scale(${imageScale})`,
                borderRadius: imageBorderRadius,
              }}
            />
          </div>
        </div>

        {/* Right Column: Information & Metric Cards */}
        <div className="about__data">
          <h3 className="about__heading">
            AI & Full-Stack Engineer Specializing in Mechatronics
          </h3>

          <p className="about__description">
            {bioShort || (
              <>
                I am a results-driven engineer pursuing a dual-degree path: <strong>BSc (Hons) in Science & Technology (Mechatronics)</strong> at Uva Wellassa University of Sri Lanka, alongside a <strong>Bachelor of Information Technology (BIT)</strong> at the University of Moratuwa.
              </>
            )}
          </p>

          <p className="about__description">
            {bioLong || (
              <>
                As the <strong>Founder & Lead Engineer of Pynimox</strong>, I design multi-agent AI pipelines, streaming LLM applications, and scalable cloud architectures. At <strong>NF Group of Companies</strong>, I build production enterprise ERP and POS modules utilizing Next.js, C#, and ASP.NET Core.
              </>
            )}
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
          grid-template-columns: 440px 1fr;
          column-gap: 3.5rem;
          align-items: center;
        }

        .about__img-wrapper {
          justify-self: center;
          position: relative;
          width: 100%;
          max-width: 440px;
        }

        .about__img-box {
          position: relative;
          width: 100%;
          height: 520px;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 2px solid var(--box-border);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
          background-color: var(--box-color, rgb(22, 22, 29));
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .about__img-box:hover {
          transform: translateY(-6px);
          border-color: var(--skin-color, #3482ff);
          box-shadow: 0 25px 50px rgba(52, 130, 255, 0.25);
        }

        .about__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .about__img-box:hover .about__img {
          transform: scale(1.03);
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

        @media screen and (max-width: 1100px) {
          .about__container {
            grid-template-columns: 1fr;
            row-gap: 2.5rem;
          }

          .about__img-wrapper {
            max-width: 360px;
          }

          .about__img-box {
            height: 440px;
          }
        }

        @media screen and (max-width: 600px) {
          .about__info {
            grid-template-columns: 1fr;
          }

          .about__img-wrapper {
            max-width: 100%;
          }

          .about__img-box {
            height: 380px;
          }
        }
      `}</style>
    </section>
  )
}
