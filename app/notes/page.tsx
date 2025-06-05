"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Tag, Upload, Download, Eye } from "lucide-react"
import Image from "next/image"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  modifiedAt: string
  type: "html" | "pdf"
  size: string
  directory: string
}

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [filterType, setFilterType] = useState<"all" | "html" | "pdf">("all")
  const [currentDirectory, setCurrentDirectory] = useState<string>("")

  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Project Ideas",
      content:
        "<h2>Web Development Projects</h2><ul><li>Personal portfolio website</li><li>Task management app</li><li>Weather dashboard</li></ul>",
      tags: ["development", "projects", "ideas"],
      createdAt: "2024-01-10",
      modifiedAt: "2024-01-15",
      type: "html",
      size: "8 KB",
      directory: "Development",
    },
    {
      id: "2",
      title: "Learning Notes - React",
      content:
        "<h2>React Hooks</h2><p>useState and useEffect are fundamental hooks...</p><h3>Custom Hooks</h3><p>Creating reusable logic...</p>",
      tags: ["react", "learning", "javascript"],
      createdAt: "2024-01-08",
      modifiedAt: "2024-01-12",
      type: "html",
      size: "12 KB",
      directory: "Learning",
    },
    {
      id: "3",
      title: "Meeting Notes - Team Sync",
      content: "PDF content placeholder",
      tags: ["meetings", "work", "team"],
      createdAt: "2024-01-05",
      modifiedAt: "2024-01-05",
      type: "pdf",
      size: "156 KB",
      directory: "Work",
    },
  ])

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)))

  // Get all unique directories
  const directories = Array.from(new Set(notes.map((n) => n.directory)))
    .filter((dir) => dir !== "")
    .map((dir) => ({
      name: dir,
      path: dir,
      fileCount: notes.filter((n) => n.directory === dir).length,
    }))

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || note.tags.includes(selectedTag)
    const matchesType = filterType === "all" || note.type === filterType
    const matchesDirectory = currentDirectory === "" || note.directory === currentDirectory
    return matchesSearch && matchesTag && matchesType && matchesDirectory
  })

  const downloadNote = (note: Note) => {
    const blob = new Blob([note.content], {
      type: note.type === "html" ? "text/html" : "application/pdf",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${note.title}.${note.type}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 relative">
            <Image src="/images/bear-logo.png" alt="Bear Notes" width={32} height={32} className="rounded-lg" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Bear Notes Collection</h1>
        </div>
        <p className="text-slate-600">Your exported Bear app notes, organized and searchable</p>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterType === "html" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("html")}
                >
                  HTML
                </Button>
                <Button
                  variant={filterType === "pdf" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("pdf")}
                >
                  PDF
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant={selectedTag === "" ? "default" : "outline"} size="sm" onClick={() => setSelectedTag("")}>
                All Tags
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="h-5 w-5" />
            Upload Bear Notes
          </CardTitle>
          <CardDescription>Upload your exported Bear notes (HTML/PDF format)</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Choose Files to Upload
          </Button>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid gap-4 md:gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-5 h-5 relative">
                      <Image
                        src="/images/bear-logo.png"
                        alt="Bear Notes"
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                    </div>
                    {note.title}
                    <Badge variant="outline" className="ml-2">
                      {note.type.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Modified: {note.modifiedAt}
                    </span>
                    <span className="text-sm">Size: {note.size}</span>
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">View</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => downloadNote(note)}>
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Download</span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardHeader>
            {note.type === "html" && (
              <CardContent>
                <div
                  className="prose prose-sm max-w-none bg-slate-50 p-3 rounded max-h-32 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
              </CardContent>
            )}
            {note.type === "pdf" && (
              <CardContent>
                <div className="bg-slate-50 p-3 rounded text-center text-slate-600">
                  PDF file - Click "View" to open or "Download" to save
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-12 h-12 relative mx-auto mb-4">
              <Image
                src="/images/bear-logo.png"
                alt="Bear Notes"
                width={48}
                height={48}
                className="rounded-lg opacity-50"
              />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No notes found</h3>
            <p className="text-slate-600">
              {searchTerm || selectedTag || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Upload your Bear app notes to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
