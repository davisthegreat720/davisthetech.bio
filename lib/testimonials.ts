/**
 * Recommendation excerpts. Quotes are verbatim from the source letters.
 * An entry renders only when `name` is filled in, so an unattributed
 * quote never ships.
 */
export type Testimonial = {
  /** Short verbatim pull quote, shown large */
  quote: string
  /** Optional second verbatim excerpt, shown as supporting text */
  support?: string
  name: string
  title: string
  company: string
  relationship: string
  /** Optional facts stated in the letter, shown as stat tiles */
  stats?: { value: string; label: string }[]
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Time and again, she went well beyond the scope of her role to make sure a problem actually got solved, not just handed off.",
    support:
      "Danielle consistently found novel, more effective ways to solve problems, often ones that simplified things for the rest of the team or unlocked progress on issues that had stalled.",
    name: "Allison Utter",
    title: "Director, Security",
    company: "Recharge, Inc.",
    relationship: "Direct manager",
  },
  {
    quote:
      "I appreciated her great attitude and ability to foster relationships with other Departments.",
    support: "She would make a great addition to any IT Team.",
    name: "Mark Hatch",
    title: "VP of Infrastructure",
    company: "Recharge, Inc.",
    relationship: "Worked together for 3 years",
    stats: [
      { value: "140+", label: "productivity tools supported" },
      { value: "500+", label: "users" },
      { value: "3", label: "people on the IT team" },
    ],
  },
]

export function getTestimonials() {
  return testimonials.filter((t) => t.name.trim().length > 0)
}
