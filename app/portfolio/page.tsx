import { Navigation } from "@/components/navigation"
import { NbJumpNav } from "@/components/nb-jump-nav"
import { projects, projectNum, type Project, type Status } from "@/lib/projects"
import { ArrowRight, ExternalLink, GitCommitHorizontal } from "lucide-react"
import Link from "next/link"

const STATUS: Record<Status, { label: string; swatch: string }> = {
  complete: { label: "Complete", swatch: "bg-nb-success" },
  "in-progress": { label: "In progress", swatch: "bg-nb-warning" },
}

const ACCENT = {
  primary: "bg-nb-primary text-nb-text",
  secondary: "bg-nb-secondary text-white",
}

// One CTA style everywhere (Law of Similarity); 48px tall (Fitts's Law).
// The ::after layer stretches the link over the whole card, so the card is one large
// target with a single tab stop.
const ctaClass =
  "relative inline-flex min-h-[48px] items-center gap-2 border-2 border-nb-text bg-nb-primary px-5 text-nb-sm font-bold text-nb-text shadow-nb transition-transform after:absolute after:-inset-[2000px] after:content-[''] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-nb-lg active:translate-x-0 active:translate-y-0 active:shadow-none"

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Chicago" })

function ProjectRow({ p, index }: { p: Project; index: number }) {
  const status = STATUS[p.status]

  return (
    <article
      id={p.id}
      aria-labelledby={`${p.id}-title`}
      className="group relative flex scroll-mt-28 flex-col overflow-hidden border-[3px] border-nb-text bg-white shadow-nb-lg transition-transform focus-within:-translate-y-1 hover:-translate-y-1 md:flex-row"
    >
      {/* Index block: number + category grouped (Law of Proximity) */}
      <div
        className={`flex items-center justify-between gap-4 border-b-[3px] border-nb-text px-5 py-4 md:w-44 md:shrink-0 md:flex-col md:items-start md:border-b-0 md:border-r-[3px] md:py-6 ${ACCENT[p.accent]}`}
      >
        <span aria-hidden className="font-mono text-nb-2xl font-extrabold leading-none md:text-[56px]">
          {projectNum(index)}
        </span>
        <span className="font-mono text-nb-xs font-bold uppercase tracking-[0.12em]">{p.category}</span>
      </div>

      {/* Body: status → title → summary → facts → stack → freshness → action */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 md:p-6">
        <span className="inline-flex w-fit items-center gap-2 border-2 border-nb-text bg-nb-surface px-2 py-0.5 font-mono text-nb-xs font-semibold">
          <span aria-hidden className={`h-2.5 w-2.5 border-2 border-nb-text ${status.swatch}`} />
          {status.label}
        </span>

        <h2 id={`${p.id}-title`} className="text-nb-xl font-extrabold leading-tight sm:text-nb-2xl">
          {p.title}
        </h2>

        <p className="max-w-3xl text-nb-base">{p.description}</p>

        {/* Three figures, chunked (Miller's Law) */}
        <dl className="grid grid-cols-3 border-2 border-nb-text bg-white sm:w-fit">
          {p.stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-0.5 px-4 py-2 ${i > 0 ? "border-l-2 border-nb-text" : ""}`}>
              <dt className="order-2 font-mono text-nb-xs">{s.label}</dt>
              <dd className="order-1 text-nb-lg font-extrabold leading-none">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {p.technologies.map((t) => (
            <li key={t} className="border-2 border-nb-text bg-nb-surface px-2 py-0.5 font-mono text-nb-xs">
              {t}
            </li>
          ))}
        </ul>

        {p.commit && (
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-l-[3px] border-nb-secondary pl-3 font-mono text-nb-xs">
            <GitCommitHorizontal className="h-4 w-4 shrink-0" aria-hidden />
            <span className="font-bold">Latest commit</span>
            <span>{fmtDate(p.commit.date)}</span>
            <span aria-hidden>·</span>
            <span className="break-words">{p.commit.message}</span>
            <span className="text-nb-secondary">{p.commit.sha}</span>
          </p>
        )}

        <div className="pt-1">
          {p.external ? (
            <a href={p.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
              {p.cta} <ExternalLink className="h-4 w-4" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <Link href={p.href} className={ctaClass}>
              {p.cta} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-nb-surface">
      <Navigation />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-12">
        <header className="flex flex-col gap-3">
          <p className="font-mono text-nb-xs font-bold uppercase tracking-[0.12em]">
            <span className="inline-block border-2 border-nb-text bg-nb-primary px-2 py-1">Portfolio</span>
          </p>
          <h1 className="text-nb-2xl font-extrabold tracking-tight sm:text-[48px] sm:leading-[1.05]">Projects</h1>
        </header>

        <NbJumpNav
          label="Projects"
          items={projects.map((p, i) => ({ id: p.id, label: p.title, num: projectNum(i) }))}
        />

        <ol className="flex flex-col gap-8" aria-label="Project list">
          {projects.map((p, i) => (
            <li key={p.id}>
              <ProjectRow p={p} index={i} />
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
