"use client"

import { useState } from "react"
import { ChevronDown, Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

// Curriculum data
const curriculum = [
  {
    week: 1,
    title: "Python Foundations",
    tag: "SYNTAX & BASICS",
    days: [
      { day: 1, title: "Your First Python Script", topic: "SETUP" },
      { day: 2, title: "Variables & Data Types", topic: "VARIABLES" },
      { day: 3, title: "String Manipulation", topic: "STRINGS" },
      { day: 4, title: "Lists & Loops", topic: "LISTS + FOR" },
      { day: 5, title: "Conditionals (if/else)", topic: "LOGIC" },
      { day: 6, title: "Dictionaries", topic: "DICTS" },
      { day: 7, title: "Functions", topic: "FUNCTIONS" },
    ],
  },
  {
    week: 2,
    title: "Scripting for IT",
    tag: "FILE I/O + CLI",
    days: [
      { day: 8, title: "Reading Text Files", topic: "FILE READ" },
      { day: 9, title: "Writing Files & Logging", topic: "FILE WRITE" },
      { day: 10, title: "CSV Processing", topic: "CSV" },
      { day: 11, title: "Working with Paths", topic: "PATHLIB" },
      { day: 12, title: "Date & Time", topic: "DATETIME" },
      { day: 13, title: "Command-Line Arguments", topic: "ARGPARSE" },
      { day: 14, title: "Error Handling", topic: "TRY/EXCEPT" },
    ],
  },
  {
    week: 3,
    title: "Data & APIs",
    tag: "JSON + HTTP",
    days: [
      { day: 15, title: "JSON Deep Dive", topic: "JSON" },
      { day: 16, title: "HTTP Requests Basics", topic: "REQUESTS" },
      { day: 17, title: "Parsing API Responses", topic: "API PARSE" },
      { day: 18, title: "Building API Calls", topic: "API BUILD" },
      { day: 19, title: "Automating Reports", topic: "AUTOMATION" },
      { day: 20, title: "Data Filtering & Sorting", topic: "DATA OPS" },
      { day: 21, title: "Mini Dashboard", topic: "DASHBOARD" },
    ],
  },
  {
    week: 4,
    title: "Integration & Capstone",
    tag: "REAL TOOLS",
    days: [
      { day: 22, title: "Environment Variables", topic: "ENV" },
      { day: 23, title: "Virtual Environments", topic: "VENV" },
      { day: 24, title: "Subprocess & Shell", topic: "SHELL" },
      { day: 25, title: "SQLite Basics", topic: "DATABASE" },
      { day: 26, title: "Config Files", topic: "CONFIG" },
      { day: 27, title: "Scheduling Scripts", topic: "CRON" },
      { day: 28, title: "Capstone: Asset Tracker", topic: "CAPSTONE" },
      { day: 29, title: "Capstone: Polish & Test", topic: "POLISH" },
      { day: 30, title: "Review & Next Steps", topic: "WRAP-UP" },
    ],
  },
]

interface DayCardProps {
  day: number
  title: string
  topic: string
  isCompleted: boolean
  onToggleComplete: () => void
}

function DayCard({ day, title, topic, isCompleted, onToggleComplete }: DayCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={cn(
        "bg-[#161d2e] border border-[#1e2d47] rounded overflow-hidden transition-colors",
        isOpen && "border-[#00d4aa]/40",
        isCompleted && "border-l-[3px] border-l-[#10b981]"
      )}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleComplete()
          }}
          className={cn(
            "w-5 h-5 border-2 border-[#1e2d47] rounded flex items-center justify-center flex-shrink-0 transition-all text-xs",
            isCompleted && "bg-[#10b981] border-[#10b981] text-white"
          )}
        >
          {isCompleted && <Check className="w-3 h-3" />}
        </button>
        <span className="font-mono text-[11px] text-[#64748b] min-w-[48px] tracking-wide">
          DAY {String(day).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[15px] font-semibold text-[#e2e8f0]">{title}</span>
        <span className="font-mono text-[10px] text-[#64748b] bg-[#111827] px-2 py-1 rounded">
          {topic}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#64748b] transition-transform ml-1",
            isOpen && "rotate-180"
          )}
        />
      </div>
      {isOpen && (
        <div className="border-t border-[#1e2d47] px-4 py-4 animate-in fade-in duration-200">
          <p className="text-[13px] text-[#94a3b8] leading-relaxed">
            Complete interactive lessons and build real IT tools with Python. Each day includes
            step-by-step tutorials, code examples, and hands-on projects.
          </p>
          <button
            onClick={onToggleComplete}
            className={cn(
              "mt-4 px-4 py-2 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] font-mono text-[11px] tracking-wide rounded transition-colors hover:bg-[#10b981]/20",
              isCompleted && "opacity-50"
            )}
          >
            {isCompleted ? "COMPLETED" : "MARK COMPLETE"}
          </button>
        </div>
      )}
    </div>
  )
}

export function Python30Course() {
  const [completedDays, setCompletedDays] = useState<number[]>([])

  const toggleDay = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const totalDays = 30
  const completedCount = completedDays.length
  const progressPercent = (completedCount / totalDays) * 100

  const getWeekTagClass = (week: number) => {
    switch (week) {
      case 1:
        return "bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20"
      case 2:
        return "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20"
      case 3:
        return "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20"
      case 4:
        return "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20"
      default:
        return ""
    }
  }

  return (
    <div className="bg-[#0a0e1a] rounded-lg overflow-hidden relative">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[#00d4aa] font-mono text-[11px] tracking-[3px] px-4 py-1.5 rounded-sm mb-5 uppercase">
            // IT Professional Track
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            <span className="text-[#00d4aa]">Python</span>
            <span className="text-[#f59e0b]">30</span>
          </h2>
          <p className="text-[#64748b] text-[15px] max-w-md mx-auto leading-relaxed">
            30 days of Python fundamentals built around real IT work. Every day includes
            step-by-step lessons, annotated code, and a hands-on mini project.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-[#111827] border border-[#1e2d47] rounded p-5 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[12px] text-[#64748b] tracking-wide">
              // COURSE PROGRESS
            </span>
            <span className="font-mono text-[12px] text-[#00d4aa]">
              {completedCount} / {totalDays} days complete
            </span>
          </div>
          <div className="h-1 bg-[#1e2d47] rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d4aa] to-[#3b82f6] rounded transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Curriculum */}
        <div className="space-y-8">
          {curriculum.map((week) => (
            <div key={week.week}>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[11px] text-[#64748b] tracking-[2px] uppercase whitespace-nowrap">
                  Week {week.week}
                </span>
                <span className="text-lg font-bold text-[#e2e8f0]">{week.title}</span>
                <div className="flex-1 h-px bg-[#1e2d47]" />
                <span
                  className={cn(
                    "font-mono text-[10px] px-2.5 py-1 rounded tracking-wide whitespace-nowrap",
                    getWeekTagClass(week.week)
                  )}
                >
                  {week.tag}
                </span>
              </div>
              <div className="space-y-2">
                {week.days.map((day) => (
                  <DayCard
                    key={day.day}
                    day={day.day}
                    title={day.title}
                    topic={day.topic}
                    isCompleted={completedDays.includes(day.day)}
                    onToggleComplete={() => toggleDay(day.day)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
