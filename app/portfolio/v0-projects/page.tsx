"use client"

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function V0ProjectsPage() {
  const v0Projects = [
    {
      title: "Professional Portfolio Website",
      description:
        "Modern, responsive portfolio website showcasing IT leadership experience and technical projects. Built with Next.js and Tailwind CSS using v0's AI-powered development workflow.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "v0"],
      category: "Web Development",
      status: "Live",
      duration: "2 days",
      date: "December 2024",
      features: [
        "Responsive design with mobile-first approach",
        "Professional resume integration with FlowCV",
        "Dynamic portfolio showcase",
        "Contact form with email integration",
        "SEO optimized with Next.js App Router",
      ],
    },
    {
      title: "Interactive Dashboard Template",
      description:
        "Comprehensive dashboard template with real-time data visualization, user management, and analytics. Designed for IT operations monitoring and business intelligence.",
      technologies: ["React", "Chart.js", "shadcn/ui", "Recharts", "v0"],
      category: "Data Visualization",
      status: "In Development",
      duration: "1 week",
      date: "January 2025",
      features: [
        "Real-time metrics and KPI tracking",
        "Customizable widget layouts",
        "Dark/light theme support",
        "Export functionality for reports",
        "Role-based access control",
      ],
    },
    {
      title: "Form Builder Application",
      description:
        "Dynamic form generation tool with drag-and-drop interface, validation rules, and conditional logic. Perfect for creating surveys, applications, and data collection forms.",
      technologies: ["React Hook Form", "Zod", "DnD Kit", "JSON Schema", "v0"],
      category: "Productivity Tool",
      status: "Planning",
      duration: "3 weeks",
      date: "February 2025",
      features: [
        "Drag-and-drop form builder interface",
        "Advanced validation and conditional logic",
        "Multi-step form support",
        "Data export in multiple formats",
        "Integration with popular services",
      ],
    },
    {
      title: "IT Asset Management System",
      description:
        "Comprehensive asset tracking system for IT equipment, software licenses, and infrastructure components. Includes automated discovery and lifecycle management.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "QR Codes", "v0"],
      category: "Enterprise Tool",
      status: "Concept",
      duration: "4 weeks",
      date: "March 2025",
      features: [
        "Automated asset discovery and tracking",
        "QR code generation for physical assets",
        "Maintenance scheduling and alerts",
        "Cost analysis and depreciation tracking",
        "Integration with procurement systems",
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-800"
      case "In Development":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "Concept":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Navigation />
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back to Portfolio */}
        <div className="mb-6">
          <Link href="/portfolio">
            <Button variant="ghost" className="font-mono">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-mono">v0 Projects</h1>
          <p className="text-gray-600 font-mono text-sm sm:text-base max-w-3xl">
            A collection of innovative projects built using v0's AI-powered development platform. These projects
            showcase rapid prototyping capabilities, modern web development practices, and practical solutions for
            real-world challenges.
          </p>
        </div>

        {/* Portfolio Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Link href="/portfolio">
              <Button variant="outline" className="font-mono bg-transparent">
                IT Projects
              </Button>
            </Link>
            <Button variant="default" className="font-mono">
              v0 Projects
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {v0Projects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {project.category}
                    </Badge>
                    <Badge className={`font-mono text-xs ${getStatusColor(project.status)}`}>{project.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {project.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {project.duration}
                    </div>
                  </div>
                </div>

                <CardTitle className="font-mono text-xl mb-2">{project.title}</CardTitle>
                <CardDescription className="font-mono text-sm leading-relaxed">{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <h4 className="font-mono font-semibold mb-3 text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="font-mono text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-mono font-semibold mb-3 text-sm">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {project.status === "Live" && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="sm" className="font-mono">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Demo
                    </Button>
                    <Button variant="outline" size="sm" className="font-mono bg-transparent">
                      <Github className="h-4 w-4 mr-2" />
                      View Source
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4 font-mono">Building with v0</h3>
          <p className="text-gray-600 mb-6 font-mono text-sm sm:text-base max-w-2xl mx-auto">
            These projects demonstrate the power of AI-assisted development with v0, enabling rapid prototyping and
            professional-grade applications with modern web technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <a href="mailto:davis072087@gmail.com" className="font-mono">
                Collaborate on a Project
              </a>
            </Button>
            <Button asChild>
              <a href="https://v0.dev" target="_blank" rel="noopener noreferrer" className="font-mono">
                <ExternalLink className="h-4 w-4 mr-2" />
                Learn About v0
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
