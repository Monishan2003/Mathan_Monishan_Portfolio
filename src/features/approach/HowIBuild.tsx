"use client"

import React, { useState } from "react"

export default function HowIBuild() {
  const [activeModal, setActiveModal] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      step: "01",
      icon: "fas fa-brain",
      title: "AI Integration & Multi-Agent Pipelines",
      subtitle: "Autonomous Agents & LLMs",
      description:
        "Architecting production-ready LLM agents, real-time response streaming, RAG vector retrieval, and custom business automation tools.",
      deliverables: [
        "Multi-agent LLM workflow orchestrations",
        "Low-latency streaming AI chat systems",
        "RAG pipelines with pgvector & Supabase",
        "Custom enterprise prompt engineering & fine-tuning",
      ],
    },
    {
      id: 2,
      step: "02",
      icon: "fas fa-laptop-code",
      title: "Full-Stack Web & SaaS Engineering",
      subtitle: "Modern React & Next.js 15",
      description:
        "Building fast, reactive, and responsive digital platforms using Next.js, TypeScript, Tailwind CSS, PostgreSQL, and serverless backends.",
      deliverables: [
        "Production Next.js 15 App Router web applications",
        "Type-safe RESTful & GraphQL cloud API contracts",
        "Stripe payment gateways & automated webhooks",
        "Microservices architecture on AWS & Vercel",
      ],
    },
    {
      id: 3,
      step: "03",
      icon: "fas fa-cube",
      title: "Enterprise Systems & .NET Solutions",
      subtitle: "C# & SQL Server Infrastructure",
      description:
        "Developing scalable backend systems, ERP modules, POS infrastructures, and transactional database schemas.",
      deliverables: [
        "ASP.NET Core REST API microservices",
        "Normalized relational schemas in SQL Server & PostgreSQL",
        "Role-based multi-tier authorization & access controls",
        "Robust enterprise software design patterns",
      ],
    },
    {
      id: 4,
      step: "04",
      icon: "fas fa-microchip",
      title: "Mechatronics & Physical Computing",
      subtitle: "Robotics, Sensors & Control",
      description:
        "Bridging physical mechanics with software intelligence through microcontroller programming, sensor interfacing, and control loops.",
      deliverables: [
        "Embedded programming with Arduino, STM32 & C/C++",
        "Real-time sensor data acquisition & telemetry",
        "Control systems modeling with MATLAB / Simulink",
        "Robotics automation & motor drive circuits",
      ],
    },
  ]

  return (
    <section className="services section" id="services">
      <h2 className="section__title" data-heading="Engineering Discipline">
        Services & Approach
      </h2>

      <div className="services__container container grid">
        {services.map((service) => (
          <div key={service.id} className="services__content">
            <div className="services__top">
              <span className="services__step">{service.step}</span>
              <i className={`${service.icon} services__icon`} />
            </div>

            <h3 className="services__title">{service.title}</h3>
            <p className="services__desc">{service.description}</p>

            <span
              className="services__button"
              onClick={() => setActiveModal(service.id)}
            >
              <span>View Details</span>
              <i className="fas fa-arrow-right services__button-icon" />
            </span>
          </div>
        ))}
      </div>

      {/* Services Detail Modal Popup */}
      {activeModal !== null && (
        <div
          className="services__modal active-modal"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="services__modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <i
              className="fas fa-times services__modal-close"
              onClick={() => setActiveModal(null)}
            />

            {(() => {
              const current = services.find((s) => s.id === activeModal)
              if (!current) return null
              return (
                <>
                  <div className="modal-icon-badge">
                    <i className={current.icon} />
                  </div>
                  <h3 className="services__modal-title">{current.title}</h3>
                  <p className="services__modal-description">
                    {current.description}
                  </p>

                  <ul className="services__modal-services grid">
                    {current.deliverables.map((item, idx) => (
                      <li key={idx} className="services__modal-service">
                        <i className="fas fa-check-circle services__modal-icon" />
                        <p className="services__modal-info">{item}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )
            })()}
          </div>
        </div>
      )}

      <style jsx>{`
        .services__container {
          grid-template-columns: repeat(4, 1fr);
          gap: 1.8rem;
        }

        .services__content {
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          border-radius: 1.25rem;
          padding: 2.2rem 1.6rem;
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .services__content:hover {
          background-color: var(--box-color-hover, rgb(28, 28, 38));
          border-color: var(--skin-color, #3482ff);
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        .services__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .services__step {
          font-size: 1.6rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.15);
          font-family: monospace;
        }

        .services__icon {
          font-size: 1.8rem;
          color: var(--skin-color, #3482ff);
        }

        .services__title {
          font-size: 1.15rem;
          color: var(--title-color, rgb(241, 241, 243));
          margin-bottom: 0.75rem;
          line-height: 1.35;
        }

        .services__desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-color, rgb(214, 214, 220));
          margin-bottom: 1.5rem;
        }

        .services__button {
          color: var(--skin-color, #3482ff);
          font-size: var(--small-font-size, 0.875rem);
          display: inline-flex;
          align-items: center;
          column-gap: 0.4rem;
          cursor: pointer;
          font-weight: 600;
          margin-top: auto;
        }

        .services__button-icon {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .services__button:hover .services__button-icon {
          transform: translateX(5px);
        }

        /* Modal Styles */
        .services__modal {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: var(--z-modal, 10000);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
        }

        .services__modal-content {
          position: relative;
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          padding: 3rem 2.5rem 2.5rem;
          border-radius: 1.25rem;
          max-width: 550px;
          width: 100%;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          animation: scaleIn 0.3s ease forwards;
        }

        .modal-icon-badge {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(52, 130, 255, 0.15);
          color: var(--skin-color, #3482ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 1.2rem;
        }

        .services__modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-size: 1.4rem;
          color: var(--skin-color, #3482ff);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .services__modal-close:hover {
          transform: scale(1.2);
        }

        .services__modal-title {
          font-size: 1.35rem;
          color: var(--title-color, rgb(241, 241, 243));
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .services__modal-description {
          font-size: 0.92rem;
          color: var(--text-color, rgb(214, 214, 220));
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .services__modal-services {
          gap: 0.85rem;
        }

        .services__modal-service {
          display: flex;
          align-items: flex-start;
          column-gap: 0.75rem;
        }

        .services__modal-icon {
          color: var(--skin-color, #3482ff);
          font-size: 1rem;
          margin-top: 0.2rem;
        }

        .services__modal-info {
          font-size: 0.88rem;
          color: var(--text-color, rgb(214, 214, 220));
          line-height: 1.5;
        }

        @media screen and (max-width: 1024px) {
          .services__container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media screen and (max-width: 600px) {
          .services__container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
