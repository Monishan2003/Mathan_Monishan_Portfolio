import type { Metadata } from "next"
import { Poppins, Ubuntu } from "next/font/google"

import "./globals.css"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
})

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mathan Monishan | AI & Full-Stack Engineer | Mechatronics",
  description:
    "Mathan Monishan — AI & Full-Stack Engineer, Mechatronics Engineer. Founder at Pynimox. Engineering intelligent software and physical systems.",
  icons: {
    icon: [
      { url: "/monishan.jpeg", type: "image/jpeg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/monishan.jpeg",
    apple: "/monishan.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/monishan.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/monishan.jpeg" />
        <link rel="apple-touch-icon" href="/monishan.jpeg" />
        {/* FontAwesome 6 Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Unicons */}
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        />
      </head>
      <body className={`${poppins.variable} ${ubuntu.variable}`}>
        {children}
      </body>
    </html>
  )
}
