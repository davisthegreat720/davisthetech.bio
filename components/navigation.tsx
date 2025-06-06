"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Brain, User } from "lucide-react"
import Image from "next/image"
import { UniversalSearch } from "@/components/universal-search"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/ai-files", label: "Robot Archive", icon: Brain },
    { href: "/notes", label: "Bear Notes", icon: null, customIcon: true },
    { href: "/portfolio", label: "Portfolio", icon: User },
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Home Link - Always Visible */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg md:text-xl font-bold text-slate-900 hover:text-slate-700 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">Davis the Tech's Workspace</span>
            <span className="sm:hidden">Home</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.customIcon ? (
                  <div className="w-4 h-4 relative">
                    <Image src="/images/bear-logo.png" alt="Bear Notes" width={16} height={16} className="rounded-sm" />
                  </div>
                ) : (
                  item.icon && <item.icon className="h-4 w-4" />
                )}
                {item.label}
              </Link>
            ))}
            <UniversalSearch />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.customIcon ? (
                  <div className="w-4 h-4 relative">
                    <Image src="/images/bear-logo.png" alt="Bear Notes" width={16} height={16} className="rounded-sm" />
                  </div>
                ) : (
                  item.icon && <item.icon className="h-4 w-4" />
                )}
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2">
              <UniversalSearch />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
