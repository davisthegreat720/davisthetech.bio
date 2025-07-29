"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Calendar,
  Tag,
  Upload,
  Download,
  Eye,
  ChevronRight,
  Home,
  Folder,
  FolderPlus,
  Lock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FileUploadDialog, PasswordProtection } from "@/components/dynamic-imports"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  modifiedAt: string
  type: "html" | "pdf" | "text"
  size: string
  directory: string
}

interface Directory {
  name: string
  path: string
  fileCount: number
}

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [filterType, setFilterType] = useState<"all" | "html" | "pdf">("all")
  const [currentDirectory, setCurrentDirectory] = useState<string>("")
  const [showNewDirectoryForm, setShowNewDirectoryForm] = useState(false)
  const [newDirectoryName, setNewDirectoryName] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Project Planning Framework",
      content:
        "<h2>Software Development Projects</h2><ul><li>Requirements analysis</li><li>Architecture design</li><li>Implementation strategy</li></ul>",
      tags: ["development", "projects", "planning"],
      createdAt: "2024-01-10",
      modifiedAt: "2024-01-15",
      type: "html",
      size: "8 KB",
      directory: "Development",
    },
    {
      id: "2",
      title: "Technical Research - React",
      content:
        "<h2>React Best Practices</h2><p>Component architecture and state management...</p><h3>Performance Optimization</h3><p>Memoization and optimization techniques...</p>",
      tags: ["react", "research", "javascript"],
      createdAt: "2024-01-08",
      modifiedAt: "2024-01-12",
      type: "html",
      size: "12 KB",
      directory: "Research",
    },
    {
      id: "3",
      title: "Project Meeting Notes",
      content: "PDF content placeholder",
      tags: ["meetings", "project", "team"],
      createdAt: "2024-01-05",
      modifiedAt: "2024-01-05",
      type: "pdf",
      size: "156 KB",
      directory: "Meetings",
    },
    {
      id: "4",
      title: "Daily Standup Notes",
      content: "<h2>Daily Standup - Jan 20</h2><p>Sprint progress and blockers...</p>",
      tags: ["meetings", "standup", "team"],
      createdAt: "2024-01-20",
      modifiedAt: "2024-01-20",
      type: "html",
      size: "5 KB",
      directory: "Meetings",
    },
    {
      id: "5",
      title: "Architecture Design",
      content: "<h2>System Architecture</h2><p>Microservices design patterns...</p>",
      tags: ["architecture", "design", "systems"],
      createdAt: "2024-01-18",
      modifiedAt: "2024-01-19",
      type: "html",
      size: "15 KB",
      directory: "Architecture",
    },
  ])

  // Get all unique directories
  const directories: Directory[] = Array.from(new Set(notes.map((n) => n.directory)))
    .filter((dir) => dir !== "")
    .map((dir) => ({
      name: dir,
      path: dir,
      fileCount: notes.filter((n) => n.directory === dir).length,
    }))

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)))

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || note.tags.includes(selectedTag)
    const matchesType = filterType === "all" || note.type === filterType
    const matchesDirectory = currentDirectory === "" || note.directory === currentDirectory
    return matchesSearch && matchesTag && matchesType && matchesDirectory
  })

  const handleUploadClick = () => {
    if (isAuthenticated) {
      setIsUploadDialogOpen(true)
    } else {
      setIsPasswordDialogOpen(true)
    }
  }

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true)
    setIsUploadDialogOpen(true)
  }

  const handleFileUpload = (fileData: {
    name: string
    description: string
    content: string
    type: "html" | "pdf" | "text"
    directory: string
  }) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: fileData.name,
      content: fileData.content,
      tags: fileData.description
        .toLowerCase()
        .split(" ")
        .filter((tag) => tag.length > 2), // Auto-generate tags from description
      createdAt: new Date().toISOString().split("T")[0],
      modifiedAt: new Date().toISOString().split("T")[0],
      type: fileData.type,
      size: `${Math.round(fileData.content.length / 1024)} KB`,
      directory: fileData.directory,
    }
    setNotes([...notes, newNote])
  }

  const createDirectory = () => {
    if (newDirectoryName.trim()) {
      setNewDirectoryName("")
      setShowNewDirectoryForm(false)
    }
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id))
  }

  const downloadNote = (note: Note) => {
    const blob = new Blob([note.content], {
      type: note.type === "html" ? "text/html" : note.type === "pdf" ? "application/pdf" : "text/plain",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${note.title}.${note.type}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getBreadcrumb = () => {
    if (!currentDirectory) return []
    return currentDirectory.split("/")
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Header with Home Link */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/" className="text-slate-500 hover:text-slate-700 transition-colors">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <div className="w-6 h-6 relative">
            <Image src="/images/bear-logo.png" alt="Bear Notes" width={24} height={24} className="rounded-sm" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Davis's Bear Notes</h1>
        </div>
        <p className="text-slate-600">Organized collection of project notes, research, and technical documentation</p>
      </div>

      {/* Breadcrumb Navigation */}
      {currentDirectory && (
        <Card className="mb-4">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-sm">
              <Button variant="ghost" size="sm" onClick={() => setCurrentDirectory("")} className="p-1 h-auto">
                <Home className="h-4 w-4" />
              </Button>
              <ChevronRight className="h-4 w-4 text-slate-400" />
              {getBreadcrumb().map((segment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-medium">{segment}</span>
                  {index < getBreadcrumb().length - 1 && <ChevronRight className="h-4 w-4 text-slate-400" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Directory View */}
      {!currentDirectory && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                Note Categories
              </CardTitle>
              <Button size="sm" onClick={() => setShowNewDirectoryForm(!showNewDirectoryForm)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Category
              </Button>
            </div>
            <CardDescription>Organize your Bear notes by project type or category</CardDescription>
          </CardHeader>
          <CardContent>
            {showNewDirectoryForm && (
              <div className="mb-4 p-4 border rounded-lg bg-slate-50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Category name (e.g., Development, Research, Meetings)"
                    value={newDirectoryName}
                    onChange={(e) => setNewDirectoryName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && createDirectory()}
                  />
                  <Button onClick={createDirectory} size="sm">
                    Create
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowNewDirectoryForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {directories.map((dir) => (
                <Card
                  key={dir.path}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setCurrentDirectory(dir.path)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Folder className="h-8 w-8 text-red-600" />
                      <div>
                        <h3 className="font-semibold">{dir.name}</h3>
                        <p className="text-sm text-slate-600">{dir.fileCount} notes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {directories.length === 0 && (
                <div className="col-span-full text-center py-8 text-slate-500">
                  <Folder className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No categories yet. Create your first category to organize notes.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Upload Button */}
      <Card className="mb-6 md:mb-8">
        <CardContent className="pt-6 pb-6">
          <Button onClick={handleUploadClick} className="w-full flex items-center justify-center gap-2 py-6" size="lg">
            {isAuthenticated ? (
              <>
                <Upload className="h-6 w-6 mr-2" />
                <span className="text-lg">Upload Bear Notes</span>
              </>
            ) : (
              <>
                <Lock className="h-6 w-6 mr-2" />
                <span className="text-lg">Secure Upload - Authentication Required</span>
              </>
            )}
          </Button>
          {isAuthenticated && <p className="text-center text-sm text-green-600 mt-2">✓ Upload access granted</p>}
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
                    {note.directory && (
                      <Badge variant="secondary" className="ml-1">
                        {note.directory}
                      </Badge>
                    )}
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
                  <Button size="sm" variant="outline" onClick={() => deleteNote(note.id)}>
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Remove</span>
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
                  PDF document - Click "View" to open or "Download" to save
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Folder className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No notes found</h3>
            <p className="text-slate-600">
              {searchTerm || selectedTag || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : currentDirectory
                  ? `No notes in the "${currentDirectory}" category yet`
                  : "Add your first note to get started"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Password Protection Dialog */}
      {isPasswordDialogOpen && (
        <PasswordProtection
          open={isPasswordDialogOpen}
          onOpenChange={setIsPasswordDialogOpen}
          onSuccess={handlePasswordSuccess}
          title="Bear Notes Upload Access"
          description="Enter the upload password to add notes to Davis's Bear Notes."
        />
      )}

      {/* File Upload Dialog */}
      {isUploadDialogOpen && (
        <FileUploadDialog
          open={isUploadDialogOpen}
          onOpenChange={setIsUploadDialogOpen}
          onFileUpload={handleFileUpload}
          directories={directories}
          currentDirectory={currentDirectory}
        />
      )}
    </div>
  )
}
