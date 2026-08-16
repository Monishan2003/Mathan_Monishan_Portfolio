"use client"

import React, { useState } from "react"

export interface VlogItem {
  id: string | number
  title: string
  category: "vlog" | "article" | "gallery"
  date: string
  summary: string
  content?: string
  video_url?: string | null
  cover_image_url?: string | null
  gallery_urls?: string[] | null
  read_time?: string
  tags?: string[]
}

interface PersonalVlogProps {
  items?: VlogItem[]
}

export default function PersonalVlog({ items = [] }: PersonalVlogProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "vlog" | "article" | "gallery">("all")
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeArticle, setActiveArticle] = useState<VlogItem | null>(null)

  const defaultVlogs: VlogItem[] = [
    {
      id: "vlog-1",
      title: "Building Pynimox: From Concept to AI Automation Studio",
      category: "vlog",
      date: "Feb 2026",
      read_time: "5 min watch",
      summary:
        "A video walkthrough of how I founded Pynimox, architected the multi-agent LLM pipeline, and built the client delivery infrastructure.",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Embeddable video demo
      cover_image_url: "/projects/pynimox.jpg",
      tags: ["AI Studio", "Venture", "Architecture", "Next.js"],
      content:
        "In this video log, I walk through the complete journey of launching Pynimox. We discuss handling real-time streaming LLM responses, managing client workflows, and creating production-ready microservices.",
    },
    {
      id: "vlog-2",
      title: "Bridging Full-Stack Software with Mechatronics & Physical Computing",
      category: "article",
      date: "Jan 2026",
      read_time: "6 min read",
      summary:
        "Reflections on my dual-degree journey: Combining software engineering rigor (APIs, databases, React) with sensor robotics and hardware control.",
      cover_image_url: "/projects/unisphere.jpg",
      tags: ["Mechatronics", "Engineering", "Robotics", "Full-Stack"],
      content:
        "Engineering intelligent physical systems requires strong foundations in both bits and atoms. My academic specialization in Mechatronics at Uva Wellassa University coupled with Information Technology at University of Moratuwa gives me a unique perspective on bridging software intelligence with mechanical actuators and sensor networks.",
    },
    {
      id: "vlog-3",
      title: "Mechatronics Lab & Hardware Prototyping Showcase",
      category: "gallery",
      date: "Dec 2025",
      read_time: "Photo Gallery",
      summary:
        "Snapshots and insights from university robotics lab sessions, circuit breadboarding, microcontrollers, and automation experiments.",
      cover_image_url: "/projects/hotel.jpg",
      gallery_urls: [
        "/projects/pynimox.jpg",
        "/projects/medicross.jpg",
        "/projects/srmj.jpg",
        "/projects/unisphere.jpg",
      ],
      tags: ["Hardware", "Circuits", "Lab Work", "University"],
      content:
        "A photo collection documenting hands-on laboratory experiments, electronic circuitry design, sensor calibrations, and mechatronic prototypes.",
    },
    {
      id: "vlog-4",
      title: "Architecting High-Throughput E-Commerce on Next.js 15 & Supabase",
      category: "article",
      date: "Nov 2025",
      read_time: "4 min read",
      summary:
        "Deep dive into state management, Stripe payment webhooks, database indexing, and server components for SRMJ Enterprises.",
      cover_image_url: "/projects/srmj.jpg",
      tags: ["Next.js 15", "Supabase", "Stripe", "Performance"],
      content:
        "When building SRMJ Enterprises, the priority was sub-second page loads and zero transaction drops. By leveraging Next.js 15 App Router server caching and PostgreSQL row-level security, we achieved exceptional performance.",
    },
  ]

  const vlogList = items.length > 0 ? items : defaultVlogs
  const filteredList =
    activeFilter === "all"
      ? vlogList
      : vlogList.filter((item) => item.category === activeFilter)

  return (
    <section id="vlog" className="section-wrapper bg-slate-50/50 border-b border-slate-200/80">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="section-label">
            <i className="fas fa-video text-blue-600 text-xs" />
            <span>Personal Vlog & Engineering Logs</span>
          </div>
          <h2 className="section-headline">
            Behind the Code & Lab Moments
          </h2>
          <p className="section-subtext">
            Personal video vlogs, engineering reflections, technical write-ups, and snapshots from my journey across AI engineering, startup building, and mechatronics.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Logs & Vlogs ({vlogList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("vlog")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
              activeFilter === "vlog"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <i className="fas fa-play text-[10px]" />
            <span>Video Vlogs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("article")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
              activeFilter === "article"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <i className="fas fa-newspaper text-[10px]" />
            <span>Engineering Notes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("gallery")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
              activeFilter === "gallery"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <i className="fas fa-camera text-[10px]" />
            <span>Photo & Lab Gallery</span>
          </button>
        </div>

        {/* Logs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Media Header */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.cover_image_url || "/projects/pynimox.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md text-white shadow-sm flex items-center gap-1.5 ${
                        item.category === "vlog"
                          ? "bg-blue-600"
                          : item.category === "article"
                          ? "bg-indigo-600"
                          : "bg-emerald-600"
                      }`}
                    >
                      <i
                        className={`fas ${
                          item.category === "vlog"
                            ? "fa-play"
                            : item.category === "article"
                            ? "fa-pen-fancy"
                            : "fa-images"
                        } text-[9px]`}
                      />
                      <span>
                        {item.category === "vlog"
                          ? "Video Vlog"
                          : item.category === "article"
                          ? "Engineering Note"
                          : "Photo Gallery"}
                      </span>
                    </span>
                  </div>

                  {/* Play Action for Video */}
                  {item.category === "vlog" && item.video_url && (
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(item.video_url || null)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-blue-600 flex items-center justify-center text-lg shadow-lg hover:scale-110 transition-transform cursor-pointer"
                      aria-label="Play video"
                    >
                      <i className="fas fa-play ml-0.5" />
                    </button>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6">
                  {/* Date & Read time */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2.5">
                    <span>{item.date}</span>
                    <span>{item.read_time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0">
                {item.category === "vlog" && item.video_url ? (
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(item.video_url || null)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs py-2.5 rounded-lg transition-colors"
                  >
                    <i className="fas fa-play text-[10px]" />
                    <span>Watch Video Vlog</span>
                  </button>
                ) : item.category === "gallery" ? (
                  <button
                    type="button"
                    onClick={() => setSelectedImage(item.cover_image_url || "/projects/pynimox.jpg")}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold text-xs py-2.5 rounded-lg transition-colors"
                  >
                    <i className="fas fa-images text-[10px]" />
                    <span>View Photo Gallery</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveArticle(item)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white font-semibold text-xs py-2.5 rounded-lg transition-colors"
                  >
                    <i className="fas fa-book-open text-[10px]" />
                    <span>Read Full Note</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <span className="font-semibold text-sm">Personal Video Vlog Player</span>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="text-slate-400 hover:text-white"
              >
                <i className="fas fa-times text-lg" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src={selectedVideo}
                title="Personal Video Vlog"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900"
            >
              <i className="fas fa-times" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Full view"
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl p-8 max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Engineering Note · {activeArticle.date}
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <i className="fas fa-times text-lg" />
              </button>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {activeArticle.title}
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-6 whitespace-pre-line">
              {activeArticle.content || activeArticle.summary}
            </p>
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="btn-secondary"
              >
                Close Note
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
