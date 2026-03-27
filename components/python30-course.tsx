"use client"

import { useState } from "react"
import { ChevronDown, Check, Copy, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"

// Full curriculum data with concepts and projects
const curriculum = [
  {
    week: 1,
    title: "Python Foundations",
    tag: "SYNTAX & BASICS",
    days: [
      {
        day: 1,
        title: "Your First Python Script",
        topic: "SETUP",
        concepts: [
          {
            title: "Install Python & VS Code",
            desc: "Download Python 3.12+ from python.org. Download VS Code from code.visualstudio.com. In VS Code, install the 'Python' extension by Microsoft. Open a terminal inside VS Code with Ctrl+` (backtick).",
          },
          {
            title: "Create and run your first file",
            desc: "In the terminal, create a folder and your first script:",
            code: `# In your terminal:
mkdir it-python && cd it-python
# Create a file called day01.py, then run it:
python3 day01.py`,
          },
          {
            title: "The print() function",
            desc: "print() outputs text to the terminal. It's your main tool for seeing what your code is doing.",
            code: `print("Hello, IT World!")
print("My name is Danielle")
print("Today I'm learning Python")`,
          },
          {
            title: "Comments — notes in your code",
            desc: "Lines starting with # are ignored by Python. Use them to explain what your code does.",
            code: `# This is a comment — Python ignores this line
print("This line DOES run")  # Comment at end of a line`,
          },
        ],
        project: {
          name: "IT Welcome Banner",
          desc: "Write a script that prints a formatted IT system login banner — like the kind you see when SSHing into a server.",
          steps: [
            { label: "STEP 1 — Create the file", text: "Create a new file called day01_banner.py in your it-python folder." },
            {
              label: "STEP 2 — Write the banner",
              text: "Use multiple print() calls to build a banner. Use print('') for blank lines.",
              code: `print("==================================")
print("   COMPANY IT SYSTEM - AUTHORIZED USE ONLY")
print("==================================")
print("")
print("Technician : Danielle Davis")
print("Department : IT Engineering")
print("Access     : Admin")
print("")
print("Have a great day!")
print("==================================")`,
            },
            { label: "STEP 3 — Run it", text: "In the terminal: python3 day01_banner.py — you should see your banner printed out." },
          ],
          challenge: "Add today's date to the banner. Hint: try importing datetime at the top — we'll cover this properly on Day 12, but see if you can figure it out.",
        },
      },
      {
        day: 2,
        title: "Variables & Data Types",
        topic: "VARIABLES",
        concepts: [
          {
            title: "What is a variable?",
            desc: "A variable is a named box that stores a value. You create one by writing a name, an equals sign, and a value.",
            code: `username = "ddavis"
ticket_count = 42
is_admin = True
print(username)   # prints: ddavis`,
          },
          {
            title: "The 4 main data types",
            desc: "Python has four basic types you'll use constantly:",
            code: `name     = "Danielle"       # str  — text, always in quotes
age      = 36              # int  — whole number
score    = 98.5            # float — decimal number
is_active = True           # bool — True or False (capital T/F!)`,
          },
          {
            title: "F-strings — the cleanest way to format text",
            desc: "Put an f before your string and wrap variables in {}. This is the modern way to mix text and variables.",
            code: `name = "Danielle"
ticket_id = 1042
print(f"Hello {name}, your ticket is #{ticket_id}")
# Output: Hello Danielle, your ticket is #1042`,
          },
        ],
        project: {
          name: "IT Ticket Summary Generator",
          desc: "A script that prompts for user info and prints a formatted ticket.",
          steps: [
            {
              label: "STEP 1 — Collect input",
              text: "Use input() to ask three questions and store the answers in variables.",
              code: `username   = input("Enter username: ")
department = input("Enter department: ")
issue      = input("Describe the issue: ")`,
            },
            {
              label: "STEP 2 — Build the ticket output",
              text: "Use f-strings to print a formatted ticket summary:",
              code: `print("")
print("===== NEW IT TICKET =====")
print(f"User       : {username}")
print(f"Department : {department}")
print(f"Issue      : {issue}")
print(f"Status     : Open")
print("=========================")`,
            },
          ],
          challenge: "Add a ticket_id variable and set it to a number. Display it in the output. Then try: what happens if you do ticket_id + 1 — does it work?",
        },
      },
      {
        day: 3,
        title: "String Manipulation",
        topic: "STRINGS",
        concepts: [
          {
            title: "Common string methods",
            desc: "Strings have built-in methods (tools) you call with a dot. These are huge for cleaning user data.",
            code: `email = "  Danielle.Davis@Company.COM  "
print(email.strip())    # remove whitespace
print(email.lower())    # lowercase
print(email.upper())    # uppercase

# Chain them together:
clean_email = email.strip().lower()
print(clean_email)  # "danielle.davis@company.com"`,
          },
          {
            title: "replace() and split()",
            desc: "replace() swaps text. split() breaks a string into a list on a delimiter.",
            code: `email = "danielle@company.com"
parts = email.split("@")
print(parts)        # ['danielle', 'company.com']
print(parts[0])     # 'danielle' (index 0 = first item)
print(parts[1])     # 'company.com' (index 1 = second item)`,
          },
        ],
        project: {
          name: "Email Domain Checker",
          desc: "Process a list of emails, extract the domain, and flag any that don't match your company domain.",
          steps: [
            {
              label: "STEP 1 — Define your email list",
              code: `emails = [
    "ddavis@company.com",
    "jsmith@gmail.com",
    "  alee@Company.COM  ",
    "bwilson@company.com",
    "contractor@external.org"
]`,
            },
            {
              label: "STEP 2 — Loop and process",
              text: "Loop through each email, clean it, split on @, and extract the domain.",
              code: `for email in emails:
    clean = email.strip().lower()
    domain = clean.split("@")[1]
    if domain == "company.com":
        print(f"✓ {clean} — internal")
    else:
        print(f"⚠ {clean} — EXTERNAL domain: {domain}")`,
            },
          ],
          challenge: "Modify the script to also check that each email contains exactly one '@' character. Hint: use .count('@') == 1",
        },
      },
      {
        day: 4,
        title: "Lists & Loops",
        topic: "LISTS + FOR",
        concepts: [
          {
            title: "Creating and indexing lists",
            desc: "A list stores multiple values in order. Access items by index (starting at 0).",
            code: `devices = ["MacBook-DD01", "MacBook-JS02", "Win-BW03"]
print(devices[0])    # "MacBook-DD01" (first item)
print(devices[-1])   # "Win-BW03" (last item)
print(len(devices))  # 3`,
          },
          {
            title: "The for loop",
            desc: "A for loop runs code once for each item in a list.",
            code: `users = ["ddavis", "jsmith", "alee"]

for user in users:
    print(f"Processing user: {user}")

# Output:
# Processing user: ddavis
# Processing user: jsmith
# Processing user: alee`,
          },
        ],
        project: {
          name: "Device Inventory Printer",
          desc: "Build a script that manages and displays a device inventory list.",
          steps: [
            {
              label: "STEP 1 — Create your inventory",
              code: `inventory = [
    "MacBook-DD01",
    "MacBook-JS02",
    "Win-BW03",
    "MacBook-AL04",
    "iPad-RM05"
]`,
            },
            {
              label: "STEP 2 — Print with formatting",
              code: `print("===== DEVICE INVENTORY =====")
print(f"Total devices: {len(inventory)}")
print("")

for i, device in enumerate(inventory, start=1):
    print(f"  [{i}] {device}")`,
            },
          ],
          challenge: "Add a second loop that prints only devices starting with 'MacBook'. Hint: use device.startswith('MacBook') inside an if statement.",
        },
      },
      {
        day: 5,
        title: "Conditionals (if/else)",
        topic: "LOGIC",
        concepts: [
          {
            title: "Basic if/elif/else",
            desc: "Run different code depending on a condition.",
            code: `priority = 1

if priority == 1:
    print("P1 — Page the on-call engineer NOW")
elif priority == 2:
    print("P2 — Respond within 1 hour")
elif priority == 3:
    print("P3 — Add to normal queue")
else:
    print("P4/5 — Schedule for next sprint")`,
          },
          {
            title: "Boolean logic: and, or, not",
            desc: "Combine conditions with and/or, or flip them with not.",
            code: `is_active = True
days_inactive = 45

if is_active and days_inactive > 30:
    print("Active but hasn't logged in — flag for review")

if not is_active:
    print("Account is already deactivated")`,
          },
        ],
        project: {
          name: "Ticket Priority Router",
          desc: "A script that routes support tickets based on priority and category.",
          steps: [
            {
              label: "STEP 1 — Get ticket info",
              code: `user     = input("Username: ")
issue    = input("Issue description: ")
priority = int(input("Priority (1-5): "))`,
            },
            {
              label: "STEP 2 — Route the ticket",
              code: `print("\\n--- TICKET ROUTING ---")
print(f"User: {user} | Issue: {issue}")

if priority == 1:
    print("CRITICAL — Paging on-call engineer")
    print("SLA: 15 minutes")
elif priority == 2:
    print("HIGH — Assigning to senior IT")
    print("SLA: 1 hour")
elif priority == 3:
    print("MEDIUM — Adding to normal queue")
    print("SLA: 4 hours")
else:
    print("LOW — Scheduled for next available")
    print("SLA: Next business day")`,
            },
          ],
          challenge: "Add a check: if priority is not between 1–5, print an error message instead of routing.",
        },
      },
      {
        day: 6,
        title: "Dictionaries",
        topic: "DICTS",
        concepts: [
          {
            title: "What is a dictionary?",
            desc: "A dictionary stores data as key:value pairs — exactly like a JSON object. This is the most important data structure for API work.",
            code: `user = {
    "username":   "ddavis",
    "email":      "d.davis@company.com",
    "department": "IT Engineering",
    "is_admin":   True,
    "ticket_count": 7
}`,
          },
          {
            title: "Looping over a dictionary",
            desc: "Use .items() to loop over both key and value at once.",
            code: `for key, value in user.items():
    print(f"  {key}: {value}")`,
          },
        ],
        project: {
          name: "User Profile Card",
          desc: "Create a user dictionary and display a formatted IT profile card.",
          steps: [
            {
              label: "STEP 1 — Build the user dict",
              code: `user = {
    "name":        "Danielle Davis",
    "username":    "ddavis",
    "email":       "d.davis@company.com",
    "department":  "IT Engineering",
    "role":        "Team Lead",
    "is_admin":    True,
    "open_tickets": 3
}`,
            },
            {
              label: "STEP 2 — Print the card",
              code: `print("=" * 35)
print(f"  IT PROFILE: {user['name']}")
print("=" * 35)
for field, value in user.items():
    print(f"  {field.upper():15}: {value}")`,
            },
          ],
          challenge: "Create a list of 3 user dictionaries and loop through them all, printing a mini card for each one.",
        },
      },
      {
        day: 7,
        title: "Functions",
        topic: "FUNCTIONS",
        concepts: [
          {
            title: "Defining and calling a function",
            desc: "Functions let you name a block of code and reuse it. Define once with 'def', call it by name.",
            code: `def greet_user(username):
    print(f"Welcome back, {username}!")

# Call it:
greet_user("ddavis")
greet_user("jsmith")`,
          },
          {
            title: "Return values",
            desc: "Use 'return' to send a result back from a function so you can store or use it.",
            code: `def format_ticket(user, issue, priority):
    return f"[P{priority}] {user}: {issue}"

ticket = format_ticket("ddavis", "VPN not connecting", 2)
print(ticket)
# [P2] ddavis: VPN not connecting`,
          },
        ],
        project: {
          name: "IT Toolkit Functions",
          desc: "Build a collection of reusable IT helper functions.",
          steps: [
            {
              label: "STEP 1 — Create helper functions",
              code: `def validate_email(email):
    return "@" in email and "." in email

def generate_username(first_name, last_name):
    return f"{first_name[0].lower()}{last_name.lower()}"

def format_hostname(device_type, user_initials, number):
    return f"{device_type}-{user_initials}{str(number).zfill(2)}"`,
            },
            {
              label: "STEP 2 — Test your functions",
              code: `print(validate_email("test@company.com"))  # True
print(generate_username("Danielle", "Davis"))  # ddavis
print(format_hostname("MacBook", "DD", 1))  # MacBook-DD01`,
            },
          ],
          challenge: "Add a function that takes a list of emails and returns only the valid ones using your validate_email function.",
        },
      },
    ],
  },
  {
    week: 2,
    title: "Scripting for IT",
    tag: "FILE I/O + CLI",
    days: [
      { day: 8, title: "Reading Text Files", topic: "FILE READ", concepts: [], project: null },
      { day: 9, title: "Writing Files & Logging", topic: "FILE WRITE", concepts: [], project: null },
      { day: 10, title: "CSV Processing", topic: "CSV", concepts: [], project: null },
      { day: 11, title: "Error Handling", topic: "TRY/EXCEPT", concepts: [], project: null },
      { day: 12, title: "Date & Time", topic: "DATETIME", concepts: [], project: null },
      { day: 13, title: "List Comprehensions", topic: "CLEAN CODE", concepts: [], project: null },
      { day: 14, title: "Build Day — Offboarding Generator", topic: "BUILD DAY", concepts: [], project: null },
    ],
  },
  {
    week: 3,
    title: "APIs & Automation",
    tag: "THE GOOD STUFF",
    days: [
      { day: 15, title: "HTTP & REST APIs", topic: "APIs 101", concepts: [], project: null },
      { day: 16, title: "The Requests Library", topic: "REQUESTS", concepts: [], project: null },
      { day: 17, title: "Authentication in APIs", topic: "AUTH", concepts: [], project: null },
      { day: 18, title: "Calling the Okta API", topic: "OKTA + PYTHON", concepts: [], project: null },
      { day: 19, title: "Calling the JAMF API", topic: "JAMF + PYTHON", concepts: [], project: null },
      { day: 20, title: "Pagination & Rate Limits", topic: "API PATTERNS", concepts: [], project: null },
      { day: 21, title: "Build Day — User Audit Report", topic: "BUILD DAY", concepts: [], project: null },
    ],
  },
  {
    week: 4,
    title: "Integration & Capstone",
    tag: "REAL TOOLS",
    days: [
      { day: 22, title: "Environment Variables & Secrets", topic: "ENV VARS", concepts: [], project: null },
      { day: 23, title: "Slack Notifications", topic: "SLACK API", concepts: [], project: null },
      { day: 24, title: "Google Workspace API", topic: "GWORKSPACE", concepts: [], project: null },
      { day: 25, title: "Classes & Objects (Light)", topic: "OOP BASICS", concepts: [], project: null },
      { day: 26, title: "Data with Pandas", topic: "PANDAS", concepts: [], project: null },
      { day: 27, title: "Building CLI Tools", topic: "CLI", concepts: [], project: null },
      { day: 28, title: "Capstone: IT Compliance Dashboard", topic: "CAPSTONE", concepts: [], project: null },
      { day: 29, title: "Capstone: Polish & Deploy", topic: "CAPSTONE", concepts: [], project: null },
      { day: 30, title: "Review & Next Steps", topic: "WRAP-UP", concepts: [], project: null },
    ],
  },
]

// Code Block component with copy functionality
function CodeBlock({ code, language = "python" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[#0d1117] border border-[#21262d] rounded overflow-hidden my-3">
      <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-[#21262d]">
        <span className="font-mono text-[10px] text-[#57606a] tracking-wide uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="font-mono text-[10px] text-[#57606a] border border-[#30363d] px-2.5 py-1 rounded hover:text-[#00d4aa] hover:border-[#00d4aa] transition-colors flex items-center gap-1.5"
        >
          {copied ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-[#e2e8f0]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// Tip Box component
function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#3b82f6]/5 border border-[#3b82f6]/20 rounded p-3 my-3">
      <span className="font-mono text-[10px] text-[#3b82f6] tracking-[2px] block mb-1.5">TIP</span>
      <p className="text-[13px] text-[#94a3b8] leading-relaxed">{children}</p>
    </div>
  )
}

// Challenge Box component
function ChallengeBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded p-3 mt-4">
      <span className="font-mono text-[10px] text-[#f59e0b] tracking-[2px] block mb-1.5">CHALLENGE</span>
      <p className="text-[13px] text-[#94a3b8] leading-relaxed">{children}</p>
    </div>
  )
}

interface DayCardProps {
  day: number
  title: string
  topic: string
  concepts: Array<{ title: string; desc: string; code?: string }>
  project: {
    name: string
    desc: string
    steps: Array<{ label: string; text?: string; code?: string }>
    challenge: string
  } | null
  isCompleted: boolean
  onToggleComplete: () => void
}

function DayCard({ day, title, topic, concepts, project, isCompleted, onToggleComplete }: DayCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"learn" | "project">("learn")

  const hasContent = concepts.length > 0 || project !== null

  return (
    <div
      className={cn(
        "bg-[#161d2e] border border-[#1e2d47] rounded overflow-hidden transition-colors",
        isOpen && "border-[#00d4aa]/40",
        isCompleted && "border-l-[3px] border-l-[#10b981]"
      )}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleComplete()
          }}
          className={cn(
            "w-5 h-5 border-2 border-[#1e2d47] rounded flex items-center justify-center flex-shrink-0 transition-all text-xs",
            isCompleted && "bg-[#10b981] border-[#10b981] text-white"
          )}
        >
          {isCompleted && <Check className="w-3 h-3" />}
        </button>
        <span className="font-mono text-[11px] text-[#64748b] min-w-[48px] tracking-wide">
          DAY {String(day).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[15px] font-semibold text-[#e2e8f0]">{title}</span>
        <span className="font-mono text-[10px] text-[#64748b] bg-[#111827] px-2 py-1 rounded">
          {topic}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#64748b] transition-transform ml-1",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {isOpen && (
        <div className="border-t border-[#1e2d47] animate-in fade-in duration-200">
          {hasContent ? (
            <>
              {/* Tabs */}
              <div className="flex border-b border-[#1e2d47]">
                <button
                  onClick={() => setActiveTab("learn")}
                  className={cn(
                    "font-mono text-[11px] tracking-wide px-5 py-3 border-b-2 -mb-px transition-colors uppercase",
                    activeTab === "learn"
                      ? "text-[#00d4aa] border-[#00d4aa]"
                      : "text-[#64748b] border-transparent hover:text-[#e2e8f0]"
                  )}
                >
                  Learn
                </button>
                {project && (
                  <button
                    onClick={() => setActiveTab("project")}
                    className={cn(
                      "font-mono text-[11px] tracking-wide px-5 py-3 border-b-2 -mb-px transition-colors uppercase",
                      activeTab === "project"
                        ? "text-[#00d4aa] border-[#00d4aa]"
                        : "text-[#64748b] border-transparent hover:text-[#e2e8f0]"
                    )}
                  >
                    Project
                  </button>
                )}
              </div>

              {/* Tab Content */}
              <div className="p-5">
                {activeTab === "learn" && (
                  <div className="space-y-6">
                    {concepts.map((concept, idx) => (
                      <div key={idx} className="learn-step">
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <span className="font-mono text-[10px] text-[#00d4aa] bg-[#00d4aa]/10 border border-[#00d4aa]/20 px-2 py-0.5 rounded flex-shrink-0">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-bold text-[#e2e8f0]">{concept.title}</span>
                        </div>
                        <p className="text-[13px] text-[#94a3b8] leading-relaxed mb-2.5">{concept.desc}</p>
                        {concept.code && <CodeBlock code={concept.code} />}
                      </div>
                    ))}

                    <button
                      onClick={onToggleComplete}
                      className={cn(
                        "mt-4 px-5 py-2.5 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] font-mono text-[11px] tracking-wide rounded transition-colors hover:bg-[#10b981]/20",
                        isCompleted && "opacity-50"
                      )}
                    >
                      {isCompleted ? "COMPLETED" : "MARK COMPLETE"}
                    </button>
                  </div>
                )}

                {activeTab === "project" && project && (
                  <div>
                    {/* Project Goal */}
                    <div className="bg-[#00d4aa]/5 border border-[#00d4aa]/15 rounded p-4 mb-5">
                      <span className="font-mono text-[10px] text-[#00d4aa] tracking-[2px] block mb-1.5">PROJECT GOAL</span>
                      <h4 className="text-base font-bold text-[#e2e8f0] mb-1.5">{project.name}</h4>
                      <p className="text-[13px] text-[#64748b] leading-relaxed">{project.desc}</p>
                    </div>

                    {/* Project Steps */}
                    <div className="space-y-5 mb-4">
                      {project.steps.map((step, idx) => (
                        <div key={idx}>
                          <span className="font-mono text-[10px] text-[#f59e0b] tracking-wide block mb-1.5">
                            {step.label}
                          </span>
                          {step.text && (
                            <p className="text-[13px] text-[#94a3b8] leading-relaxed mb-2">{step.text}</p>
                          )}
                          {step.code && <CodeBlock code={step.code} />}
                        </div>
                      ))}
                    </div>

                    {/* Challenge */}
                    <ChallengeBox>{project.challenge}</ChallengeBox>

                    <button
                      onClick={onToggleComplete}
                      className={cn(
                        "mt-5 px-5 py-2.5 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] font-mono text-[11px] tracking-wide rounded transition-colors hover:bg-[#10b981]/20",
                        isCompleted && "opacity-50"
                      )}
                    >
                      {isCompleted ? "COMPLETED" : "MARK COMPLETE"}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-5">
              <p className="text-[13px] text-[#94a3b8] leading-relaxed">
                Full lesson content coming soon. This day will cover {topic.toLowerCase()} concepts with hands-on exercises.
              </p>
              <button
                onClick={onToggleComplete}
                className={cn(
                  "mt-4 px-5 py-2.5 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] font-mono text-[11px] tracking-wide rounded transition-colors hover:bg-[#10b981]/20",
                  isCompleted && "opacity-50"
                )}
              >
                {isCompleted ? "COMPLETED" : "MARK COMPLETE"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function Python30Course() {
  const [completedDays, setCompletedDays] = useState<number[]>([])

  const toggleDay = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const totalDays = 30
  const completedCount = completedDays.length
  const progressPercent = (completedCount / totalDays) * 100

  const getWeekTagClass = (week: number) => {
    switch (week) {
      case 1:
        return "bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20"
      case 2:
        return "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20"
      case 3:
        return "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20"
      case 4:
        return "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20"
      default:
        return ""
    }
  }

  return (
    <div className="bg-[#0a0e1a] rounded-lg overflow-hidden relative">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[#00d4aa] font-mono text-[11px] tracking-[3px] px-4 py-1.5 rounded-sm mb-5 uppercase">
            // IT Professional Track
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            <span className="text-[#00d4aa]">Python</span>
            <span className="text-[#f59e0b]">30</span>
          </h2>
          <p className="text-[#64748b] text-[15px] max-w-md mx-auto leading-relaxed">
            30 days of Python fundamentals built around real IT work. Every day includes
            step-by-step lessons, annotated code, and a hands-on mini project.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-[#111827] border border-[#1e2d47] rounded p-5 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[12px] text-[#64748b] tracking-wide">
              // COURSE PROGRESS
            </span>
            <span className="font-mono text-[12px] text-[#00d4aa]">
              {completedCount} / {totalDays} days complete
            </span>
          </div>
          <div className="h-1 bg-[#1e2d47] rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d4aa] to-[#3b82f6] rounded transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Curriculum */}
        <div className="space-y-8">
          {curriculum.map((week) => (
            <div key={week.week}>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[11px] text-[#64748b] tracking-[2px] uppercase whitespace-nowrap">
                  Week {week.week}
                </span>
                <span className="text-lg font-bold text-[#e2e8f0]">{week.title}</span>
                <div className="flex-1 h-px bg-[#1e2d47]" />
                <span
                  className={cn(
                    "font-mono text-[10px] px-2.5 py-1 rounded tracking-wide whitespace-nowrap",
                    getWeekTagClass(week.week)
                  )}
                >
                  {week.tag}
                </span>
              </div>
              <div className="space-y-2">
                {week.days.map((day) => (
                  <DayCard
                    key={day.day}
                    day={day.day}
                    title={day.title}
                    topic={day.topic}
                    concepts={day.concepts || []}
                    project={day.project || null}
                    isCompleted={completedDays.includes(day.day)}
                    onToggleComplete={() => toggleDay(day.day)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
