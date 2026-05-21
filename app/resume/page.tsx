"use client"

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Linkedin } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Navigation />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="w-full">
            <iframe
              src="https://flowcv.com/resume/742wl5baknuf"
              className="w-full h-[600px] sm:h-[900px] border-0 rounded-lg"
              title="Danielle Davis Resume"
              loading="lazy"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4 font-mono">
              Having trouble viewing the resume? You can also view it directly on FlowCV.
            </p>
            <a
              href="https://flowcv.com/resume/742wl5baknuf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-mono text-sm"
            >
              Open in New Tab
            </a>
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
