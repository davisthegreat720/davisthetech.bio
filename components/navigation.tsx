"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home", isActive: (p: string) => p === "/" },
  { href: "/resume", label: "Resume", isActive: (p: string) => p === "/resume" },
  { href: "/portfolio", label: "Portfolio", isActive: (p: string) => p.startsWith("/portfolio") },
]

export function Navigation() {
  const pathname = usePathname() ?? "/"

  return (
    <header className="border-b-2 border-foreground bg-card">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6"
      >
        <Link
          href="/"
          className="inline-flex items-center rounded-md border-2 border-foreground bg-primary px-3 py-1.5 text-sm font-black tracking-tight shadow-nb-sm"
        >
          DD<span className="sr-only"> — Danielle Davis home</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-2">
          {links.map((link) => {
            const active = link.isActive(pathname)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center rounded-md border-2 px-3 py-1.5 text-sm font-bold transition-all",
                    active
                      ? "border-foreground bg-primary shadow-nb-sm"
                      : "border-transparent hover:border-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
