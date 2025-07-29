"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin, ExternalLink, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Resume Embed */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Professional Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full bg-white rounded-lg overflow-hidden shadow-inner">
              <iframe
                src="https://flowcv.com/resume/q9of1o321lid"
                className="resume-iframe"
                title="Danielle Davis Resume"
                loading="lazy"
              />
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-slate-600 mb-4">
              Ready to discuss how I can contribute to your organization's IT strategy and growth?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline">
                <a href="mailto:davis072087@gmail.com" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Me
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://www.linkedin.com/in/davisthetech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </Button>
              <Button asChild>
                <a
                  href="https://flowcv.com/resume/q9of1o321lid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Full Resume
                </a>
              </Button>
            </div>
            <p className="text-slate-500 text-sm mt-6">© 2024 Danielle Davis. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
