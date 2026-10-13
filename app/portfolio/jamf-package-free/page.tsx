import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ExternalLink, FileCode2, FileText, Table2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import content from "./content.json"
import worksheet from "./worksheet.json"
import { Worksheet } from "./worksheet"

export const metadata: Metadata = {
  title: "Jamf Pro Package-Free Patch Management | Danielle Davis",
  description:
    "Case study: a Jamf Pro design that keeps Google Chrome, ChatGPT, Codex, Slack, and Wispr Flow current with Installomator and swiftDialog, without managing installer packages.",
}

const REPO = "https://github.com/davisthegreat720/davisthetech.bio"
const FOLDER = `${REPO}/tree/main/case-studies/jamf-package-free`
const FILE = (p: string) => `${REPO}/blob/main/case-studies/jamf-package-free/${p}`

type Body = { type: string; html: string }
type Card = { title: string | null; body: Body[] }
type Block =
  | { type: "heading"; text: string; lead?: string | null }
  | { type: "cards"; cards: Card[]; flex: number[] }
  | { type: "sources"; items: string[] }
type Section = { id: string; title: string; hero: string | null; blocks: Block[] }

const sections = content as Section[]

const scripts = [
  {
    file: "scripts/HillmanPackageFree_UpdatorFinal.sh",
    kind: "Policy script",
    summary:
      "Wrapper that runs Installomator for one app per policy. Jamf parameters $4 to $9 set the label, app name, path, process, deferral profile (standard or executive), and DEBUG mode. Updates installed apps only, runs silently when the app is closed, and uses swiftDialog with a staged deferral when it is open. No force-quit.",
  },
  {
    file: "scripts/Deploy-swiftDialog.sh",
    kind: "Policy script",
    summary: "Installs or updates swiftDialog through the approved local Installomator instance and verifies the binary afterward.",
  },
  {
    file: "scripts/EA-Installomator-SHA256.sh",
    kind: "Extension Attribute",
    summary: "Reports the SHA-256 hash of the installed Installomator script, or Not Installed / Unknown.",
  },
  {
    file: "scripts/EA-WisprFlow-Version.sh",
    kind: "Extension Attribute",
    summary: "Returns the latest Wispr Flow version from the vendor's latest-release redirect, used as the inventory-based fallback for reporting.",
  },
  {
    file: "logs/Exec24message.txt",
    kind: "Test log",
    summary: "Log from a Google Chrome test run at the executive 24-hour stage where the user selected Defer.",
  },
]

const brief = [
  "100 company-owned Apple silicon Macs in Jamf Pro",
  "Keep Google Chrome, ChatGPT, Codex, Slack, and Wispr Flow on the vendor's latest stable release",
  "No packages stored or managed in Jamf Pro, and no Jamf App Installers",
  "Never install an app on a Mac where it is not already present",
  "Executive Macs get an extra 48-hour deferral; Conference Room Macs get no automatic updates",
  "At least 95% compliance per app within 7 days",
]

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-nb-xs font-bold uppercase tracking-[0.12em] text-nb-text">
      <span className="inline-block border-2 border-nb-text bg-nb-primary px-2 py-1">{children}</span>
    </p>
  )
}

function CardView({ card, weight }: { card: Card; weight: number }) {
  return (
    <article
      className={`flex min-w-0 flex-col gap-3 border-2 border-nb-text bg-white p-4 shadow-nb ${
        weight ? "lg:[flex:var(--w)_1_0%]" : ""
      }`}
      style={weight ? { ["--w" as string]: weight } : undefined}
    >
      {card.title && <h4 className="text-nb-base font-bold leading-snug text-nb-text">{card.title}</h4>}
      {card.body.map((b, i) =>
        b.type === "table" ? (
          <div key={i} className="nb-prose overflow-x-auto">
            <table dangerouslySetInnerHTML={{ __html: b.html }} />
          </div>
        ) : (
          <p key={i} className="nb-prose text-nb-sm text-nb-text" dangerouslySetInnerHTML={{ __html: b.html }} />
        ),
      )}
    </article>
  )
}

function SectionView({ s, index }: { s: Section; index: number }) {
  return (
    <section id={s.id} className="scroll-mt-6 border-t-[3px] border-nb-text pt-8">
      <div className="mb-6 flex items-baseline gap-3">
        <span className="font-mono text-nb-sm font-bold text-nb-secondary">0{index + 1}</span>
        <h2 className="text-nb-xl font-extrabold tracking-tight text-nb-text sm:text-nb-2xl">{s.title}</h2>
      </div>
      {s.hero && (
        <p
          className="nb-prose mb-8 border-[3px] border-nb-text bg-nb-primary p-6 text-nb-lg font-semibold text-nb-text shadow-nb-lg"
          dangerouslySetInnerHTML={{ __html: s.hero }}
        />
      )}
      <div className="flex flex-col gap-6">
        {s.blocks.map((b, i) => {
          if (b.type === "heading")
            return (
              <div key={i} className="mt-2 flex flex-col gap-2">
                <Kicker>{b.text}</Kicker>
                {b.lead && (
                  <p className="nb-prose text-nb-sm font-semibold" dangerouslySetInnerHTML={{ __html: b.lead }} />
                )}
              </div>
            )
          if (b.type === "cards") {
            // Rows of 4+ cards wrap into a grid so tables and long text stay readable on the web.
            const many = b.cards.length >= 4
            return (
              <div
                key={i}
                className={
                  many
                    ? `grid gap-4 md:grid-cols-2 ${b.cards.length >= 5 ? "xl:grid-cols-3" : ""}`
                    : "flex flex-col gap-4 lg:flex-row lg:items-stretch"
                }
              >
                {b.cards.map((c, j) => (
                  <CardView key={j} card={c} weight={many ? 0 : (b.flex[j] ?? 1)} />
                ))}
              </div>
            )
          }
          return (
            <ol key={i} className="nb-prose grid gap-2 border-2 border-nb-text bg-white p-4 text-nb-xs md:grid-cols-2">
              {b.items.map((it, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: it }} />
              ))}
            </ol>
          )
        })}
      </div>
    </section>
  )
}

