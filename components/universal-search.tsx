"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, File, Folder } from "lucide-react"

export function UniversalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{
    files: { title: string; path: string; type: string; section: string }[]
    loading: boolean
  }>({
    files: [],
    loading: false,
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.length > 2) {
      setSearchResults({ ...searchResults, loading: true })

      // Simulate search results with a delay
      setTimeout(() => {
        // Mock search results
        const results = [
          {
            title: "Landing Page Template",
            path: "/ai-files",
            type: "html",
            section: "Robot Archive",
          },
          {
            title: "Project Planning Framework",
            path: "/notes",
            type: "html",
            section: "Bear Notes",
          },
          {
            title: "Technical Research - React",
            path: "/notes",
            type: "html",
            section: "Bear Notes",
          },
        ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))

        setSearchResults({
          files: results,
          loading: false,
        })
      }, 300)
    } else {
      setSearchResults({
        files: [],
        loading: false,
      })
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 text-slate-600 bg-transparent"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:inline">Search</span>
        <span className="hidden md:inline text-xs text-slate-400 ml-1">⌘K</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Search Documents</DialogTitle>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search across all documents..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
          </div>

          <div className="mt-2">
            {searchResults.loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
            ) : searchQuery.length > 2 && searchResults.files.length === 0 ? (
              <div className="text-center py-8 text-slate-500">No results found for "{searchQuery}"</div>
            ) : searchResults.files.length > 0 ? (
              <div className="divide-y">
                {searchResults.files.map((result, index) => (
                  <div key={index} className="py-3 hover:bg-slate-50 rounded px-2 cursor-pointer">
                    <div className="flex items-start gap-3">
                      {result.type === "html" ? (
                        <File className="h-5 w-5 text-blue-600 mt-0.5" />
                      ) : (
                        <Folder className="h-5 w-5 text-amber-600 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-2">
                          <span>{result.section}</span>
                          <span className="text-slate-300">•</span>
                          <span>{result.type.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {searchResults.files.length > 0 && (
            <div className="text-xs text-slate-500 mt-2">
              Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border">↑</kbd> and{" "}
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border">↓</kbd> to navigate,{" "}
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border">Enter</kbd> to select
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
