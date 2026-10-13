import { Navigation } from "@/components/navigation"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const project = {
  title: "Package-Free Patch Management in Jamf Pro",
  description:
    "A Jamf Pro design that keeps Google Chrome, ChatGPT, Codex, Slack, and Wispr Flow current on 100 Macs without managing installer packages. Includes the rollout plan, user messaging, reporting, a 73-row configuration worksheet, and the scripts.",
  technologies: ["Jamf Pro", "Installomator", "swiftDialog", "zsh", "Smart Groups", "Extension Attributes"],
  category: "Endpoint Management",
  link: "/portfolio/jamf-package-free",
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-nb-surface">
      <Navigation />

      <main className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-8 sm:px-6 lg:py-12">
        <header className="flex flex-col gap-3">
          <p className="font-mono text-nb-xs font-bold uppercase tracking-[0.12em]">
            <span className="inline-block border-2 border-nb-text bg-nb-primary px-2 py-1">Portfolio</span>
          </p>
          <h1 className="text-nb-2xl font-extrabold tracking-tight sm:text-[48px] sm:leading-[1.05]">Case studies</h1>
        </header>

        <Link href={project.link} className="group block">
          <article className="flex flex-col gap-4 border-[3px] border-nb-text bg-nb-primary p-5 shadow-nb-lg transition-transform group-hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <span className="border-2 border-nb-text bg-white px-2 py-0.5 font-mono text-nb-xs font-semibold">
                {project.category}
              </span>
              <span className="border-2 border-nb-text bg-nb-secondary px-2 py-0.5 font-mono text-nb-xs font-semibold text-white">
                Case study
              </span>
            </div>
            <h2 className="text-nb-xl font-extrabold leading-tight">{project.title}</h2>
            <p className="text-nb-sm">{project.description}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.map((t) => (
                <li key={t} className="border-2 border-nb-text bg-nb-surface px-2 py-0.5 font-mono text-nb-xs">
                  {t}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-2 font-mono text-nb-sm font-bold group-hover:underline">
              View project <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </article>
        </Link>
      </main>
    </div>
  )
}
