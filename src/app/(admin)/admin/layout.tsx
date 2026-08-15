import React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        color: "#1e293b",
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </div>
  )
}
