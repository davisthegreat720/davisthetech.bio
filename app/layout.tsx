import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-nb-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-nb-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Danielle Davis — Staff IT Engineering Leader",
  description:
    "Danielle Davis is a staff-level IT engineering leader with 13+ years across identity and access management, endpoint engineering, enterprise SaaS, automation, and AI platform administration.",
  generator: "v0.dev",
}

export const viewport: Viewport = {
  themeColor: "#FDC800",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
