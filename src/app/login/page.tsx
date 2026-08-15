"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("mathanmonishan@gmail.com")
  const [password, setPassword] = useState("AdminPassword2026!")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        throw authError
      }

      if (data?.user) {
        router.push("/admin")
        router.refresh()
      }
    } catch (err: unknown) {
      console.error("Login error:", err)
      const message = err instanceof Error ? err.message : "Failed to sign in. Please check your credentials."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #090642 0%, #1b0072 50%, #2b3fa7 100%)",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Return to website */}
      <Link
        href="/"
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          color: "rgba(255, 255, 255, 0.8)",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          fontWeight: 500,
          background: "rgba(255, 255, 255, 0.1)",
          padding: "8px 16px",
          borderRadius: "20px",
          backdropFilter: "blur(5px)",
          transition: "all 0.3s ease",
        }}
      >
        <i className="fas fa-arrow-left" /> Back to Portfolio
      </Link>

      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "440px",
          borderRadius: "20px",
          padding: "40px 36px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #1b0072 0%, #2b3fa7 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              margin: "0 auto 16px",
              boxShadow: "0 6px 15px rgba(43, 63, 167, 0.3)",
            }}
          >
            <i className="fas fa-user-shield" />
          </div>
          <h1
            style={{
              fontSize: "26px",
              color: "var(--secondary-color)",
              margin: 0,
              fontFamily: "var(--font-heading)",
            }}
          >
            Admin Sign In
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}>
            Manage your portfolio content & inquiries
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#b91c1c",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <i className="fas fa-exclamation-triangle" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-dark)",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1.5px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14.5px",
                color: "#1e293b",
                outline: "none",
                transition: "all 0.2s ease",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-dark)",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 42px 12px 14px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "14.5px",
                  color: "#1e293b",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              fontWeight: 600,
              marginTop: "10px",
              borderRadius: "8px",
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt" /> Sign In to Admin
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "25px",
            padding: "12px",
            background: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "12.5px",
            color: "#64748b",
            textAlign: "center",
          }}
        >
          <strong>Default Credentials:</strong>
          <br />
          Email: <code style={{ color: "var(--primary-color)" }}>mathanmonishan@gmail.com</code>
          <br />
          Password: <code style={{ color: "var(--primary-color)" }}>AdminPassword2026!</code>
        </div>
      </div>
    </div>
  )
}
