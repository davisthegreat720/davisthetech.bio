"use client"

import { useEffect, useRef, useState } from "react"

type Item = { id: string; label: string; num: string }

/**
 * Sticky jump navigation (neobrutalism tokens).
 * UX: Jakob's Law (familiar in-page tab bar), Fitts's Law (44px targets),
 * feedback via aria-current on the section in view.
 */
export function NbJumpNav({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "")
  const listRef = useRef<HTMLUListElement>(null)

  // Keep the active item visible in the horizontally scrolling bar
  useEffect(() => {
    const list = listRef.current
    const el = list?.querySelector<HTMLElement>(`a[href="#${CSS.escape(active)}"]`)
    if (!list || !el) return
    const left = el.offsetLeft - list.offsetLeft
    if (left < list.scrollLeft || left + el.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: Math.max(0, left - 16), behavior: "smooth" })
    }
  }, [active])

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [items])

  return (
    <nav
      aria-label={label}
      className="sticky top-0 z-30 -mx-4 border-y-[3px] border-nb-text bg-nb-surface px-4 py-3 sm:-mx-6 sm:px-6"
    >
      <ul ref={listRef} className="flex gap-2 overflow-x-auto pb-1">
        {items.map((i) => {
          const on = i.id === active
          return (
            <li key={i.id} className="shrink-0">
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                onClick={() => setActive(i.id)}
                className={`inline-flex min-h-[44px] items-center gap-2 border-2 border-nb-text px-3 font-mono text-nb-xs font-semibold transition-transform active:translate-y-0 active:shadow-none ${
                  on
                    ? "bg-nb-text text-white"
                    : "bg-white text-nb-text shadow-nb-sm hover:-translate-y-0.5 hover:bg-nb-primary"
                }`}
              >
                <span className={on ? "text-nb-primary" : "text-nb-secondary"}>{i.num}</span>
                {i.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
