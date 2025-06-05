"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Github, GitBranch, Upload, Download, RefreshCw, Settings } from "lucide-react"

export default function GitHubPage() {
  const [repoUrl, setRepoUrl] = useState("https://github.com/username/personal-website")
  const [isConnected, setIsConnected] = useState(true)
  const [lastSync, setLastSync] = useState("2024-01-15 14:30:00")

  const repoStats = {
    commits: 127,
    branches: 3,
    files: 45,
    size: "2.3 MB",
  }

  const recentFiles = [
    { name: "ai-generated-landing.html", path: "ai-files/", lastModified: "2024-01-15", size: "15 KB" },
    { name: "project-notes.html", path: "notes/", lastModified: "2024-01-14", size: "8 KB" },
    { name: "resume.pdf", path: "portfolio/", lastModified: "2024-01-12", size: "245 KB" },
    { name: "dashboard-template.html", path: "ai-files/", lastModified: "2024-01-10", size: "22 KB" },
  ]

  const handleSync = () => {
    setLastSync(new Date().toLocaleString())
    // Simulate sync process
  }

  const handleConnect = () => {
    setIsConnected(true)
    // Simulate GitHub connection
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">GitHub Integration</h1>
        <p className="text-slate-600">Manage your repository connection and sync files</p>
      </div>

      {/* Connection Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Repository Connection
          </CardTitle>
          <CardDescription>Connect your GitHub repository to automatically sync files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
            {isConnected && <span className="text-sm text-slate-600">Last sync: {lastSync}</span>}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="repoUrl">Repository URL</Label>
              <Input
                id="repoUrl"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {!isConnected ? (
              <Button onClick={handleConnect}>
                <Github className="h-4 w-4 mr-2" />
                Connect Repository
              </Button>
            ) : (
              <>
                <Button onClick={handleSync}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {isConnected && (
        <>
          {/* Repository Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{repoStats.commits}</div>
                <p className="text-xs text-slate-600">Total Commits</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{repoStats.branches}</div>
                <p className="text-xs text-slate-600">Branches</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{repoStats.files}</div>
                <p className="text-xs text-slate-600">Files</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{repoStats.size}</div>
                <p className="text-xs text-slate-600">Repository Size</p>
              </CardContent>
            </Card>
          </div>

          {/* File Management */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>File Management</CardTitle>
              <CardDescription>Upload files to your repository or download existing ones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
                <Button variant="outline">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Create Branch
                </Button>
              </div>

              {/* Recent Files */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Files</h3>
                <div className="space-y-2">
                  {recentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-slate-600">{file.path}</div>
                      </div>
                      <div className="text-right text-sm text-slate-600">
                        <div>{file.lastModified}</div>
                        <div>{file.size}</div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
