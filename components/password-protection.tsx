"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff, Smartphone, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PasswordProtectionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  title: string
  description: string
}

export function PasswordProtection({ open, onOpenChange, onSuccess, title, description }: PasswordProtectionProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [twoFactorCode, setTwoFactorCode] = useState("")
  const [is2FAEnrolled, setIs2FAEnrolled] = useState(false)
  const [is2FASetupMode, setIs2FASetupMode] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [setupCode, setSetupCode] = useState("")

  // In a real application, this would be handled securely on the server
  const UPLOAD_PASSWORD = "davis2024" // This should be stored securely

  useEffect(() => {
    // Check if 2FA is enrolled from localStorage
    const enrolled = localStorage.getItem("2fa_enrolled") === "true"
    setIs2FAEnrolled(enrolled)

    // Generate fake QR code and setup code for demonstration
    if (!enrolled) {
      // In a real app, this would be generated on the server
      const fakeSecret = "JBSWY3DPEHPK3PXP"
      setSetupCode(fakeSecret)

      // Create a proper QR code URL using a QR code service
      const qrData = `otpauth://totp/DavisTheTech:upload@davisthetech.com?secret=${fakeSecret}&issuer=DavisTheTech`
      const encodedData = encodeURIComponent(qrData)
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("")

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (password === UPLOAD_PASSWORD) {
      if (is2FAEnrolled) {
        // If 2FA is enrolled, we need to verify the code
        if (!twoFactorCode) {
          setError("Please enter your 2FA code")
          setIsVerifying(false)
          return
        }

        // In a real app, we would verify the 2FA code with the server
        // For demo purposes, we'll accept any 6-digit code
        if (twoFactorCode.length === 6 && /^\d+$/.test(twoFactorCode)) {
          onSuccess()
          setPassword("")
          setTwoFactorCode("")
          onOpenChange(false)
        } else {
          setError("Invalid 2FA code. Please try again.")
        }
      } else {
        // If 2FA is not enrolled, offer to set it up
        setIs2FASetupMode(true)
      }
    } else {
      setError("Incorrect password. Please try again.")
    }

    setIsVerifying(false)
  }

  const handleSetup2FA = () => {
    // In a real app, this would verify the setup code entered by the user
    // For demo purposes, we'll just accept any 6-digit code
    if (twoFactorCode.length === 6 && /^\d+$/.test(twoFactorCode)) {
      // Save 2FA enrollment status to localStorage
      localStorage.setItem("2fa_enrolled", "true")
      setIs2FAEnrolled(true)
      setIs2FASetupMode(false)

      // Proceed with success
      onSuccess()
      setPassword("")
      setTwoFactorCode("")
      onOpenChange(false)
    } else {
      setError("Invalid verification code. Please try again.")
    }
  }

  const handleSkip2FA = () => {
    // Allow user to skip 2FA setup
    onSuccess()
    setPassword("")
    onOpenChange(false)
  }

  const handleClose = () => {
    setPassword("")
    setTwoFactorCode("")
    setError("")
    setIs2FASetupMode(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-amber-600" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {!is2FASetupMode ? (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter upload password"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {is2FAEnrolled && (
              <div className="space-y-2">
                <Label htmlFor="twoFactorCode">Two-Factor Authentication Code</Label>
                <Input
                  id="twoFactorCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="Enter 6-digit code from authenticator app"
                  required
                />
              </div>
            )}

            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isVerifying || !password || (is2FAEnrolled && !twoFactorCode)}>
                {isVerifying ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Unlock Upload</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 py-4">
            <div className="bg-amber-50 p-3 rounded border border-amber-200">
              <h3 className="font-medium text-amber-800 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Two-Factor Authentication Setup
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                For enhanced security, we recommend setting up two-factor authentication for file uploads.
              </p>
            </div>

            <Tabs defaultValue="scan">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>
              <TabsContent value="scan" className="space-y-4">
                <div className="flex justify-center py-4">
                  <div className="border rounded p-2 bg-white">
                    <img
                      src={qrCodeUrl || "/placeholder.svg"}
                      alt="2FA Setup QR Code"
                      width={200}
                      height={200}
                      className="block"
                      onError={(e) => {
                        // Fallback if QR service fails
                        e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                      }}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-600 text-center">
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </p>
              </TabsContent>
              <TabsContent value="manual" className="space-y-4">
                <div className="bg-slate-50 p-4 rounded text-center">
                  <p className="text-sm text-slate-600 mb-2">Enter this code in your authenticator app:</p>
                  <p className="font-mono text-lg tracking-wide bg-white p-2 rounded border">{setupCode}</p>
                </div>
                <p className="text-sm text-slate-600 text-center">
                  Open your authenticator app and enter the code manually if you can't scan the QR code.
                </p>
              </TabsContent>
            </Tabs>

            <div className="space-y-2 pt-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Enter 6-digit code from authenticator app"
              />
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

            <div className="flex justify-between gap-2 pt-2">
              <Button type="button" variant="outline" onClick={handleSkip2FA}>
                Skip for Now
              </Button>
              <Button onClick={handleSetup2FA} disabled={twoFactorCode.length !== 6}>
                <Check className="h-4 w-4 mr-2" />
                Verify and Enable 2FA
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
          <strong>Security Notice:</strong> Upload access is restricted to authorized users only. Contact the site
          administrator if you need upload permissions.
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PasswordProtection
