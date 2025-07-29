import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, ExternalLink, Server, Shield, Smartphone, Cloud, Workflow, Award } from "lucide-react"

export default function PortfolioPage() {
  const projects = [
    {
      title: "Enterprise IAM Transformation",
      company: "Recharge Inc.",
      period: "2023 - Present",
      description:
        "Led comprehensive Identity & Access Management overhaul for 450+ user SaaS environment, implementing Okta SSO, MFA, and automated provisioning workflows.",
      technologies: ["Okta", "SCIM", "Okta Workflows", "Python", "REST APIs"],
      achievements: [
        "Reduced user onboarding time by 75%",
        "Implemented zero-trust security model",
        "Automated 90% of user lifecycle management",
      ],
      icon: Shield,
      category: "IAM & Security",
    },
    {
      title: "Zero-Touch Device Deployment",
      company: "Multiple Organizations",
      period: "2020 - Present",
      description:
        "Designed and implemented automated device enrollment and configuration systems using JAMF and Mosyle for seamless remote workforce enablement.",
      technologies: ["JAMF", "Mosyle", "Apple DEP", "MDM", "Bash Scripting"],
      achievements: [
        "Deployed 500+ devices with zero manual intervention",
        "Reduced IT support tickets by 60%",
        "Enabled secure remote work for entire organization",
      ],
      icon: Smartphone,
      category: "Endpoint Management",
    },
    {
      title: "Cloud Infrastructure Automation",
      company: "Various Projects",
      period: "2021 - Present",
      description:
        "Architected and deployed scalable cloud infrastructure solutions on Azure and GCP with automated provisioning and monitoring.",
      technologies: ["Azure", "GCP", "Terraform", "Python", "PowerShell"],
      achievements: [
        "Reduced infrastructure costs by 40%",
        "Achieved 99.9% uptime SLA",
        "Automated disaster recovery processes",
      ],
      icon: Cloud,
      category: "Cloud Infrastructure",
    },
    {
      title: "IT Service Management Optimization",
      company: "Enterprise Environments",
      period: "2019 - Present",
      description:
        "Streamlined IT service delivery through ITIL-based process improvements and automation using Jira Service Management.",
      technologies: ["Jira", "Confluence", "ITIL", "ServiceNow", "Automation"],
      achievements: [
        "Improved ticket resolution time by 50%",
        "Achieved 95% customer satisfaction rating",
        "Reduced manual processes by 70%",
      ],
      icon: Workflow,
      category: "Process Automation",
    },
  ]

  const certifications = [
    { name: "Okta Certified Administrator", issuer: "Okta", year: "2023" },
    { name: "ITIL v3 Foundation", issuer: "AXELOS", year: "2020" },
    { name: "JAMF 200", issuer: "JAMF", year: "2022" },
    { name: "Apple Certified Mac Technician", issuer: "Apple", year: "2021" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Header />
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {/* Portfolio Header */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-mono text-lg sm:text-xl">
                <Briefcase className="h-5 w-5" />
                Professional Portfolio
              </CardTitle>
              <CardDescription className="font-mono text-sm sm:text-base">
                Showcasing key projects and achievements in IT infrastructure, security, and automation
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Key Projects */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">Featured Projects</h2>

            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <project.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
                          <CardTitle className="text-lg sm:text-xl font-mono">{project.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className="font-mono text-xs w-fit">
                          {project.category}
                        </Badge>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 mb-2 font-mono">
                        {project.company} • {project.period}
                      </div>
                      <CardDescription className="text-sm sm:text-base font-mono leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 font-mono text-sm sm:text-base">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs font-mono">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 font-mono text-sm sm:text-base">
                        Key Achievements
                      </h4>
                      <ul className="space-y-1">
                        {project.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-mono">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills & Expertise */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-mono text-lg sm:text-xl">
                <Server className="h-5 w-5" />
                Technical Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 font-mono text-sm sm:text-base">
                    Identity & Access
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-700 font-mono">
                    <div>Okta Administration</div>
                    <div>SSO Implementation</div>
                    <div>MFA Deployment</div>
                    <div>SCIM Provisioning</div>
                    <div>Zero-Trust Architecture</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 font-mono text-sm sm:text-base">
                    Endpoint Management
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-700 font-mono">
                    <div>JAMF Pro</div>
                    <div>Mosyle Business</div>
                    <div>Apple DEP/VPP</div>
                    <div>Zero-touch Deployment</div>
                    <div>Policy Management</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 font-mono text-sm sm:text-base">
                    Cloud & Infrastructure
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-700 font-mono">
                    <div>Microsoft Azure</div>
                    <div>Google Cloud Platform</div>
                    <div>Infrastructure as Code</div>
                    <div>Monitoring & Alerting</div>
                    <div>Disaster Recovery</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 font-mono text-sm sm:text-base">
                    Automation & Scripting
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm text-slate-700 font-mono">
                    <div>Python Development</div>
                    <div>Bash Scripting</div>
                    <div>Okta Workflows</div>
                    <div>API Integration</div>
                    <div>Process Automation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-mono text-lg sm:text-xl">
                <Award className="h-5 w-5" />
                Professional Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 font-mono text-sm sm:text-base">{cert.name}</div>
                      <div className="text-xs sm:text-sm text-slate-600 font-mono">
                        {cert.issuer} • {cert.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 font-mono">
                  Interested in Learning More?
                </h3>
                <p className="text-slate-600 mb-4 font-mono text-sm sm:text-base">
                  Let's discuss how my experience can help drive your organization's IT initiatives forward.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                  <Button asChild size="sm" className="w-full sm:w-auto">
                    <a href="mailto:davis072087@gmail.com" className="flex items-center justify-center gap-2 font-mono">
                      Get In Touch
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
                      View LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
