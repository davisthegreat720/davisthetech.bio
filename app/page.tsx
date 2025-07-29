"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin, ExternalLink, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Header />
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Resume Embed */}
        <Card className="w-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 font-mono text-lg sm:text-xl">
              <FileText className="h-5 w-5" />
              Professional Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="w-full bg-white rounded-lg overflow-hidden shadow-inner">
              <iframe
                src="https://flowcv.com/resume/q9of1o321lid"
                className="w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px] border-none"
                title="Danielle Davis Resume"
                loading="lazy"
              />
            </div>
          </CardContent>
        </Card>
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
                  href="https://flowcv.com/resume/q9of1o321lid"
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
