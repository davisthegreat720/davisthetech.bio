"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Briefcase } from "lucide-react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function PortfolioPage() {
  const projects = [
    {
      title: "Enterprise IAM Implementation",
      description:
        "Led the implementation of Okta SSO for 450+ users, streamlining authentication and improving security posture across multiple SaaS applications.",
      technologies: ["Okta", "SAML", "SCIM", "MFA", "Zero Trust"],
      category: "Identity & Access Management",
    },
    {
      title: "IT Infrastructure Automation",
      description:
        "Developed Python and Bash scripts to automate hardware deployments, service desk operations, and process standardization for enterprise environments.",
      technologies: ["Python", "Bash", "Automation", "ITSM", "Process Optimization"],
      category: "Process Automation",
    },
    {
      title: "Mobile Device Management (MDM)",
      description:
        "Implemented and managed JAMF and Mosyle solutions for 350+ end-users across hybrid OS environments, ensuring security and compliance.",
      technologies: ["JAMF", "Mosyle", "macOS", "iOS", "Windows", "Google Workspace"],
      category: "Endpoint Management",
    },
    {
      title: "Cloud Infrastructure Migration",
      description:
        "Led cloud infrastructure initiatives using Azure and GCP, implementing scalable solutions for rapid-growth startup environments.",
      technologies: ["Azure", "GCP", "Cloud Migration", "Infrastructure as Code"],
      category: "Cloud Infrastructure",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Header />
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 font-mono flex items-center gap-2">
            <Briefcase className="h-6 w-6 sm:h-8 sm:w-8" />
            Professional Portfolio
          </h1>
          <p className="text-slate-600 font-mono text-sm sm:text-base">
            Showcasing key projects and achievements in IT infrastructure, automation, and enterprise solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="font-mono text-lg sm:text-xl">{project.title}</CardTitle>
                  <Badge variant="secondary" className="font-mono text-xs w-fit">
                    {project.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4 font-mono text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="font-mono text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Section */}
        <Card className="w-full mt-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg sm:text-xl">Core Competencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 font-mono text-sm">IAM & Security</h3>
                <ul className="text-slate-600 text-xs sm:text-sm font-mono space-y-1">
                  <li>• Okta Administration</li>
                  <li>• SAML/SCIM Integration</li>
                  <li>• Zero Trust Architecture</li>
                  <li>• MFA Implementation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 font-mono text-sm">Automation & Scripting</h3>
                <ul className="text-slate-600 text-xs sm:text-sm font-mono space-y-1">
                  <li>• Python Development</li>
                  <li>• Bash Scripting</li>
                  <li>• Process Automation</li>
                  <li>• Workflow Optimization</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 font-mono text-sm">Cloud & Infrastructure</h3>
                <ul className="text-slate-600 text-xs sm:text-sm font-mono space-y-1">
                  <li>• Azure & GCP</li>
                  <li>• Infrastructure as Code</li>
                  <li>• Cloud Migration</li>
                  <li>• Scalable Solutions</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 font-mono text-sm">Endpoint Management</h3>
                <ul className="text-slate-600 text-xs sm:text-sm font-mono space-y-1">
                  <li>• JAMF & Mosyle</li>
                  <li>• Cross-platform MDM</li>
                  <li>• Device Compliance</li>
                  <li>• Security Policies</li>
                </ul>
              </div>
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
                  <ExternalLink className="h-4 w-4" />
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
                  <ExternalLink className="h-4 w-4" />
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
