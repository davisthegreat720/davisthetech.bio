"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, FileText, ExternalLink, Briefcase } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-6">
            <Link
              href="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <User className="h-4 w-4" />
              About
            </Link>
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/" ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <FileText className="h-4 w-4" />
              Resume
            </Link>
            <Link
              href="/portfolio"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/portfolio"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Portfolio
            </Link>
          </div>

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
      </div>
    </nav>
  )
}
