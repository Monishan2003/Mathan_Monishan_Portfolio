"use client"

import React from "react"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber = "94767634359",
  message = "Hello! I visited your portfolio and would like to get in touch.",
}: WhatsAppButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "")
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, "_blank")
  }

  return (
    <a
      href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`}
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#25d366",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
        zIndex: 990,
        boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
        animation: "pulse 2s infinite",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"
      }}
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  )
}
