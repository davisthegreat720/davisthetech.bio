"use client"

import dynamic from "next/dynamic"

export const PasswordProtection = dynamic(() => import("./password-protection").then((mod) => mod.PasswordProtection), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  ),
})
