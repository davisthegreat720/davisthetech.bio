import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Award, Briefcase, Mail, Linkedin, ExternalLink, Construction } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />

      {/* Main Content - About Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed text-lg">
                IT leader with over 10 years of progressive experience in Identity & Access Management (IAM),
                endpoint/Mobile Device Management (MDM), process automation, and enterprise SaaS infrastructure. Proven
                ability to drive strategic transformation in remote-first, high-growth environments. Adept at aligning
                technology strategy with business goals to enhance security, compliance, and operational excellence.
              </p>
            </CardContent>
          </Card>

          {/* Key Expertise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Core Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">IAM & Automation</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      Okta
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Okta Workflows
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      SCIM
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      MFA
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Zero-Trust
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Endpoint/MDM Management</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      JAMF
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Mosyle
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Zero-touch deployments
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Cloud Infrastructure</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      Azure
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      GCP
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Google Cloud Platform
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Scripting & Development</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Bash
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Bash Scripting
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">ITSM & Collaboration</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      Jira
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Confluence
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Zoom
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Slack
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">OS & Administration</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      macOS
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Windows
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Google Workspace
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Role Highlight */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Current Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-slate-900 mb-1">Lead IT Engineer</h3>
                <p className="text-blue-600 font-medium mb-2">Recharge Inc. | Remote | 09/2023 – present</p>
                <p className="text-slate-700 leading-relaxed">
                  Lead and manage internal IT infrastructure, operations, and IAM in a 450+ user SaaS based environment.
                  Serve as SME for Okta (SSO, MFA, SCIM, policies) and Okta Workflows automation. Key outcomes include
                  streamlining IAM, service desk operations and managing hardware via automation and process
                  standardization.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Professional Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Okta Administrator</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">ITIL v3</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">JAMF 200</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Apple ACMT</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Danielle Davis Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                About Danielle Davis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <Construction className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Coming Soon</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  This section is currently under development. Check back soon for detailed information about my
                  background, experience, and professional journey.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
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
