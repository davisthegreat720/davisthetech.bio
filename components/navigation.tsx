"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Briefcase } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-3">
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
        </div>
      </div>
    </nav>
  )
}
