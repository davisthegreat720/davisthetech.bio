import { readFileSync } from "node:fs"
import path from "node:path"

export type LabeledItem = { label: string; details: string }

export type Role = {
  title: string
  company: string
  location: string
  dates: string
  bullets: string[]
}

export type Resume = {
  name: string
  contact: Record<string, string>
  summary: string
  skills: LabeledItem[]
  experience: Role[]
  programs: LabeledItem[]
  education: string[]
  certifications: string[]
}

const RESUME_PATH = path.join(process.cwd(), "content", "resume.md")

function toLabeled(line: string): LabeledItem {
  const idx = line.indexOf(":")
  if (idx === -1) return { label: "", details: line }
  return { label: line.slice(0, idx).trim(), details: line.slice(idx + 1).trim() }
}

export function getResume(): Resume {
  const raw = readFileSync(RESUME_PATH, "utf8").replace(/<!--[\s\S]*?-->/g, "")

  const resume: Resume = {
    name: "",
    contact: {},
    summary: "",
    skills: [],
    experience: [],
    programs: [],
    education: [],
    certifications: [],
  }

  let section = ""
  const summaryLines: string[] = []

  for (const rawLine of raw.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line) continue

    if (line.startsWith("### ")) {
      const [title = "", company = "", location = "", dates = ""] = line
        .slice(4)
        .split("|")
        .map((part) => part.trim())
      resume.experience.push({ title, company, location, dates, bullets: [] })
      continue
    }
    if (line.startsWith("## ")) {
      section = line.slice(3).trim().toLowerCase()
      continue
    }
    if (line.startsWith("# ")) {
      resume.name = line.slice(2).trim()
      continue
    }

    const bullet = line.startsWith("- ") ? line.slice(2).trim() : null

    switch (section) {
      case "":
        {
          const match = line.match(/^([a-z]+):\s*(.+)$/i)
          if (match) resume.contact[match[1].toLowerCase()] = match[2].trim()
        }
        break
      case "summary":
        summaryLines.push(line)
        break
      case "skills":
        if (bullet) resume.skills.push(toLabeled(bullet))
        break
      case "programs":
        if (bullet) resume.programs.push(toLabeled(bullet))
        break
      case "experience": {
        const current = resume.experience.at(-1)
        if (bullet && current) current.bullets.push(bullet)
        break
      }
      case "education":
        if (bullet) resume.education.push(bullet)
        break
      case "certifications":
        if (bullet) resume.certifications.push(bullet)
        break
    }
  }

  resume.summary = summaryLines.join(" ")
  return resume
}
