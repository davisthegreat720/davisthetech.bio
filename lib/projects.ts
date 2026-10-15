import henley from "@/data/henley-rag.json"

export type Status = "complete" | "in-progress"

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
      "This site. Built with v0, then maintained with Claude and deployed on Vercel. Claude handles code changes, security review, and dependency upgrades (Next.js 14 to 16, React 18 to 19). Changes reach main only through pull requests under a GitHub branch ruleset, and every pull request gets a Vercel preview build before merge.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Claude", "Vercel", "GitHub"],
    category: "Web / AI-assisted",
    status: "in-progress",
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

// Status order for display: in-progress first, then complete.
// Array.prototype.sort is stable, so projects keep their order inside each group.
const STATUS_ORDER: Record<Status, number> = { "in-progress": 0, complete: 1 }

export const projects: Project[] = [...projectList].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])

export const projectNum = (i: number) => String(i + 1).padStart(2, "0")
