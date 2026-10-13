import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

const strengths = [
  { label: "Identity & access", tools: "Okta · SSO · SAML · SCIM · MFA · RBAC · Okta Workflows" },
  { label: "Endpoint & SaaS", tools: "Jamf · Intune · Mosyle · Google Workspace · Slack · Jira" },
  { label: "Engineering & automation", tools: "Python · Bash · REST APIs · GitLab · Terraform · Kubernetes" },
  { label: "Leadership & operations", tools: "Technical direction · mentoring · stakeholder alignment · SOC 2 workflows" },
]

const roles = [
  {
    title: "Lead IT Engineer",
    company: "Recharge",
    dates: "Sep 2023 – Aug 2026",
    details: [
      "Led internal IT infrastructure, IAM, operations, and technical project delivery for a SaaS organization of more than 450 users.",
      "Owned Okta identity architecture, including SSO, MFA, SCIM provisioning, access policies, and automated joiner/mover/leaver workflows.",
      "Delivered an Okta Identity Engine upgrade and more than 25 SSO/SCIM integrations; built automations using Okta Workflows, Python, REST APIs, and Jira.",
      "Mentored IT engineers, standardized operational processes, and documented architecture and runbooks to make systems easier to maintain and scale.",
    ],
  },
  {
    title: "IT Manager Consultant",
    company: "Inflect",
    dates: "Aug 2022 – Jan 2024",
    details: [
      "Built the IT function for a rapidly growing startup, defining systems, policies, hardware procurement, support, and employee lifecycle processes.",
      "Implemented Okta and Mosyle for more than 30 users in two countries, improving device management, security, and onboarding/offboarding consistency.",
      "Designed the service for a documented, low-friction transition to managed support without reliance on a single administrator.",
    ],
  },
  {
    title: "Senior IT Support Administrator",
    company: "Dialexa",
    dates: "Oct 2020 – Aug 2024",
    details: [
      "Supported a hybrid environment of more than 350 users and coordinated service desk operations and SLA performance for a four-person IT team.",
      "Administered more than 20 SaaS applications, including Okta, Google Workspace, Slack, Jira, and Zoom.",
      "Led operational change management, stakeholder communications, endpoint deployments, and support process improvements.",
    ],
  },
  {
    title: "IT Support Administrator",
    company: "StackPath",
    dates: "Feb 2019 – Oct 2020",
    details: ["Owned day-to-day IT administration and employee support for 100+ users across macOS and Windows; contributed to endpoint management implementation."],
  },
  {
    title: "Service Desk Analyst II",
    company: "Intuit",
    dates: "Feb 2013 – Jun 2018",
    details: ["Provided enterprise hardware, software, and technical support for 400+ employees in a mixed-device environment."],
  },
]

export const metadata = {
  title: "Resume | Danielle Davis — IT Engineering & Leadership",
  description: "Danielle Davis: IT engineer and technical leader focused on identity, endpoint management, automation, scalable SaaS infrastructure, and practical leadership.",
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navigation />
      <main className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <header className="border-b border-slate-200 pb-9">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.19em] text-blue-700">Engineering + leadership</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Danielle Davis</h1>
          <p className="mt-3 text-xl font-medium text-slate-700">IT Engineering Leader | Identity, Endpoint & Automation</p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700">
            I help high-growth teams scale their IT infrastructure through automation, practical security, and thoughtful systems design — reducing employee friction without letting costs scale at the same rate. I combine hands-on engineering with technical leadership, mentoring, and cross-functional delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-blue-700" href="mailto:davis072087@gmail.com"><Mail size={16} /> Contact</a>
            <a className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 hover:border-blue-600" href="https://www.linkedin.com/in/davisthetech/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a>
            <a className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 hover:border-blue-600" href="https://github.com/davisthegreat720" target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a>
            <Link className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 hover:border-blue-600" href="/portfolio">View engineering work <ArrowUpRight size={14} /></Link>
          </div>
        </header>

        <section className="py-9" aria-labelledby="impact-heading">
          <h2 id="impact-heading" className="text-xl font-bold">Selected engineering impact</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { metric: "450+", label: "Users supported at Recharge" },
              { metric: "25+", label: "SSO / SCIM integrations" },
              { metric: "2 countries", label: "Startup IT deployment at Inflect" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-5">
                <p className="text-2xl font-bold text-blue-700">{item.metric}</p>
                <p className="mt-1 text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-9" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-xl font-bold">Technical strengths</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {strengths.map((s) => (
              <div key={s.label} className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="font-semibold">{s.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.tools}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="text-xl font-bold">Professional experience</h2>
          <div className="mt-5 space-y-5">
            {roles.map((role) => (
              <article key={role.company} className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div><h3 className="text-lg font-semibold">{role.title}</h3><p className="text-blue-700">{role.company}</p></div>
                  <p className="text-sm text-slate-500">{role.dates}</p>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                  {role.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-9 grid gap-5 border-t border-slate-200 pt-9 sm:grid-cols-2">
          <div><h2 className="text-xl font-bold">Education</h2><p className="mt-3 font-medium">M.S., IT Project Management</p><p className="text-sm text-slate-600">University of Maryland Global Campus</p></div>
          <div><h2 className="text-xl font-bold">Certifications</h2><p className="mt-3 text-sm leading-7 text-slate-700">Okta Administrator · Jamf 200 · Apple ACMT · ITIL v3</p></div>
        </section>
        <footer className="mt-12 border-t border-slate-200 pt-5 text-sm text-slate-500">Dallas, Texas · <a className="text-blue-700 underline" href="mailto:davis072087@gmail.com">Get in touch</a></footer>
      </main>
    </div>
  )
}
