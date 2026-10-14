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

// Ordered by importance (Serial Position Effect): flagship case study first.
export const projects: Project[] = [
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
]

export const projectNum = (i: number) => String(i + 1).padStart(2, "0")
