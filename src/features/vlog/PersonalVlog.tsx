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
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
    <section id="vlog" className="section-wrapper vlog-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <i className="fas fa-video" />
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
        <div className="filter-tabs-row">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          >
            All Logs & Vlogs ({vlogList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("vlog")}
            className={`filter-btn ${activeFilter === "vlog" ? "active" : ""}`}
          >
            <i className="fas fa-play" style={{ fontSize: "10px" }} />
            <span>Video Vlogs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("article")}
            className={`filter-btn ${activeFilter === "article" ? "active" : ""}`}
          >
            <i className="fas fa-newspaper" style={{ fontSize: "10px" }} />
            <span>Engineering Notes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("gallery")}
            className={`filter-btn ${activeFilter === "gallery" ? "active" : ""}`}
          >
            <i className="fas fa-camera" style={{ fontSize: "10px" }} />
            <span>Photo & Lab Gallery</span>
          </button>
        </div>

        {/* Logs Grid */}
        <div className="vlogs-grid">
          {filteredList.map((item) => (
            <div key={item.id} className="vlog-card">
              <div className="vlog-card-body">
                {/* Media Header */}
                <div className="vlog-media-box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.cover_image_url || "/projects/pynimox.jpg"}
                    alt={item.title}
                    className="vlog-cover-img"
                  />

                  {/* Category Badge */}
                  <span className={`vlog-cat-badge ${item.category}`}>
                    <i
                      className={`fas ${
                        item.category === "vlog"
                          ? "fa-play"
                          : item.category === "article"
                          ? "fa-pen-fancy"
                          : "fa-images"
                      }`}
                      style={{ fontSize: "9px" }}
                    />
                    <span>
                      {item.category === "vlog"
                        ? "Video Vlog"
                        : item.category === "article"
                        ? "Engineering Note"
                        : "Photo Gallery"}
                    </span>
                  </span>

                  {/* Video Play Overlay */}
                  {item.category === "vlog" && item.video_url && (
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(item.video_url || null)}
                      className="vlog-play-btn"
                      aria-label="Play video"
                    >
                      <i className="fas fa-play" style={{ marginLeft: "2px" }} />
                    </button>
                  )}
                </div>

                {/* Content Box */}
                <div className="vlog-info">
                  <div className="vlog-meta-row">
                    <span>{item.date}</span>
                    <span>{item.read_time}</span>
                  </div>

                  <h3 className="vlog-title">{item.title}</h3>
                  <p className="vlog-summary">{item.summary}</p>

                  {item.tags && (
                    <div className="vlog-tags-row">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="vlog-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button at bottom */}
              <div className="vlog-card-action">
                {item.category === "vlog" && item.video_url ? (
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(item.video_url || null)}
                    className="vlog-action-btn vlog-btn"
                  >
                    <i className="fas fa-play" style={{ fontSize: "10px" }} />
                    <span>Watch Video Vlog</span>
                  </button>
                ) : item.category === "gallery" ? (
                  <button
                    type="button"
                    onClick={() => setSelectedImage(item.cover_image_url || "/projects/pynimox.jpg")}
                    className="vlog-action-btn gallery-btn"
                  >
                    <i className="fas fa-images" style={{ fontSize: "10px" }} />
                    <span>View Photo Gallery</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveArticle(item)}
                    className="vlog-action-btn article-btn"
                  >
                    <i className="fas fa-book-open" style={{ fontSize: "10px" }} />
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
        <div className="modal-backdrop" onClick={() => setSelectedVideo(null)}>
          <div className="modal-video-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Personal Video Vlog Player</span>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="modal-close-btn"
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="modal-video-frame">
              <iframe
                src={selectedVideo}
                title="Personal Video Vlog"
                className="iframe-player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div className="modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="modal-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="lightbox-close"
            >
              <i className="fas fa-times" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selectedImage} alt="Full view" className="lightbox-img" />
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="modal-backdrop" onClick={() => setActiveArticle(null)}>
          <div className="modal-article-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-simple">
              <span className="article-tag-label">Engineering Note · {activeArticle.date}</span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="modal-close-btn"
                style={{ color: "#64748b" }}
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <h3 className="article-modal-title">{activeArticle.title}</h3>
            <p className="article-modal-content">
              {activeArticle.content || activeArticle.summary}
            </p>
            <div style={{ paddingTop: "16px", borderTop: "1px solid #f1f5f9", textAlign: "right" }}>
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

      <style jsx>{`
        .vlog-section {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .filter-tabs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .filter-btn {
          font-size: 13px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #475569;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .filter-btn.active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        .vlogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .vlog-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .vlog-card:hover {
          border-color: #93c5fd;
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.08);
          transform: translateY(-4px);
        }

        .vlog-media-box {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #0f172a;
          overflow: hidden;
        }

        .vlog-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .vlog-card:hover .vlog-cover-img {
          transform: scale(1.05);
        }

        .vlog-cat-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 11px;
          font-weight: 700;
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .vlog-cat-badge.vlog { background: #2563eb; }
        .vlog-cat-badge.article { background: #4f46e5; }
        .vlog-cat-badge.gallery { background: #10b981; }

        .vlog-play-btn {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          color: #2563eb;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: transform 0.2s ease;
        }

        .vlog-play-btn:hover {
          transform: scale(1.15);
        }

        .vlog-info {
          padding: 20px 24px;
        }

        .vlog-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .vlog-title {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
          line-height: 1.35;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .vlog-summary {
          font-size: 13.5px;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 14px;
        }

        .vlog-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .vlog-tag {
          font-size: 11px;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .vlog-card-action {
          padding: 16px 24px;
          border-top: 1px solid #f1f5f9;
        }

        .vlog-action-btn {
          width: 100%;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .vlog-btn {
          background: #eff6ff;
          color: #2563eb;
        }
        .vlog-btn:hover { background: #2563eb; color: #ffffff; }

        .gallery-btn {
          background: #ecfdf5;
          color: #059669;
        }
        .gallery-btn:hover { background: #059669; color: #ffffff; }

        .article-btn {
          background: #f8fafc;
          color: #334155;
          border: 1px solid #e2e8f0;
        }
        .article-btn:hover { background: #0f172a; color: #ffffff; }

        /* Modals */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-video-card {
          width: 100%;
          max-width: 800px;
          background: #0f172a;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border: 1px solid #334155;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: #1e293b;
          color: #ffffff;
        }

        .modal-title {
          font-size: 14px;
          font-weight: 600;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 18px;
          cursor: pointer;
        }

        .modal-close-btn:hover { color: #ffffff; }

        .modal-video-frame {
          aspect-ratio: 16 / 9;
          width: 100%;
        }

        .iframe-player {
          width: 100%;
          height: 100%;
          border: none;
        }

        .modal-lightbox-card {
          position: relative;
          max-width: 900px;
          max-height: 85vh;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          padding: 8px;
        }

        .lightbox-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.8);
          color: #ffffff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .lightbox-img {
          max-height: 80vh;
          width: auto;
          display: block;
          border-radius: 10px;
        }

        .modal-article-card {
          width: 100%;
          max-width: 650px;
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }

        .modal-header-simple {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .article-tag-label {
          font-size: 12px;
          font-weight: 700;
          color: #2563eb;
          text-transform: uppercase;
        }

        .article-modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .article-modal-content {
          font-size: 15px;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 24px;
          white-space: pre-line;
        }

        @media (max-width: 992px) {
          .vlogs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .vlogs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
