"use client"

import React from "react"

interface AboutProps {
  avatarUrl?: string | null
  roles?: string[]
  bioShort?: string | null
  bioLong?: string | null
  resumeUrl?: string | null
}

export default function About({
  avatarUrl = "/monishan.jpeg",
  resumeUrl = "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
}: AboutProps) {
  return (
    <section id="about" className="section-wrapper bg-slate-50/50 border-b border-slate-200/80">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="section-label">
            <i className="fas fa-user-astronaut text-blue-600 text-xs" />
            <span>Engineering Profile & Philosophy</span>
          </div>
          <h2 className="section-headline">
            About Mathan Monishan
          </h2>
          <p className="section-subtext">
            Bridging computational intelligence with mechanical systems — an engineer building production software today and intelligent physical systems tomorrow.
          </p>
        </div>

        {/* Narrative & Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Portrait & Stats */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-[360px] bg-white p-3 rounded-2xl border border-slate-200 shadow-md">
              <div className="rounded-xl overflow-hidden bg-slate-100 aspect-[4/5] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl || "/monishan.jpeg"}
                  alt="Mathan Monishan Portrait"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="font-bold text-slate-900 text-sm">
                  Mathan Monishan
                </div>
                <div className="text-xs text-blue-600 font-semibold mt-0.5">
                  AI & Full-Stack Engineer | Mechatronics
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Based in Sri Lanka · Open to Global Roles
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-[16px]">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Software Rigor Meets Physical Engineering
              </h3>

              <p>
                I am an engineer pursuing a dual-academic path: a <strong>BSc (Hons) in Science & Technology specializing in Mechatronics</strong> at Uva Wellassa University of Sri Lanka, and a <strong>Bachelor of Information Technology (External)</strong> at the University of Moratuwa.
              </p>

              <p>
                Over the past several years, I have built and shipped commercial production software across diverse domains — from full-stack web applications and ERP modules at <strong>NF Group of Companies</strong>, to founding <strong>Pynimox</strong>, an AI automation studio where I engineer custom multi-agent LLM systems for global clients.
              </p>

              <p>
                My work is driven by a deep conviction: true technical innovation happens at the intersection of intelligent software algorithms, robust cloud databases, and mechanical physical systems. Whether optimizing a Next.js server component, writing high-performance C# backend logic, or interfacing sensor arrays for robotics, I approach every challenge with systematic discipline and architectural clarity.
              </p>

              {/* Highlight Metrics Box */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-500 font-medium">Founder</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">Pynimox AI</div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-500 font-medium">Focus</div>
                  <div className="text-base font-bold text-blue-600 mt-0.5">Mechatronics</div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-500 font-medium">Stack</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">Full-Stack & AI</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href={resumeUrl || "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <i className="fas fa-file-pdf" />
                  <span>Download Curriculum Vitae (CV)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
