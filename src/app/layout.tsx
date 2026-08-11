import type { Metadata } from "next"
import { Poppins, Ubuntu } from "next/font/google"

import "./globals.css"

/*
 * Poppins (body) and Ubuntu (headings) are the two families the current site
 * loads from Google Fonts via a <link>. Self-hosting them through next/font
 * removes the render-blocking request and the layout shift that comes with it.
 * Weights match exactly what the old stylesheet asked for.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mathan Monishan | Portfolio",
  description:
    "Mathan Monishan — full-stack developer, mobile app developer and UI/UX designer.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${ubuntu.variable}`}>
        {children}
      </body>
    </html>
  )
}
