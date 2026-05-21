"use client"

import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-200px)]">
          {/* Left Side - Blue Section */}
          <div className="border-2 border-blue-600 text-black flex items-center justify-center p-8 lg:p-16 rounded-l-lg">
            <div className="text-center lg:text-left max-w-md">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-mono">Danielle Davis</h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl mb-8 font-mono text-black">IT Leader | Tech Enthusiast     </h2>

              {/* Divider */}
              <div className="w-16 h-0.5 bg-black mb-8 mx-auto lg:mx-0"></div>

              {/* Social Icons */}
              <div className="flex justify-center lg:justify-start gap-6 mb-8">
                <a
                  href="https://www.linkedin.com/in/davisthetech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-600 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-8 w-8" />
                </a>
                <a
                  href="https://github.com/davisthegreat720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-600 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-8 w-8" />
                </a>
                <a
                  href="mailto:davis072087@gmail.com"
                  className="text-black hover:text-gray-600 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Headshot Section */}
          <div className="bg-white flex items-center justify-center p-8 lg:p-16 rounded-r-lg">
            <div className="w-full max-w-md aspect-square relative rounded-lg shadow-2xl overflow-hidden">
              <Image
                src="/images/headshot.jpg"
                alt="Danielle Davis - Professional headshot"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 sm:mt-16">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">
            <p className="text-slate-600 mb-4 font-mono text-sm sm:text-base">
              Ready to discuss how I can contribute to your organization's IT strategy and growth?
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                <a href="mailto:davis072087@gmail.com" className="flex items-center justify-center gap-2 font-mono">
                  <Mail className="h-4 w-4" />
                  Email Me
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                <a
                  href="https://www.linkedin.com/in/davisthetech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-mono"
                >
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </Button>
              <Button asChild size="sm" className="w-full sm:w-auto">
                <a
                  href="https://flowcv.com/resume/742wl5baknuf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-mono"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Full Resume
                </a>
              </Button>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-4 sm:mt-6 font-mono">
              © 2024 Danielle Davis. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
