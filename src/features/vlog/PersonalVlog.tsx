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
      tags: ["AI Studio", "Venture", "Architecture"],
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
      tags: ["Mechatronics", "Engineering", "Robotics"],
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
      tags: ["Hardware", "Circuits", "Lab Work"],
      content:
        "A photo collection documenting hands-on laboratory experiments, electronic circuitry design, sensor calibrations, and mechatronic prototypes.",
    },
  ]

  const vlogList = items.length > 0 ? items : defaultVlogs
  const filteredList =
    activeFilter === "all"
      ? vlogList
      : vlogList.filter((item) => item.category === activeFilter)

  return (
    <section className="vlog section" id="vlog">
      <h2 className="section__title" data-heading="Behind the Code">
        Personal Vlog & Logs
      </h2>

      <div className="vlog__container container">
        {/* Filter Tabs */}
        <div className="vlog__filters">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`vlog__filter-btn ${activeFilter === "all" ? "active-filter" : ""}`}
          >
            All Logs ({vlogList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("vlog")}
            className={`vlog__filter-btn ${activeFilter === "vlog" ? "active-filter" : ""}`}
          >
            <i className="fas fa-play" style={{ fontSize: "10px" }} />
            <span>Video Vlogs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("article")}
            className={`vlog__filter-btn ${activeFilter === "article" ? "active-filter" : ""}`}
          >
            <i className="fas fa-newspaper" style={{ fontSize: "10px" }} />
            <span>Engineering Notes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("gallery")}
            className={`vlog__filter-btn ${activeFilter === "gallery" ? "active-filter" : ""}`}
          >
            <i className="fas fa-camera" style={{ fontSize: "10px" }} />
            <span>Photo Gallery</span>
          </button>
        </div>

        {/* Vlog Cards Grid */}
        <div className="vlog__grid grid">
          {filteredList.map((item) => (
            <div key={item.id} className="vlog__card">
              {/* Media Box */}
              <div className="vlog__img-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.cover_image_url || "/projects/pynimox.jpg"}
                  alt={item.title}
                  className="vlog__img"
                />

                <span className={`vlog__cat-pill ${item.category}`}>
                  <i
                    className={`fas ${
                      item.category === "vlog"
                        ? "fa-play"
                        : item.category === "article"
                        ? "fa-pen-fancy"
                        : "fa-images"
                    }`}
                  />
                  <span>
                    {item.category === "vlog"
                      ? "Video Vlog"
                      : item.category === "article"
                      ? "Engineering Note"
                      : "Photo Gallery"}
                  </span>
                </span>

                {item.category === "vlog" && item.video_url && (
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(item.video_url || null)}
                    className="vlog__play-btn"
                    aria-label="Play video"
                  >
                    <i className="fas fa-play" />
                  </button>
                )}
              </div>

              {/* Data Content */}
              <div className="vlog__data">
                <div className="vlog__meta">
                  <span>{item.date}</span>
                  <span>{item.read_time}</span>
                </div>

                <h3 className="vlog__card-title">{item.title}</h3>
                <p className="vlog__card-desc">{item.summary}</p>

                <div className="vlog__actions">
                  {item.category === "vlog" && item.video_url ? (
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(item.video_url || null)}
                      className="vlog__btn-link"
                    >
                      <span>Watch Video</span>
                      <i className="fas fa-play" style={{ fontSize: "10px" }} />
                    </button>
                  ) : item.category === "gallery" ? (
                    <button
                      type="button"
                      onClick={() => setSelectedImage(item.cover_image_url || "/projects/pynimox.jpg")}
                      className="vlog__btn-link"
                    >
                      <span>View Gallery</span>
                      <i className="fas fa-images" style={{ fontSize: "10px" }} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveArticle(item)}
                      className="vlog__btn-link"
                    >
                      <span>Read Note</span>
                      <i className="fas fa-arrow-right" style={{ fontSize: "10px" }} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="vlog__modal" onClick={() => setSelectedVideo(null)}>
          <div className="vlog__modal-video" onClick={(e) => e.stopPropagation()}>
            <div className="vlog__modal-header">
              <span>Personal Video Vlog</span>
              <i className="fas fa-times close-icon" onClick={() => setSelectedVideo(null)} />
            </div>
            <div className="vlog__iframe-wrapper">
              <iframe
                src={selectedVideo}
                title="Personal Video"
                className="vlog__iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <div className="vlog__modal" onClick={() => setSelectedImage(null)}>
          <div className="vlog__modal-lightbox" onClick={(e) => e.stopPropagation()}>
            <i className="fas fa-times lightbox-close" onClick={() => setSelectedImage(null)} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selectedImage} alt="Full view" className="lightbox-img" />
          </div>
        </div>
      )}

      {/* Article Modal */}
      {activeArticle && (
        <div className="vlog__modal" onClick={() => setActiveArticle(null)}>
          <div className="vlog__modal-article" onClick={(e) => e.stopPropagation()}>
            <div className="vlog__modal-header">
              <span style={{ color: "var(--skin-color)" }}>Engineering Note · {activeArticle.date}</span>
              <i className="fas fa-times close-icon" onClick={() => setActiveArticle(null)} />
            </div>
            <h3 className="article-title">{activeArticle.title}</h3>
            <p className="article-body">{activeArticle.content || activeArticle.summary}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .vlog__filters {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.8rem;
          flex-wrap: wrap;
        }

        .vlog__filter-btn {
          padding: 0.5rem 1.2rem;
          color: var(--title-color, rgb(241, 241, 243));
          font-weight: var(--font-medium, 500);
          font-size: 0.9rem;
          border-radius: 0.5rem;
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .vlog__filter-btn:hover {
          color: var(--skin-color, #3482ff);
          background-color: var(--box-color-hover, rgb(28, 28, 38));
          border-color: var(--box-border-hover);
        }

        .vlog__filter-btn.active-filter {
          background-color: var(--skin-color, #3482ff);
          color: #ffffff;
          border-color: var(--skin-color, #3482ff);
          box-shadow: 0 4px 15px rgba(52, 130, 255, 0.35);
        }

        .vlog__grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .vlog__card {
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          border-radius: 1.25rem;
          overflow: hidden;
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .vlog__card:hover {
          transform: translateY(-6px);
          border-color: var(--skin-color, #3482ff);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
        }

        .vlog__img-box {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background-color: #000000;
        }

        .vlog__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .vlog__card:hover .vlog__img {
          transform: scale(1.06);
        }

        .vlog__cat-pill {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.65rem;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background-color: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(6px);
          color: var(--skin-color, #3482ff);
          border: 1px solid rgba(52, 130, 255, 0.3);
        }

        .vlog__play-btn {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--skin-color, #3482ff);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
          transition: transform 0.25s ease;
        }

        .vlog__play-btn:hover {
          transform: scale(1.15);
        }

        .vlog__data {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
        }

        .vlog__meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.6rem;
        }

        .vlog__card-title {
          font-size: 1.1rem;
          color: var(--title-color, rgb(241, 241, 243));
          line-height: 1.35;
          margin-bottom: 0.6rem;
        }

        .vlog__card-desc {
          font-size: 0.88rem;
          color: var(--text-color, rgb(214, 214, 220));
          line-height: 1.6;
          margin-bottom: 1.2rem;
        }

        .vlog__actions {
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .vlog__btn-link {
          background: none;
          color: var(--skin-color, #3482ff);
          font-size: 0.88rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: gap 0.2s ease;
        }

        .vlog__btn-link:hover {
          gap: 0.7rem;
        }

        /* Modal Styles */
        .vlog__modal {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: var(--z-modal, 10000);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
        }

        .vlog__modal-video {
          background-color: var(--box-color, rgb(22, 22, 29));
          border-radius: 1rem;
          overflow: hidden;
          width: 100%;
          max-width: 800px;
          border: 1px solid var(--box-border);
        }

        .vlog__modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--title-color, rgb(241, 241, 243));
          font-weight: 600;
        }

        .close-icon {
          cursor: pointer;
          font-size: 1.2rem;
          color: var(--skin-color, #3482ff);
        }

        .vlog__iframe-wrapper {
          aspect-ratio: 16 / 9;
          width: 100%;
        }

        .vlog__iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .vlog__modal-lightbox {
          position: relative;
          max-width: 900px;
          max-height: 85vh;
        }

        .lightbox-close {
          position: absolute;
          top: -2.5rem;
          right: 0;
          font-size: 1.5rem;
          color: #ffffff;
          cursor: pointer;
        }

        .lightbox-img {
          max-height: 80vh;
          border-radius: 0.75rem;
        }

        .vlog__modal-article {
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .article-title {
          font-size: 1.35rem;
          color: var(--title-color, rgb(241, 241, 243));
          margin: 1rem 0;
        }

        .article-body {
          font-size: 0.95rem;
          color: var(--text-color, rgb(214, 214, 220));
          line-height: 1.7;
          white-space: pre-line;
        }

        @media screen and (max-width: 1024px) {
          .vlog__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media screen and (max-width: 600px) {
          .vlog__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
