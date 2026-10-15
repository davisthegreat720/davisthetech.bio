import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CalendarDays, Github, Linkedin, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { getResume } from "@/lib/resume"
import { Testimonials } from "@/components/testimonials"
import { getTestimonials } from "@/lib/testimonials"

const BOOKING_URL = "https://calendar.notion.so/meet/davisthegreat/rpu44yba"

export default function HomePage() {
  const { name, contact, skills } = getResume()
  const focusAreas = skills.slice(0, 4).map((s) => s.label)

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:py-16">
        <section aria-labelledby="hero-heading" className="flex flex-col gap-6">
          <h1 id="hero-heading" className="text-balance text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
            {name}
          </h1>
          {contact.title && (
            <p className="text-pretty text-lg font-semibold leading-relaxed sm:text-xl">{contact.title}</p>
          )}

          <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
            {focusAreas.map((area) => (
              <li key={area} className="rounded-md border-2 border-foreground bg-card px-2.5 py-1 text-sm font-semibold">
                {area}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/resume">
                View resume <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">
                See the work <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <CalendarDays className="h-4 w-4" aria-hidden /> Let&apos;s Chat
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>

          <div className="flex gap-3">
            {contact.linkedin && (
              <Button asChild size="icon" variant="outline">
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
            {contact.github && (
              <Button asChild size="icon" variant="outline">
                <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            {contact.email && (
              <Button asChild size="icon" variant="outline">
                <a href={`mailto:${contact.email}`} aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </section>

        <div className="relative mx-auto w-full max-w-md">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-md border-2 border-foreground bg-primary" />
          <div className="relative aspect-square overflow-hidden rounded-md border-2 border-foreground bg-card">
            <Image
              src="/images/headshot.jpg"
              alt={`${name} — professional headshot`}
              fill
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </main>

      <Testimonials items={getTestimonials()} />

      <footer className="border-t-2 border-foreground bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-sm sm:flex-row sm:items-center sm:px-6">
          <p className="text-muted-foreground">
            {"© "}
            {new Date().getFullYear()} {name}
          </p>
        </div>
      </footer>
    </div>
  )
}
