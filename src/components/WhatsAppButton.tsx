"use client"

import React from "react"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber = "94767634359",
  message = "Hello Mathan Monishan! I visited your portfolio and would like to connect.",
}: WhatsAppButtonProps) {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "")
  const encoded = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encoded}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float-btn"
    >
      {/* Crisp Official WhatsApp SVG Icon */}
      <svg
        className="whatsapp-svg"
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="currentColor"
      >
        <path d="M12.031 2C6.496 2 2 6.494 2 12.029c0 1.954.562 3.843 1.63 5.485L2 22l4.639-1.597A10.01 10.01 0 0 0 12.031 22c5.534 0 10.03-4.495 10.03-10.029C22.061 6.494 17.565 2 12.031 2zm0 18.355a8.318 8.318 0 0 1-4.242-1.164l-.304-.181-2.756.95.952-2.684-.199-.317A8.32 8.32 0 0 1 3.69 12.03c0-4.6 3.743-8.342 8.341-8.342 4.598 0 8.34 3.742 8.34 8.342 0 4.6-3.742 8.325-8.34 8.325zm4.57-6.241c-.251-.126-1.482-.731-1.712-.815-.229-.084-.396-.126-.563.126-.167.251-.647.815-.793.982-.146.167-.293.188-.544.063-.251-.126-1.059-.39-2.018-1.245-.746-.665-1.25-1.487-1.396-1.738-.146-.251-.016-.387.11-.512.113-.112.251-.293.376-.439.126-.146.167-.251.251-.418.084-.167.042-.314-.021-.439-.063-.126-.563-1.359-.772-1.862-.204-.49-.41-.423-.563-.431-.146-.008-.313-.01-.48-.01-.167 0-.439.063-.668.314-.229.251-.877.857-.877 2.09 0 1.233.898 2.424 1.023 2.592.126.167 1.766 2.697 4.279 3.782.598.258 1.065.413 1.43.529.601.191 1.148.164 1.58.1.481-.072 1.482-.606 1.691-1.192.209-.586.209-1.088.146-1.192-.062-.105-.229-.168-.48-.293z" />
      </svg>

      <style jsx>{`
        .whatsapp-float-btn {
          position: fixed;
          bottom: 25px;
          right: 25px;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background-color: #25d366;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 990;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
        }

        .whatsapp-float-btn:hover {
          transform: scale(1.1) translateY(-3px);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.65);
        }

        .whatsapp-svg {
          fill: #ffffff;
          display: block;
        }

        @media screen and (max-width: 600px) {
          .whatsapp-float-btn {
            bottom: 20px;
            right: 20px;
            width: 48px;
            height: 48px;
          }
          .whatsapp-svg {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </a>
  )
}
