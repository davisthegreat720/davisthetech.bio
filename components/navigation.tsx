"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8 py-4">
          <Link
            href="/"
            className={cn(
              "px-3 py-2 text-sm font-mono transition-colors hover:text-blue-600",
              pathname === "/" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700",
            )}
          >
            Home
          </Link>
          <Link
            href="/resume"
            className={cn(
              "px-3 py-2 text-sm font-mono transition-colors hover:text-blue-600",
              pathname === "/resume" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700",
            )}
          >
            Resume
          </Link>
          <Link
            href="/portfolio"
            className={cn(
              "px-3 py-2 text-sm font-mono transition-colors hover:text-blue-600",
              pathname === "/portfolio" || pathname === "/portfolio/v0-projects"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700",
            )}
          >
            Portfolio
          </Link>
        </div>
      </div>
    </nav>
  )
}
