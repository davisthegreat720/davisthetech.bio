"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Briefcase } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-4">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors font-mono ${
                pathname === "/" ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <FileText className="h-4 w-4" />
              Resume
            </Link>
            <Link
              href="/portfolio"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors font-mono ${
                pathname === "/portfolio"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Portfolio
            </Link>
          </div>

          <Button asChild size="sm">
            <a
              href="https://flowcv.com/resume/q9of1o321lid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs sm:text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden xs:inline">View Full Resume</span>
              <span className="xs:hidden">Resume</span>
            </a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
