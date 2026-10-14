// Runs before `next build` (see package.json "build").
// Pulls live data for portfolio projects that rebuild on push (currently: henley-rag)
// and writes data/<repo>.json. On any failure the committed snapshot is kept, so the
// build never breaks because GitHub is unreachable or rate-limited.
//
// Env (optional):
//   GITHUB_TOKEN          raises the GitHub API rate limit on shared build machines
//   REPO_DATA_LOCAL_PATH  read files from a local clone instead of GitHub (testing)

import { readFile, writeFile, readdir } from "node:fs/promises"
import path from "node:path"

const OWNER = "davisthegreat720"
const REPO = "henley-rag"
const BRANCH = "main"
const OUT = path.join(process.cwd(), "data", `${REPO}.json`)
const LOCAL = process.env.REPO_DATA_LOCAL_PATH

const headers = { Accept: "application/vnd.github+json", "User-Agent": "davisthetech.bio-build" }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

async function getJson(url) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(8000) })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

async function getText(file) {
  if (LOCAL) return readFile(path.join(LOCAL, file), "utf8")
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${file}`
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

async function listFiles() {
  if (LOCAL) {
    const out = []
    const walk = async (dir) => {
      for (const e of await readdir(path.join(LOCAL, dir), { withFileTypes: true })) {
        if (e.name === ".git") continue
        const rel = dir ? `${dir}/${e.name}` : e.name
        if (e.isDirectory()) await walk(rel)
        else out.push(rel)
      }
    }
    await walk("")
    return out
  }
  const tree = await getJson(`https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`)
  return tree.tree.filter((t) => t.type === "blob").map((t) => t.path)
}

async function latestCommit() {
  try {
    const c = await getJson(`https://api.github.com/repos/${OWNER}/${REPO}/commits/${BRANCH}`)
    return {
      sha: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      date: c.commit.committer.date,
      url: c.html_url,
    }
  } catch {
    // Fallback: public Atom feed (no API rate limit)
    const res = await fetch(`https://github.com/${OWNER}/${REPO}/commits/${BRANCH}.atom`, {
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`atom ${res.status}`)
    const xml = await res.text()
    const entry = xml.split("<entry>")[1] ?? ""
    const pick = (re) => (entry.match(re) ?? [])[1]
    const sha = pick(/Commit\/([0-9a-f]{7,40})</) ?? ""
    return {
      sha: sha.slice(0, 7),
      message: (pick(/<title>\s*([\s\S]*?)\s*<\/title>/) ?? "").trim(),
      date: pick(/<updated>([^<]+)<\/updated>/),
      url: pick(/<link[^>]+href="([^"]+)"/),
    }
  }
}

function countComposeServices(yaml) {
  const lines = yaml.split("\n")
  const start = lines.findIndex((l) => /^services:\s*$/.test(l))
  if (start < 0) return 0
  let n = 0
  for (const l of lines.slice(start + 1)) {
    if (/^\S/.test(l)) break // next top-level key
    if (/^ {2}[A-Za-z0-9_.-]+:\s*$/.test(l)) n++
  }
  return n
}

async function main() {
  const previous = JSON.parse(await readFile(OUT, "utf8").catch(() => "{}"))
  try {
    const files = await listFiles()
    const pyFiles = files.filter((f) => f.endsWith(".py"))
    const apiFiles = pyFiles.filter((f) => f.includes("/api/"))
    let endpoints = 0
    for (const f of apiFiles) endpoints += ((await getText(f)).match(/@(app|router)\.(get|post|put|patch|delete)\(/g) ?? []).length
    const connectors = files.filter(
      (f) => /\/connectors\/[^/]+\.py$/.test(f) && !/(__init__|base)\.py$/.test(f),
    ).length
    const composeFile = files.find((f) => /^(compose|docker-compose)\.ya?ml$/.test(f))
    const services = composeFile ? countComposeServices(await getText(composeFile)) : 0

    const data = {
      repo: `${OWNER}/${REPO}`,
      generatedAt: new Date().toISOString(),
      commit: LOCAL ? previous.commit : await latestCommit(),
      stats: { composeServices: services, sourceConnectors: connectors, apiEndpoints: endpoints, pythonFiles: pyFiles.length },
    }
    await writeFile(OUT, JSON.stringify(data, null, 2) + "\n")
    console.log(`[sync-repo-data] ${data.repo}: ${JSON.stringify(data.stats)} @ ${data.commit?.sha}`)
  } catch (err) {
    console.warn(`[sync-repo-data] keeping committed snapshot: ${err.message}`)
  }
}

main()
