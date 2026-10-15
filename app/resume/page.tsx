import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { getResume, type Role } from "@/lib/resume"

export const metadata: Metadata = {
  title: "Resume | Danielle Davis — Staff IT Engineering Leader",
  description:
    "Resume of Danielle Davis: identity and access management, endpoint engineering, enterprise SaaS, automation, and AI platform administration.",
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="w-fit rounded-md border-2 border-foreground bg-primary px-2.5 py-1 text-sm font-black uppercase tracking-widest">
      {children}
    </h2>
  )
}

function RoleCard({ role }: { role: Role }) {
  return (
    <article className="flex flex-col gap-4 rounded-md border-2 border-foreground bg-card p-5 shadow-nb sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-extrabold leading-snug">{role.title}</h3>
          <p className="font-semibold text-secondary">
            {role.company}
            {role.location && <span className="font-medium text-muted-foreground">{` — ${role.location}`}</span>}
          </p>
        </div>
        <p className="w-fit shrink-0 rounded-md border-2 border-foreground bg-muted px-2 py-0.5 font-mono text-xs font-bold">
          {role.dates}
        </p>
      </div>
      <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed marker:text-secondary">
        {role.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  )
}

export default function ResumePage() {
  const resume = getResume()
  const { contact } = resume

  const contactItems = [
    contact.email && { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { icon: Phone, label: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` },
    contact.location && { icon: MapPin, label: contact.location },
    contact.linkedin && { icon: Linkedin, label: "LinkedIn", href: contact.linkedin, external: true },
    contact.github && { icon: Github, label: "GitHub", href: contact.github, external: true },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href?: string; external?: boolean }[]

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-14">
        <header className="flex flex-col gap-5 rounded-md border-2 border-foreground bg-card p-6 shadow-nb-lg sm:p-8">
          <h1 className="text-balance text-4xl font-black leading-none tracking-tight sm:text-6xl">{resume.name}</h1>
          {contact.title && <p className="text-pretty text-lg font-semibold sm:text-xl">{contact.title}</p>}
          <ul className="flex flex-wrap gap-2" aria-label="Contact">
            {contactItems.map(({ icon: Icon, label, href, external }) => {
              const inner = (
                <>
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                  {external && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}
                </>
              )
              const cls =
                "inline-flex items-center gap-1.5 rounded-md border-2 border-foreground bg-background px-2.5 py-1 text-sm font-semibold"
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className={`${cls} transition-colors hover:bg-primary`}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className={cls}>{inner}</span>
                  )}
                </li>
              )
            })}
          </ul>
          <p className="max-w-3xl text-pretty leading-relaxed">{resume.summary}</p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <section aria-labelledby="experience-heading" className="flex flex-col gap-5">
            <SectionHeading id="experience-heading">Experience</SectionHeading>
            {resume.experience.map((role) => (
              <RoleCard key={`${role.company}-${role.dates}`} role={role} />
            ))}
          </section>

          <aside className="flex flex-col gap-10 lg:sticky lg:top-6 lg:self-start">
            <section aria-labelledby="skills-heading" className="flex flex-col gap-4">
              <SectionHeading id="skills-heading">Technical expertise</SectionHeading>
              <dl className="flex flex-col gap-4">
                {resume.skills.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1 border-t-2 border-foreground pt-3">
                    <dt className="font-extrabold">{s.label}</dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">{s.details.split(";").join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="education-heading" className="flex flex-col gap-4">
              <SectionHeading id="education-heading">Education</SectionHeading>
              <ul className="flex flex-col gap-2 text-sm font-semibold leading-relaxed">
                {resume.education.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="certs-heading" className="flex flex-col gap-4">
              <SectionHeading id="certs-heading">Certifications</SectionHeading>
              <ul className="flex flex-wrap gap-2">
                {resume.certifications.map((c) => (
                  <li key={c} className="rounded-md border-2 border-foreground bg-secondary px-2 py-1 text-sm font-bold text-secondary-foreground">
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <section aria-labelledby="programs-heading" className="flex flex-col gap-5">
          <SectionHeading id="programs-heading">Selected technical programs</SectionHeading>
          <ul className="grid gap-4 sm:grid-cols-2">
            {resume.programs.map((p) => (
              <li key={p.label} className="flex flex-col gap-2 rounded-md border-2 border-foreground bg-card p-5 shadow-nb-sm">
                <h3 className="font-extrabold">{p.label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.details}</p>
              </li>
            ))}
          </ul>
        </section>

        <aside
          role="note"
          aria-label="About this resume"
          className="flex items-start gap-3 rounded-md border-2 border-foreground bg-muted p-4 shadow-nb-sm"
        >
          <span className="mt-0.5 shrink-0 rounded-md border-2 border-foreground bg-secondary p-1 text-secondary-foreground" aria-hidden>
            <FileText className="h-4 w-4" />
          </span>
          <p className="text-pretty text-sm leading-relaxed">
            <span className="mr-1.5 font-mono text-xs font-bold uppercase tracking-wider text-secondary">Core resume</span>
            This is my main resume. The version I submit with an application may be tailored to the role, with different
            emphasis or ordering. Every version is accurate to the same experience.
          </p>
        </aside>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-6">
          <p className="font-semibold">Want the details behind the bullets?</p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-md border-2 border-foreground bg-primary px-4 py-2 font-bold shadow-nb-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-nb"
          >
            View engineering work <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </footer>
      </main>
    </div>
  )
}
