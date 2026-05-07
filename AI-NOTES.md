# 🤖 AI-NOTES.md — How AI Was Used in This Project

This file documents where and how AI tooling assisted in building `the-practice-log`. See [AI-WORKFLOW.md](https://github.com/melscodingcave/the-playbook/blob/main/AI-WORKFLOW.md) in `the-playbook` for the full philosophy.

---

## Log

### Drill Type List — Domain Knowledge Override
**What happened:** AI suggested generic drill categories including "Run Out Practice" and "One Pocket."

**What I changed:** Replaced with accurate billiards practice drill types: Straight-ins, Cut Shots, Cue Ball Control, Breaking, Safety Shots, Kick Shots, Bank Shots, Ghost.

**Why it matters:** Generic categories wouldn't reflect how billiards players actually practice. Domain knowledge drove the correction.

---

### Shot Logger UX — Accordion Pattern
**What happened:** AI built a flat form with all fields visible at once.

**What I changed:** Proposed and directed an accordion pattern — each shot collapses after saving showing a summary line, with "Add Shot" always available below.

**Why it matters:** The flat form became overwhelming as shots accumulated. The accordion keeps the UI compact while maintaining full shot history visibility. UX decision driven by real usage patterns.

---

### Shots Required to Save Session — Removed
**What happened:** AI initially required at least one shot before saving a session.

**What I changed:** Made shots optional — sessions can be saved with notes only.

**Why it matters:** Ghost ball practice and game-play sessions don't always lend themselves to shot-by-shot logging. Forcing shot entry would make the tool less useful for real practice scenarios.

---

### AI Debrief — Markdown Rendering
**What happened:** Claude returned markdown formatted responses. Multiple attempts to render markdown via ReactMarkdown and Tailwind typography plugin failed to parse correct