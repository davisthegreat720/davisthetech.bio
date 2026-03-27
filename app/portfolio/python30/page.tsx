"use client"

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Python30Course } from "@/components/python30-course"

export default function Python30Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Navigation />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/portfolio">
            <Button variant="ghost" className="mb-4 font-mono">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-mono">Python30 - IT Fundamentals</h2>
          <p className="text-gray-600 font-mono text-sm sm:text-base max-w-3xl">
            A comprehensive 30-day Python curriculum designed specifically for IT professionals. 
            Master Python scripting, automation, APIs, and real-world integration skills essential 
            for modern IT environments.
          </p>
        </div>

        <Python30Course />

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4 font-mono">Ready to Start Learning?</h3>
          <p className="text-gray-600 mb-6 font-mono text-sm sm:text-base">
            Connect with me to discuss this curriculum or explore training opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <a href="mailto:davis072087@gmail.com" className="font-mono">
                Contact Me
              </a>
            </Button>
            <Link href="/portfolio">
              <Button className="font-mono">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
