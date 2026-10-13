import type React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"

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

// Portfolio tab uses the neobrutalism design tokens (see tailwind.config.ts "nb" tokens).
export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${inter.variable} ${jetbrainsMono.variable} nb-scope`}>{children}</div>
}
