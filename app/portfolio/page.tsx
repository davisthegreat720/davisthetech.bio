"use client"

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
  const projects = [
    {
      title: "Enterprise IAM Implementation",
      description:
        "Led the implementation of Okta SSO for 450+ users, streamlining authentication and improving security posture.",
      technologies: ["Okta", "SAML", "OAuth", "Active Directory"],
      category: "Identity & Access Management",
    },
    {
      title: "SaaS Infrastructure Automation",
      description:
        "Automated deployment and management of cloud infrastructure using Infrastructure as Code principles.",
      technologies: ["Terraform", "AWS", "Docker", "Kubernetes"],
      category: "Cloud Infrastructure",
    },
    {
      title: "IT Service Desk Optimization",
      description:
        "Implemented ITSM solutions that reduced ticket resolution time by 40% and improved user satisfaction.",
      technologies: ["ServiceNow", "Jira", "Slack", "PowerBI"],
      category: "IT Operations",
    },
    {
      title: "Zero Trust Security Framework",
      description: "Designed and implemented zero-trust security architecture for remote workforce of 350+ employees.",
      technologies: ["Zero Trust", "VPN", "MFA", "Endpoint Security"],
      category: "Security",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Navigation />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-mono">Portfolio</h2>
          <p className="text-gray-600 font-mono text-sm sm:text-base">
            A showcase of my IT leadership projects and technical implementations that have driven organizational
            success.
          </p>
        </div>

        {/* Portfolio Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button variant="default" className="font-mono">
              IT Projects
            </Button>
            <Link href="/portfolio/v0-projects">
              <Button variant="outline" className="font-mono bg-transparent">
                v0 Projects
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="font-mono text-xs">
                    {project.category}
                  </Badge>
                </div>
                <CardTitle className="font-mono text-lg">{project.title}</CardTitle>
                <CardDescription className="font-mono text-sm">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
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

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4 font-mono">Interested in Learning More?</h3>
          <p className="text-gray-600 mb-6 font-mono text-sm sm:text-base">
            These projects represent just a portion of my experience in IT leadership and technical implementation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <a href="mailto:davis072087@gmail.com" className="font-mono">
                Discuss a Project
              </a>
            </Button>
            <Button asChild>
              <a
                href="https://www.linkedin.com/in/davisthetech/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
