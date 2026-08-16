"use client"

import React from "react"

export default function HowIBuild() {
  const pillars = [
    {
      step: "01",
      title: "Discover & Frame",
      subtitle: "Understand the real problem",
      description:
        "Deep-dive into domain requirements, user bottlenecks, and technical constraints before writing a single line of code. Define clear functional boundaries and data flow models.",
      icon: "fas fa-search",
      accent: "from-blue-600 to-cyan-500",
      points: ["Requirement modeling", "Data flow analysis", "Scope & feasibility"],
    },
    {
      step: "02",
      title: "Architect & Design",
      subtitle: "Scalable architecture & intuitive UX",
      description:
        "Design normalized database schemas, type-safe API contracts, and clean component hierarchies. Plan for high throughput, security, and effortless user interactions.",
      icon: "fas fa-drafting-compass",
      accent: "from-indigo-600 to-blue-600",
      points: ["Relational & vector schemas", "REST / GraphQL APIs", "Ergonomic UI interfaces"],
    },
    {
      step: "03",
      title: "Build & Automate",
      subtitle: "Robust, production-grade code",
      description:
        "Implement solutions using modern frameworks (Next.js, TypeScript, C#, Python) and integrate intelligent AI agent pipelines with low-latency streaming and error boundaries.",
      icon: "fas fa-code",
      accent: "from-blue-600 to-indigo-600",
      points: ["Type-safe development", "LLM API pipelines", "Automated unit & integration testing"],
    },
    {
      step: "04",
      title: "Ship & Scale",
      subtitle: "Continuous delivery & telemetry",
      description:
        "Deploy to resilient cloud infrastructure (AWS, Vercel, Supabase) with automated CI/CD workflows, real-time logging, security headers, and sub-second performance.",
      icon: "fas fa-rocket",
      accent: "from-cyan-600 to-blue-600",
      points: ["Automated CI/CD deployment", "Telemetry & performance", "Iterative enhancements"],
    },
  ]

  return (
    <section id="approach" className="section-wrapper bg-white border-b border-slate-200/80">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="section-label">
            <i className="fas fa-microchip text-blue-600 text-xs" />
            <span>Engineering Discipline</span>
          </div>
          <h2 className="section-headline">
            How I Build Systems
          </h2>
          <p className="section-subtext">
            A disciplined, four-phase engineering methodology focused on translating complex business and physical requirements into scalable, maintainable production software.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.step}
              className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-7 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Step & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-slate-300 font-mono group-hover:text-blue-600 transition-colors">
                    {pillar.step}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <i className={`${pillar.icon} text-base`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {pillar.title}
                </h3>
                <div className="text-xs font-semibold text-blue-600 mb-3.5">
                  {pillar.subtitle}
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="pt-4 border-t border-slate-200/70 space-y-1.5">
                {pillar.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-center gap-2 text-xs font-medium text-slate-500"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
