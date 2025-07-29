"use client"

import { Mail, Phone, MapPin, Linkedin } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-6">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-mono">Danielle Davis</h1>
        <p className="text-base sm:text-lg text-blue-600 mb-4 font-mono">Creator of Effortless IT Experiences</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm font-mono">
          <a
            href="mailto:davis072087@gmail.com"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="break-all">davis072087@gmail.com</span>
          </a>
          <a
            href="tel:214.603.4714"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>214.603.4714</span>
          </a>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>Dallas, TX USA</span>
          </div>
          <a
            href="https://www.linkedin.com/in/davisthetech/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="h-4 w-4 flex-shrink-0" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>
    </header>
  )
}
