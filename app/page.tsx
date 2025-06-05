import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, User, Upload, FolderOpen, Code } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">Davis the Tech's Workspace</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Your centralized hub for AI-generated content, notes, professional development, and project showcase
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5 text-blue-600" />
                Robot Archive
              </CardTitle>
              <CardDescription className="text-sm">
                Store and organize your AI-generated content in custom directories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/ai-files">
                <Button className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Manage Robot Archive
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-5 h-5 relative">
                  <Image src="/images/bear-logo.png" alt="Bear Notes" width={20} height={20} className="rounded-sm" />
                </div>
                Bear Notes
              </CardTitle>
              <CardDescription className="text-sm">
                Access your exported Bear app notes in organized collections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/notes">
                <Button className="w-full" variant="outline">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  View Notes
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-purple-600" />
                Professional Portfolio
              </CardTitle>
              <CardDescription className="text-sm">Resume, projects, and IT engineering work showcase</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/portfolio">
                <Button className="w-full" variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  View Portfolio
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6 pb-4">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">50+</div>
              <p className="text-xs md:text-sm text-slate-600">Robot Files</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6 pb-4">
              <div className="text-2xl md:text-3xl font-bold text-green-600">200+</div>
              <p className="text-xs md:text-sm text-slate-600">Notes</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6 pb-4">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">15+</div>
              <p className="text-xs md:text-sm text-slate-600">Projects</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6 pb-4">
              <div className="text-2xl md:text-3xl font-bold text-orange-600">5+</div>
              <p className="text-xs md:text-sm text-slate-600">Years Exp</p>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card className="bg-slate-900 text-white">
          <CardContent className="py-8 md:py-12 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Welcome to My Digital Workspace</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto px-4">
              Explore my collection of AI-generated content, personal notes, and professional achievements. Everything
              is organized and easily accessible for your browsing convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-files">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-600 text-slate-900 hover:bg-slate-100"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
