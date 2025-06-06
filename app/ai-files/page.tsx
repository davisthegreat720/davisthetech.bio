"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Download, Trash2, Eye, Search, Folder, FolderPlus, ChevronRight, Home } from "lucide-react"
import { FileUploadDialog } from "@/components/file-upload-dialog"
import Link from "next/link"

interface RobotFile {
  id: string
  name: string
  description: string
  content: string
  createdAt: string
  type: "html" | "pdf" | "text"
  size: string
  directory: string
}

interface Directory {
  name: string
  path: string
  fileCount: number
}

export default function RobotArchivePage() {
  const [files, setFiles] = useState<RobotFile[]>([
    {
      id: "1",
      name: "Landing Page Template",
      description: "Professional responsive landing page design",
      content: "<html><head><title>Sample</title></head><body><h1>Professional Landing Page</h1></body></html>",
      createdAt: "2024-01-15",
      type: "html",
      size: "15 KB",
      directory: "Web Development",
    },
    {
      id: "2",
      name: "Dashboard Design",
      description: "Modern dashboard layout with analytics",
      content: "PDF content placeholder",
      createdAt: "2024-01-14",
      type: "pdf",
      size: "245 KB",
      directory: "UI/UX",
    },
    {
      id: "3",
      name: "Technical Documentation",
      description: "Comprehensive project documentation template",
      content:
        "<html><body><h1>Technical Documentation</h1><p>Project specifications and requirements...</p></body></html>",
      createdAt: "2024-01-13",
      type: "html",
      size: "22 KB",
      directory: "Documentation",
    },
    {
      id: "4",
      name: "System Architecture",
      description: "Scalable system architecture design",
      content: "<html><body><h1>System Architecture</h1><p>Microservices architecture overview...</p></body></html>",
      createdAt: "2024-01-12",
      type: "html",
      size: "18 KB",
      directory: "Architecture",
    },
    {
      id: "5",
      name: "New Orleans 2024",
      description: "Professional travel planning documentation",
      content: "<!DOCTYPE html><html><head><title>New Orleans 2024</title>...</html>",
      createdAt: "2024-01-10",
      type: "html",
      size: "32 KB",
      directory: "Travel",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "html" | "pdf">("all")
  const [currentDirectory, setCurrentDirectory] = useState<string>("")
  const [showNewDirectoryForm, setShowNewDirectoryForm] = useState(false)
  const [newDirectoryName, setNewDirectoryName] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Get all unique directories
  const directories: Directory[] = Array.from(new Set(files.map((f) => f.directory)))
    .filter((dir) => dir !== "")
    .map((dir) => ({
      name: dir,
      path: dir,
      fileCount: files.filter((f) => f.directory === dir).length,
    }))

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || file.type === filterType
    const matchesDirectory = currentDirectory === "" || file.directory === currentDirectory
    return matchesSearch && matchesFilter && matchesDirectory
  })

  const handleFileUpload = (fileData: {
    name: string
    description: string
    content: string
    type: "html" | "pdf" | "text"
    directory: string
  }) => {
    const newFileEntry: RobotFile = {
      id: Date.now().toString(),
      ...fileData,
      createdAt: new Date().toISOString().split("T")[0],
      size: `${Math.round(fileData.content.length / 1024)} KB`,
    }
    setFiles([...files, newFileEntry])
  }

  const createDirectory = () => {
    if (newDirectoryName.trim()) {
      setNewDirectoryName("")
      setShowNewDirectoryForm(false)
    }
  }

  const deleteFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  const downloadFile = (file: RobotFile) => {
    const blob = new Blob([file.content], {
      type: file.type === "html" ? "text/html" : "application/pdf",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${file.name}.${file.type}`
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
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Robot Archive</h1>
        </div>
        <p className="text-slate-600">Professional document archive and technical content collection</p>
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
                Document Categories
              </CardTitle>
              <Button size="sm" onClick={() => setShowNewDirectoryForm(!showNewDirectoryForm)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Category
              </Button>
            </div>
            <CardDescription>Organize documents by project type or category</CardDescription>
          </CardHeader>
          <CardContent>
            {showNewDirectoryForm && (
              <div className="mb-4 p-4 border rounded-lg bg-slate-50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Category name (e.g., Web Development, Documentation, Architecture)"
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
                      <Folder className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">{dir.name}</h3>
                        <p className="text-sm text-slate-600">{dir.fileCount} documents</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {directories.length === 0 && (
                <div className="col-span-full text-center py-8 text-slate-500">
                  <Folder className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No categories yet. Create your first category to organize documents.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search documents..."
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
        </CardContent>
      </Card>

      {/* Upload Button */}
      <Card className="mb-6 md:mb-8">
        <CardContent className="pt-6 pb-6">
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-6"
            size="lg"
          >
            <Upload className="h-6 w-6 mr-2" />
            <span className="text-lg">Add Documents to Archive</span>
          </Button>
        </CardContent>
      </Card>

      {/* Files Grid */}
      <div className="grid gap-4 md:gap-6">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    {file.name}
                    <Badge variant="outline" className="ml-2">
                      {file.type.toUpperCase()}
                    </Badge>
                    {file.directory && (
                      <Badge variant="secondary" className="ml-1">
                        {file.directory}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-2">{file.description}</CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Preview</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => downloadFile(file)}>
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Download</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteFile(file.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Remove</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-600 mb-3">
                Size: {file.size} • Created: {file.createdAt}
                {file.directory && ` • Category: ${file.directory}`}
              </div>
              <div className="bg-slate-50 p-3 rounded text-sm font-mono max-h-24 md:max-h-32 overflow-y-auto">
                {file.content.substring(0, 150)}...
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No documents found</h3>
            <p className="text-slate-600">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : currentDirectory
                  ? `No documents in the "${currentDirectory}" category yet`
                  : "Add your first document to get started"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* File Upload Dialog */}
      <FileUploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onFileUpload={handleFileUpload}
        directories={directories}
        currentDirectory={currentDirectory}
      />
    </div>
  )
}
