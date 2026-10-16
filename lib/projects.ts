import henley from "@/data/henley-rag.json"

export type Status = "complete" | "in-progress" | "ongoing"

export type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  status: Status
  stats: { value: string; label: string }[]
  cta: string
  href: string
  external?: boolean
  accent: "primary" | "secondary"
  /** Latest commit, filled at build time for repos that rebuild on push */
  commit?: { sha: string; message: string; date: string; url: string }
}

const plural = (n: number, one: string, many: string) => `${n === 1 ? one : many}`

// Within each status group, order by importance (Serial Position Effect).
// The list is sorted below so every "in-progress" project appears before "complete" ones.
const projectList: Project[] = [
  {
    id: "jamf-package-free",
    title: "Package-Free Patch Management in Jamf Pro",
    description:
      "A Jamf Pro design that keeps Google Chrome, ChatGPT, Codex, Slack, and Wispr Flow current on 100 Macs without managing installer packages. Includes the rollout plan, user messaging, reporting, the configuration worksheet, and the scripts.",
    technologies: ["Jamf Pro", "Installomator", "swiftDialog", "zsh", "Smart Groups", "Extension Attributes"],
    category: "Endpoint Management",
    status: "complete",
    stats: [
      { value: "5", label: "apps" },
      { value: "73", label: "Jamf objects" },
      { value: "4", label: "scripts" },
    ],
    cta: "Read the case study",
    href: "/portfolio/jamf-package-free",
    accent: "primary",
  },
  {
    id: "henley-rag",
    title: "Henley RAG",
    description:
      "Foundation for a local RAG system for house documentation. FastAPI, PostgreSQL, and Qdrant run in Docker Compose with health checks for each service and a local Ollama instance. A Dropbox connector discovers documents and registers their metadata in PostgreSQL.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Qdrant", "Dropbox API", "Docker Compose"],
    category: "AI / Self-hosted",
    status: "in-progress",
    // Values come from data/henley-rag.json, regenerated on every build (scripts/sync-repo-data.mjs)
    stats: [
      {
        value: String(henley.stats.composeServices),
        label: plural(henley.stats.composeServices, "Compose service", "Compose services"),
      },
      {
        value: String(henley.stats.sourceConnectors),
        label: plural(henley.stats.sourceConnectors, "source connector", "source connectors"),
      },
      {
        value: String(henley.stats.apiEndpoints),
        label: plural(henley.stats.apiEndpoints, "API endpoint", "API endpoints"),
      },
    ],
    cta: "View on GitHub",
    href: "https://github.com/davisthegreat720/henley-rag",
    external: true,
    accent: "secondary",
    commit: henley.commit,
  },
  {
    id: "davisthetech-bio",
    title: "davisthetech.bio",
    description:
      "This site shows how I work with v0, Vercel, Git, and Claude. It is a collaboration between the robots & I that I use to build my skills in Next.js, TypeScript, React, Git, and security practices. I use Claude for design, applying UI and UX skills, and to learn code by troubleshooting this site and the other projects listed. v0 generates code changes, Vercel builds and hosts the site, and Git and GitHub handle version control for this site and the other projects listed.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Claude", "Vercel", "GitHub", "v0", "Git"],
    category: "Web / AI-assisted",
    status: "ongoing",
    stats: [
      { value: "16", label: "Next.js" },
      { value: "19", label: "React" },
      { value: "9", label: "pages" },
    ],
    cta: "View on GitHub",
    href: "https://github.com/davisthegreat720/davisthetech.bio",
    external: true,
    accent: "primary",
  },
]

// Status order for display: in-progress first, then ongoing, then complete.
// Array.prototype.sort is stable, so projects keep their order inside each group.
const STATUS_ORDER: Record<Status, number> = { "in-progress": 0, "complete": 1, "ongoing": 2 }

export const projects: Project[] = [...projectList].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])

export const projectNum = (i: number) => String(i + 1).padStart(2, "0")