export default function JamfPackageFreePage() {
  return (
    <div className="min-h-screen bg-nb-surface">
      <Navigation />

      <main className="mx-auto flex max-w-[1280px] flex-col gap-12 px-4 py-8 sm:px-6 lg:py-12">
        <Link
          href="/portfolio"
          className="inline-flex w-fit items-center gap-2 border-2 border-nb-text bg-white px-3 py-2 text-nb-sm font-semibold shadow-nb-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Portfolio
        </Link>

        {/* Header */}
        <header className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-4">
            <Kicker>Case study · Jamf Pro · macOS</Kicker>
            <h1 className="text-nb-2xl font-extrabold leading-[1.05] tracking-tight text-nb-text sm:text-[48px]">
              Package-Free Patch Management in Jamf Pro
            </h1>
            <p className="text-nb-base text-nb-text">
              A Jamf administrator take-home exercise, written for the admin who would build and support it. The design
              uses Installomator for vendor-verified updates, swiftDialog for user messaging, and Patch Management or
              Extension Attribute data for Smart Group scoping. Company name: Hillman Inc (fictional).
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={FOLDER}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-nb-text bg-nb-primary px-4 py-2 text-nb-sm font-bold shadow-nb transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                <FileCode2 className="h-4 w-4" aria-hidden /> Scripts on GitHub
              </a>
              <a
                href="#worksheet"
                className="inline-flex items-center gap-2 border-2 border-nb-text bg-white px-4 py-2 text-nb-sm font-bold shadow-nb transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                <Table2 className="h-4 w-4" aria-hidden /> Configuration worksheet
              </a>
            </div>
          </div>
          <aside className="border-[3px] border-nb-text bg-white p-5 shadow-nb-lg">
            <h2 className="mb-3 font-mono text-nb-xs font-bold uppercase tracking-[0.12em]">The brief</h2>
            <ul className="flex flex-col gap-2 text-nb-sm">
              {brief.map((b) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 bg-nb-secondary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </aside>
        </header>

        {/* Jump links */}
        <nav aria-label="Case study sections" className="flex flex-wrap gap-2">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="border-2 border-nb-text bg-white px-3 py-1.5 font-mono text-nb-xs font-semibold hover:bg-nb-primary"
            >
              0{i + 1} {s.title}
            </a>
          ))}
          <a
            href="#worksheet"
            className="border-2 border-nb-text bg-white px-3 py-1.5 font-mono text-nb-xs font-semibold hover:bg-nb-primary"
          >
            0{sections.length + 1} Configuration Worksheet
          </a>
          <a
            href="#scripts"
            className="border-2 border-nb-text bg-white px-3 py-1.5 font-mono text-nb-xs font-semibold hover:bg-nb-primary"
          >
            0{sections.length + 2} Scripts
          </a>
        </nav>

        {sections.map((s, i) => (
          <SectionView key={s.id} s={s} index={i} />
        ))}

        {/* Worksheet */}
        <section id="worksheet" className="scroll-mt-6 border-t-[3px] border-nb-text pt-8">
          <div className="mb-6 flex items-baseline gap-3">
            <span className="font-mono text-nb-sm font-bold text-nb-secondary">0{sections.length + 1}</span>
            <h2 className="text-nb-xl font-extrabold tracking-tight sm:text-nb-2xl">Configuration Worksheet</h2>
          </div>
          <p className="mb-4 text-nb-sm">
            One row per Jamf object created, changed, disabled, or reused. Item numbers match the references above.{" "}
            <a
              className="font-semibold text-nb-secondary underline underline-offset-2 hover:bg-nb-primary hover:text-nb-text"
              href={FILE("configuration-worksheet.csv")}
              target="_blank"
              rel="noopener noreferrer"
            >
              CSV on GitHub
            </a>
          </p>
          <Worksheet headers={worksheet.headers} rows={worksheet.rows} />
        </section>

        {/* Scripts */}
        <section id="scripts" className="scroll-mt-6 border-t-[3px] border-nb-text pt-8">
          <div className="mb-6 flex items-baseline gap-3">
            <span className="font-mono text-nb-sm font-bold text-nb-secondary">0{sections.length + 2}</span>
            <h2 className="text-nb-xl font-extrabold tracking-tight sm:text-nb-2xl">Scripts</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {scripts.map((s) => (
              <a
                key={s.file}
                href={FILE(s.file)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 border-2 border-nb-text bg-white p-4 shadow-nb transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="border-2 border-nb-text bg-nb-surface px-2 py-0.5 font-mono text-nb-xs font-semibold">
                    {s.kind}
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                </div>
                <p className="flex items-center gap-2 break-all font-mono text-nb-sm font-bold group-hover:underline">
                  {s.file.endsWith(".txt") ? (
                    <FileText className="h-4 w-4 shrink-0" aria-hidden />
                  ) : (
                    <FileCode2 className="h-4 w-4 shrink-0" aria-hidden />
                  )}
                  {s.file.split("/").pop()}
                </p>
                <p className="text-nb-sm">{s.summary}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t-[3px] border-nb-text bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-4 py-6 font-mono text-nb-xs sm:flex-row sm:justify-between sm:px-6">
          <span>Danielle Davis | davis072087@gmail.com</span>
          <a href={FOLDER} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Source files on GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
