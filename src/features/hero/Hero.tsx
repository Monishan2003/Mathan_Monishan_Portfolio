"use client"

import React from "react"
import TypingEffect from "@/components/TypingEffect"

interface HeroProps {
  name?: string
  roles?: string[]
  resumeUrl?: string
}

export default function Hero({
  name = "Mathan Monishan",
  roles = [
    "AI & Full-Stack Engineer",
    "Founder of Pynimox",
    "Mechatronics Engineer",
    "Automation & Robotics Builder",
    "Next.js & C# Developer",
  ],
  resumeUrl = "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Positioning */}
          <div className="lg:col-span-7 flex flex-col items-start animate-fadeInUp">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-[12.5px] font-medium mb-6 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Open to engineering internships, graduate roles & collaborations</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.08] mb-3">
              {name}
            </h1>

            {/* Sub-headline & Typewriter */}
            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800 mb-5 flex flex-wrap items-center gap-2">
              <span>AI & Full-Stack Engineer</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="text-blue-600">
                <TypingEffect strings={roles} typeSpeed={70} backSpeed={45} loop={true} />
              </span>
            </div>

            {/* Tagline / Positioning */}
            <p className="text-lg sm:text-xl font-medium text-slate-700 italic mb-4 border-l-2 border-blue-600 pl-3.5">
              &ldquo;Building intelligent software systems today and engineering intelligent physical systems for tomorrow.&rdquo;
            </p>

            {/* Short Narrative Summary */}
            <p className="text-slate-600 text-[16px] sm:text-[17px] leading-relaxed mb-8 max-w-xl">
              I design and build production-ready full-stack applications, AI-powered systems, and automation solutions while pursuing my dual specialization in Mechatronics at Uva Wellassa University and IT at University of Moratuwa. Founder & Lead Engineer at <strong>Pynimox</strong>.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a href="#work" className="btn-primary">
                <span>View Selected Work</span>
                <i className="fas fa-arrow-down text-xs" />
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <i className="fas fa-file-pdf text-red-500 text-sm" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Tech Badges Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-slate-400">Core Focus:</span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                AI / LLM APIs
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                Next.js & React
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                C# & .NET Core
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                Supabase & Postgres
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                Mechatronics & Robotics
              </span>
            </div>
          </div>

          {/* Right Column: High-Tech Technical Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[390px]">
              {/* Outer Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-lg opacity-20 transition duration-1000 group-hover:opacity-30" />

              {/* Portrait Container */}
              <div className="relative bg-white rounded-2xl p-3 border border-slate-200 shadow-xl overflow-hidden">
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-[4/5] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/monishan.jpeg"
                    alt="Mathan Monishan - AI & Mechatronics Engineer"
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Gradient Overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="font-bold text-lg leading-tight">Mathan Monishan</span>
                    <span className="text-xs text-blue-300 font-medium">
                      Founder @ Pynimox · Mechatronics & AI
                    </span>
                  </div>
                </div>

                {/* Technical Highlights Bar */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg py-2 px-1">
                    <div className="font-bold text-slate-900 text-sm">Founder</div>
                    <div className="text-[11px] text-slate-500">Pynimox AI</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-lg py-2 px-1">
                    <div className="font-bold text-blue-600 text-sm">6+</div>
                    <div className="text-[11px] text-slate-500">Production Apps</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-lg py-2 px-1">
                    <div className="font-bold text-emerald-600 text-sm">Dual Deg.</div>
                    <div className="text-[11px] text-slate-500">Tech & IT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
