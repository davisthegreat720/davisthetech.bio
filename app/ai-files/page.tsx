"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Download, Trash2, Eye, Search, Folder, FolderPlus, ChevronRight, Home } from "lucide-react"

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
      description: "AI-generated responsive landing page",
      content: "<html><head><title>Sample</title></head><body><h1>AI Generated Page</h1></body></html>",
      createdAt: "2024-01-15",
      type: "html",
      size: "15 KB",
      directory: "Lifting",
    },
    {
      id: "2",
      name: "Dashboard Design",
      description: "Modern dashboard layout with charts",
      content: "PDF content placeholder",
      createdAt: "2024-01-14",
      type: "pdf",
      size: "245 KB",
      directory: "Food",
    },
    {
      id: "3",
      name: "Recipe Generator",
      description: "AI-generated recipe collection",
      content: "<html><body><h1>Healthy Recipes</h1><p>Collection of AI-generated recipes...</p></body></html>",
      createdAt: "2024-01-13",
      type: "html",
      size: "22 KB",
      directory: "Food",
    },
    {
      id: "4",
      name: "Workout Tracker",
      description: "Fitness tracking interface",
      content: "<html><body><h1>Workout Tracker</h1><p>Track your fitness progress...</p></body></html>",
      createdAt: "2024-01-12",
      type: "html",
      size: "18 KB",
      directory: "Lifting",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "html" | "pdf">("all")
  const [currentDirectory, setCurrentDirectory] = useState<string>("")
  const [showNewDirectoryForm, setShowNewDirectoryForm] = useState(false)
  const [newDirectoryName, setNewDirectoryName] = useState("")
  const [newFile, setNewFile] = useState({
    name: "",
    description: "",
    content: "",
    type: "html" as const,
    directory: "",
  })

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

  const handleFileUpload = () => {
    if (newFile.name && newFile.content) {
      const file: RobotFile = {
        id: Date.now().toString(),
        ...newFile,
        createdAt: new Date().toISOString().split("T")[0],
        size: `${Math.round(newFile.content.length / 1024)} KB`,
      }
      setFiles([...files, file])
      setNewFile({ name: "", description: "", content: "", type: "html", directory: "" })
    }
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
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Robot Archive</h1>
        <p className="text-slate-600">Organize your AI-generated content in custom directories</p>
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
                Directories
              </CardTitle>
              <Button size="sm" onClick={() => setShowNewDirectoryForm(!showNewDirectoryForm)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Directory
              </Button>
            </div>
            <CardDescription>Organize your files into custom directories</CardDescription>
          </CardHeader>
          <CardContent>
            {showNewDirectoryForm && (
              <div className="mb-4 p-4 border rounded-lg bg-slate-50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Directory name (e.g., Lifting, Food, Projects)"
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
                        <p className="text-sm text-slate-600">{dir.fileCount} files</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {directories.length === 0 && (
                <div className="col-span-full text-center py-8 text-slate-500">
                  <Folder className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No directories yet. Create your first directory to organize files.</p>
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
                  placeholder="Search files..."
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

      {/* Upload Section */}
      <Card className="mb-6 md:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Upload className="h-5 w-5" />
            Add New File
          </CardTitle>
          <CardDescription>Upload or paste your AI-generated content (HTML/PDF)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fileName">File Name</Label>
              <Input
                id="fileName"
                value={newFile.name}
                onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                placeholder="Enter file name"
              />
            </div>
            <div>
              <Label htmlFor="fileType">File Type</Label>
              <select
                id="fileType"
                value={newFile.type}
                onChange={(e) => setNewFile({ ...newFile, type: e.target.value as "html" | "pdf" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="html">HTML</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="directory">Directory</Label>
              <select
                id="directory"
                value={newFile.directory}
                onChange={(e) => setNewFile({ ...newFile, directory: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Root Directory</option>
                {directories.map((dir) => (
                  <option key={dir.path} value={dir.path}>
                    {dir.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newFile.description}
                onChange={(e) => setNewFile({ ...newFile, description: e.target.value })}
                placeholder="Brief description"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={newFile.content}
              onChange={(e) => setNewFile({ ...newFile, content: e.target.value })}
              placeholder="Paste your AI-generated content here"
              rows={6}
            />
          </div>
          <Button onClick={handleFileUpload} className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Add File
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
                    <span className="hidden sm:inline ml-2">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-600 mb-3">
                Size: {file.size} • Created: {file.createdAt}
                {file.directory && ` • Directory: ${file.directory}`}
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
            <h3 className="text-lg font-medium text-slate-900 mb-2">No files found</h3>
            <p className="text-slate-600">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : currentDirectory
                  ? `No files in the "${currentDirectory}" directory yet`
                  : "Upload your first AI-generated file to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
