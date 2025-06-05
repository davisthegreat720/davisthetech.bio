"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Brain, User, X, ChevronRight } from "lucide-react"
import Image from "next/image"

interface SearchResult {
  id: string
  title: string
  content: string
  type: "robot-archive" | "bear-notes" | "portfolio"
  directory?: string
  url: string
  tags?: string[]
  description?: string
  createdAt?: string
}

// Mock search data - in a real app, this would come from your backend
const searchData: SearchResult[] = [
  {
    id: "1",
    title: "Landing Page Template",
    content: "AI-generated responsive landing page with modern design elements",
    type: "robot-archive",
    directory: "Lifting",
    url: "/ai-files",
    description: "AI-generated responsive landing page",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Recipe Generator",
    content: "AI-generated recipe collection with healthy meal options",
    type: "robot-archive",
    directory: "Food",
    url: "/ai-files",
    description: "AI-generated recipe collection",
    createdAt: "2024-01-13",
  },
  {
    id: "3",
    title: "Project Ideas",
    content: "Web Development Projects Personal portfolio website Task management app Weather dashboard",
    type: "bear-notes",
    directory: "Development",
    url: "/notes",
    tags: ["development", "projects", "ideas"],
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    title: "Learning Notes - React",
    content: "React Hooks useState and useEffect are fundamental hooks Custom Hooks Creating reusable logic",
    type: "bear-notes",
    directory: "Learning",
    url: "/notes",
    tags: ["react", "learning", "javascript"],
    createdAt: "2024-01-08",
  },
  {
    id: "5",
    title: "E-commerce Platform",
    content: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
    type: "portfolio",
    url: "/portfolio",
    description: "Full-stack e-commerce solution",
  },
  {
    id: "6",
    title: "Task Management App",
    content: "Real-time collaborative task management with WebSocket integration",
    type: "portfolio",
    url: "/portfolio",
    description: "Real-time collaborative task management",
  },
]

export function UniversalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      // Escape to close
      if (e.key === "Escape") {
        setIsOpen(false)
        setSearchTerm("")
        setResults([])
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const filtered = searchData.filter((item) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.content.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.directory?.toLowerCase().includes(searchLower) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    })

    setResults(filtered)
    setSelectedIndex(0)
  }, [searchTerm])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleResultClick(results[selectedIndex])
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false)
    setSearchTerm("")
    setResults([])
    // Navigate to the result - in a real app, you'd use router.push
    window.location.href = result.url
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "robot-archive":
        return <Brain className="h-4 w-4 text-blue-600" />
      case "bear-notes":
        return (
          <div className="w-4 h-4 relative">
            <Image src="/images/bear-logo.png" alt="Bear Notes" width={16} height={16} className="rounded-sm" />
          </div>
        )
      case "portfolio":
        return <User className="h-4 w-4 text-purple-600" />
      default:
        return <FileText className="h-4 w-4 text-slate-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "robot-archive":
        return "Robot Archive"
      case "bear-notes":
        return "Bear Notes"
      case "portfolio":
        return "Portfolio"
      default:
        return "Unknown"
    }
  }

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text

    const regex = new RegExp(`(${searchTerm})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-slate-900 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:inline text-sm">Search</span>
        <kbd className="hidden md:inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Search Modal */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-[10vh]">
        <div className="w-full max-w-2xl mx-4">
          {/* Search Input */}
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center px-4 py-3 border-b border-slate-100">
              <Search className="h-5 w-5 text-slate-400 mr-3" />
              <Input
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search across Robot Archive, Bear Notes, and Portfolio..."
                className="border-0 focus-visible:ring-0 text-lg placeholder:text-slate-400"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="ml-2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search Results */}
            {results.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className={`px-4 py-3 cursor-pointer transition-colors border-b border-slate-50 last:border-b-0 ${
                      index === selectedIndex ? "bg-slate-50" : "hover:bg-slate-25"
                    }`}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getTypeIcon(result.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-slate-900 truncate">
                            {highlightText(result.title, searchTerm)}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(result.type)}
                          </Badge>
                          {result.directory && (
                            <Badge variant="secondary" className="text-xs">
                              {result.directory}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {highlightText(result.description || result.content.substring(0, 100) + "...", searchTerm)}
                        </p>
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                                {highlightText(tag, searchTerm)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {searchTerm.trim() !== "" && results.length === 0 && (
              <div className="px-4 py-8 text-center">
                <Search className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 mb-1">No results found for "{searchTerm}"</p>
                <p className="text-sm text-slate-400">Try searching for files, notes, projects, or tags</p>
              </div>
            )}

            {/* Search Tips */}
            {searchTerm.trim() === "" && (
              <div className="px-4 py-6">
                <p className="text-sm text-slate-500 mb-3">Search across all your content:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <span>Robot Archive files and directories</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-4 h-4 relative">
                      <Image
                        src="/images/bear-logo.png"
                        alt="Bear Notes"
                        width={16}
                        height={16}
                        className="rounded-sm"
                      />
                    </div>
                    <span>Bear Notes and tags</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>Portfolio projects and skills</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-400">
                    Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">↑</kbd>{" "}
                    <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">↓</kbd> to navigate,{" "}
                    <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">Enter</kbd> to select,{" "}
                    <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">Esc</kbd> to close
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
