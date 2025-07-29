"use client"

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Mail, Linkedin } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Navigation />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-mono flex items-center gap-2">
              <span className="text-2xl">📄</span>
              Professional Resume
            </h2>
          </div>

          <div className="w-full">
            <iframe
              src="https://flowcv.com/resume/q9of1o321lid"
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
              href="https://flowcv.com/resume/q9of1o321lid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-mono text-sm"
            >
              Open in New Tab
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <Card className="mb-6 sm:mb-8 mt-8">
          <CardHeader>
            <CardTitle className="font-mono">Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed font-mono text-sm sm:text-base">
              IT leader with over 10 years of progressive experience in Identity & Access Management (IAM),
              endpoint/Mobile Device Management (MDM), process automation, and enterprise SaaS infrastructure. Proven
              ability to drive strategic transformation in remote-first, high-growth environments. Adept at aligning
              technology strategy with business goals to enhance security, compliance, and operational excellence.
            </p>
          </CardContent>
        </Card>

        {/* Key Skills */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="font-mono">Core Competencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold mb-2 font-mono text-sm">IAM & Automation</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs font-mono">
                    Okta
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    Okta Workflows
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    SCIM
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    MFA
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    Zero-Trust
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 font-mono text-sm">Scripting</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs font-mono">
                    Python
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    Bash
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    Bash Scripting
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 font-mono text-sm">Endpoint/MDM Management</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs font-mono">
                    JAMF
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    Mosyle
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 font-mono text-sm">Cloud Infrastructure</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs font-mono">
                    Azure
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    GCP
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-mono">
                    Google Cloud Platform
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ITSM & Collaboration Tools */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="font-mono">ITSM & Collaboration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              <Badge variant="outline" className="justify-center font-mono text-xs">
                Jira
              </Badge>
              <Badge variant="outline" className="justify-center font-mono text-xs">
                Confluence
              </Badge>
              <Badge variant="outline" className="justify-center font-mono text-xs">
                Zoom
              </Badge>
              <Badge variant="outline" className="justify-center font-mono text-xs">
                Slack
              </Badge>
              <Badge variant="outline" className="justify-center font-mono text-xs">
                Zoom
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Operating Systems & Administration */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="font-mono">OS & Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              <Badge variant="outline" className="justify-center font-mono text-xs">
                macOS
              </Badge>
              <Badge variant="outline" className="justify-center font-mono text-xs">
                Windows
              </Badge>
              <Badge variant="outline" className="justify-center font-mono text-xs">
                Google Workspace
              </Badge>
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
