"use client"

import { Mail, Phone, MapPin, Linkedin } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center">
          {/* Name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-mono">Danielle Davis</h1>

          {/* Title */}
          <p className="text-base sm:text-lg md:text-xl text-blue-600 mb-4 sm:mb-6 font-mono">
            Creator of Effortless IT Experiences
          </p>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base text-slate-600">
            <a
              href="mailto:davis072087@gmail.com"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors font-mono"
            >
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="break-all">davis072087@gmail.com</span>
            </a>

            <a
              href="tel:214.603.4714"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors font-mono"
            >
              <Phone className="h-4 w-4 flex-shrink-0" />
              214.603.4714
            </a>

            <div className="flex items-center gap-2 font-mono">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              Dallas, TX USA
            </div>

            <a
              href="https://www.linkedin.com/in/davisthetech/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors font-mono"
            >
              <Linkedin className="h-4 w-4 flex-shrink-0" />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
