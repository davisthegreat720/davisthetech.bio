"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

type Props = { headers: string[]; rows: string[][] }

const TYPE_COL = 2

export function Worksheet({ headers, rows }: Props) {
  const [type, setType] = useState<string>("All")
  const [q, setQ] = useState("")

  const types = useMemo(() => {
    const counts = new Map<string, number>()
    rows.forEach((r) => counts.set(r[TYPE_COL], (counts.get(r[TYPE_COL]) ?? 0) + 1))
    return [["All", rows.length] as const, ...Array.from(counts.entries())]
  }, [rows])

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return rows.filter(
      (r) => (type === "All" || r[TYPE_COL] === type) && (!needle || r.some((c) => c.toLowerCase().includes(needle))),
    )
  }, [rows, type, q])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by Jamf object type">
          {types.map(([t, n]) => {
            const active = t === type
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => setType(t)}
                className={`min-h-[44px] border-2 border-nb-text px-3 py-1.5 font-mono text-nb-xs font-semibold transition-transform active:translate-y-px ${
                  active ? "bg-nb-text text-white" : "bg-white text-nb-text shadow-nb-sm hover:bg-nb-primary"
                }`}
              >
                {t} <span className={active ? "text-nb-primary" : "text-nb-secondary"}>{n}</span>
              </button>
            )
          })}
        </div>
        <label className="flex min-h-[44px] w-full items-center gap-2 border-2 border-nb-text bg-white px-3 py-2 shadow-nb-sm focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-nb-secondary lg:w-80">
          <Search className="h-4 w-4 shrink-0" aria-hidden />
          <span className="sr-only">Search worksheet</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search objects, criteria, scope"
            className="w-full bg-transparent text-nb-sm outline-none placeholder:text-nb-text/60"
          />
        </label>
      </div>

      <p className="font-mono text-nb-xs" aria-live="polite">
        Showing {visible.length} of {rows.length} rows
      </p>

      <div className="max-h-[75vh] overflow-auto border-[3px] border-nb-text bg-white shadow-nb-lg">
        <table className="w-max min-w-full border-collapse text-nb-xs">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`sticky top-0 z-20 border-b-[3px] border-r-2 border-nb-text bg-nb-primary px-3 py-2 text-left align-bottom font-bold ${
                    i === 0 ? "left-0 z-30 w-16 min-w-16" : i === 1 ? "md:left-16 md:z-30 min-w-[220px]" : "min-w-[160px]"
                  } ${i >= 4 && i !== 10 && i !== 11 ? "min-w-[260px]" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r[0]} className="group">
                {r.map((c, i) => (
                  <td
                    key={i}
                    className={`whitespace-pre-line border-b-2 border-r-2 border-nb-text px-3 py-2 align-top ${
                      i === 0
                        ? "sticky left-0 z-10 bg-nb-surface font-mono font-bold group-hover:bg-nb-primary"
                        : i === 1
                          ? "bg-white font-semibold md:sticky md:left-16 md:z-10"
                          : ""
                    } ${i === 0 ? "w-16 min-w-16" : ""} ${i === 13 || i === 14 ? "[overflow-wrap:anywhere]" : ""}`}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="px-3 py-6 text-nb-sm">
                  No rows match. Clear the search or pick another type.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
