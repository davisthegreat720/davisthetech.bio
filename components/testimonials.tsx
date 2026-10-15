import type { Testimonial } from "@/lib/testimonials"

/**
 * Recommendation quotes (neobrutalism tokens).
 * UX: Serial Position (strongest quote first, in the featured card),
 * Proximity (attribution sits directly under its quote),
 * Similarity (every card shares border, shadow, and type treatment),
 * Miller's Law (max two excerpts and three stats per letter).
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null

  return (
    <section aria-labelledby="testimonials-heading" className="border-t-[3px] border-nb-text bg-nb-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <p className="font-mono text-nb-xs font-semibold uppercase tracking-wider text-nb-secondary">References</p>
        <h2 id="testimonials-heading" className="mt-2 text-nb-2xl font-black tracking-tight">
          Colleague Perspectives
        </h2>

        <div className={`mt-8 grid gap-8 ${items.length > 1 ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
          {items.map((t, i) => (
            <QuoteCard key={t.name} t={t} featured={i === 0} />
          ))}
        </div>

        <p className="mt-8 text-nb-sm text-muted-foreground">Full letters available on request.</p>
      </div>
    </section>
  )
}

function QuoteCard({ t, featured }: { t: Testimonial; featured: boolean }) {
  return (
    <figure
      className={`flex flex-col gap-5 rounded-md border-[3px] border-nb-text p-6 sm:p-8 ${
        featured ? "bg-nb-primary shadow-nb-lg" : "bg-white shadow-nb"
      }`}
    >
      <span aria-hidden className="font-black leading-none text-nb-text" style={{ fontSize: 64, height: 32 }}>
        &ldquo;
      </span>

      <blockquote className="flex flex-col gap-4">
        <p className={`text-pretty font-bold leading-snug text-nb-text ${featured ? "text-nb-xl" : "text-nb-lg"}`}>
          {t.quote}
        </p>
        {t.support && <p className="text-pretty text-nb-base text-nb-text">{t.support}</p>}
      </blockquote>

      {t.stats && t.stats.length > 0 && (
        <dl className="grid grid-cols-3 gap-2">
          {t.stats.map((s) => (
            <div key={s.label} className="rounded-md border-2 border-nb-text bg-nb-surface p-3">
              <dt className="sr-only">{s.label}</dt>
              <dd className="flex flex-col">
                <span className="text-nb-xl font-black leading-none">{s.value}</span>
                <span className="mt-1 text-nb-xs font-semibold leading-tight" aria-hidden>
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      <figcaption className="mt-auto border-t-2 border-nb-text pt-4">
        <span className="block text-nb-base font-bold">{t.name}</span>
        <span className="block text-nb-sm">
          {t.title}, {t.company}
        </span>
        <span className="mt-2 inline-block rounded-md border-2 border-nb-text bg-white px-2 py-0.5 font-mono text-nb-xs font-semibold">
          {t.relationship}
        </span>
      </figcaption>
    </figure>
  )
}
