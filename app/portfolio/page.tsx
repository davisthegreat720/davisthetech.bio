"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Github, Mail, Phone, MapPin, Upload, Folder, ChevronRight, Home } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function PortfolioPage() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "MongoDB",
    "Git",
  ]

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "https://github.com/davis/ecommerce",
      demo: "https://demo.example.com",
    },
    {
      title: "Task Management App",
      description: "Real-time collaborative task management with WebSocket integration",
      technologies: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/davis/taskapp",
      demo: "https://taskapp.example.com",
    },
    {
      title: "Data Analytics Dashboard",
      description: "Interactive dashboard for data visualization and analytics",
      technologies: ["Python", "Flask", "D3.js", "PostgreSQL"],
      github: "https://github.com/davis/analytics",
      demo: "https://analytics.example.com",
    },
  ]

  const experience = [
    {
      title: "Senior Software Engineer",
      company: "Tech Company Inc.",
      period: "2022 - Present",
      description:
        "Led development of microservices architecture, mentored junior developers, and improved system performance by 40%.",
    },
    {
      title: "Full Stack Developer",
      company: "Startup Solutions",
      period: "2020 - 2022",
      description:
        "Developed and maintained web applications using React and Node.js, collaborated with cross-functional teams.",
    },
    {
      title: "Junior Developer",
      company: "Digital Agency",
      period: "2019 - 2020",
      description: "Built responsive websites and web applications, gained experience in modern web technologies.",
    },
  ]

  const [currentDirectory, setCurrentDirectory] = useState<string>("")

  const projectDirectories = [
    { name: "Web Development", path: "web-dev", fileCount: 3 },
    { name: "Mobile Apps", path: "mobile", fileCount: 2 },
    { name: "Data Science", path: "data", fileCount: 1 },
  ]

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Header with Home Link */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/" className="text-slate-500 hover:text-slate-700 transition-colors">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600">Portfolio</span>
        </div>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Davis the Tech</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            IT Engineer specializing in full-stack development and cloud technologies
          </p>
        </div>
      </div>

      {/* Contact Info & Resume Download */}
      <Card className="mb-6 md:mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                davis.tech@email.com
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </span>
            </div>
            <div className="flex gap-2">
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="mb-6 md:mb-8">
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
          <CardDescription>Technologies and tools I work with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Directory Navigation */}
      {!currentDirectory && (
        <Card className="mb-6 md:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Project Categories
            </CardTitle>
            <CardDescription>Browse projects by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectDirectories.map((dir) => (
                <Card
                  key={dir.path}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setCurrentDirectory(dir.path)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Folder className="h-8 w-8 text-purple-600" />
                      <div>
                        <h3 className="font-semibold">{dir.name}</h3>
                        <p className="text-sm text-slate-600">{dir.fileCount} projects</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      <Card className="mb-6 md:mb-8">
        <CardHeader>
          <CardTitle>Featured Projects</CardTitle>
          <CardDescription>Some of my recent work and contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="hidden sm:inline ml-2">Code</span>
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="hidden sm:inline ml-2">Demo</span>
                      </a>
                    </Button>
                  </div>
                </div>
                <p className="text-slate-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="mb-6 md:mb-8">
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>My professional journey and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="border-l-2 border-blue-200 pl-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <span className="text-sm text-slate-500">{job.period}</span>
                </div>
                <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                <p className="text-slate-600">{job.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Documents</CardTitle>
          <CardDescription>Upload additional portfolio documents (PDF/HTML)</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Portfolio Files
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
