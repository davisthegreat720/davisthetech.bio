"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, File, X, Check } from "lucide-react"

interface FileUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFileUpload: (file: {
    name: string
    description: string
    content: string
    type: "html" | "pdf" | "text"
    directory: string
  }) => void
  directories: { name: string; path: string }[]
  currentDirectory: string
}

export function FileUploadDialog({
  open,
  onOpenChange,
  onFileUpload,
  directories,
  currentDirectory,
}: FileUploadDialogProps) {
  const [fileName, setFileName] = useState("")
  const [fileDescription, setFileDescription] = useState("")
  const [fileContent, setFileContent] = useState("")
  const [fileType, setFileType] = useState<"html" | "pdf" | "text">("html")
  const [fileDirectory, setFileDirectory] = useState(currentDirectory)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadedFile(file)
      setFileName(file.name.split(".")[0] || "")

      // Determine file type
      const extension = file.name.split(".").pop()?.toLowerCase() || ""
      if (extension === "pdf") {
        setFileType("pdf")
      } else if (["html", "htm"].includes(extension)) {
        setFileType("html")
      } else {
        setFileType("text")
      }

      // Read file content
      const reader = new FileReader()
      reader.onload = async (event) => {
        if (event.target?.result) {
          setFileContent(event.target.result as string)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = () => {
    if (!fileName) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      onFileUpload({
        name: fileName,
        description: fileDescription,
        content: fileContent,
        type: fileType,
        directory: fileDirectory,
      })

      setUploadSuccess(true)

      // Reset form and close dialog after success
      setTimeout(() => {
        setIsUploading(false)
        setUploadSuccess(false)
        setFileName("")
        setFileDescription("")
        setFileContent("")
        setUploadedFile(null)
        onOpenChange(false)
      }, 1500)
    }, 1000)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>Upload HTML, PDF, or text files to your collection</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {!uploadedFile ? (
            <div
              className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={triggerFileInput}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".html,.htm,.pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-1">Click to select a file or drag and drop</p>
              <p className="text-sm text-slate-400">HTML, PDF, or text files</p>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <File className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-slate-500">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setUploadedFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fileName">File Name</Label>
              <Input
                id="fileName"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileType">File Type</Label>
              <select
                id="fileType"
                value={fileType}
                onChange={(e) => setFileType(e.target.value as "html" | "pdf" | "text")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="html">HTML</option>
                <option value="pdf">PDF</option>
                <option value="text">Text</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileDirectory">Directory</Label>
            <select
              id="fileDirectory"
              value={fileDirectory}
              onChange={(e) => setFileDirectory(e.target.value)}
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

          <div className="space-y-2">
            <Label htmlFor="fileDescription">Description</Label>
            <Textarea
              id="fileDescription"
              value={fileDescription}
              onChange={(e) => setFileDescription(e.target.value)}
              placeholder="Enter a brief description of this file"
              rows={2}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!fileName || isUploading || uploadSuccess} className="min-w-[100px]">
            {isUploading ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                <span>Uploading...</span>
              </div>
            ) : uploadSuccess ? (
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2" />
                <span>Uploaded!</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                <span>Upload</span>
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FileUploadDialog
