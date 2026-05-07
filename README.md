# 🎱 The Practice Log

A billiards practice session tracker with AI-powered coaching feedback.

Built as a portfolio project to demonstrate React, TypeScript, Vite, Tailwind CSS, component architecture, and real-world AI API integration.

---

## 🛠 Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **AI:** Anthropic Claude API (claude-sonnet-4-5)
- **Persistence:** Browser localStorage

---

## ✨ Features

- Log practice sessions with drill type and notes
- Track individual shots — cue ball contact point, power, and result
- View session history with per-shot breakdown
- Visualize made/missed trends over time by drill type
- Get AI-powered coaching feedback on any session

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Create a `.env` file in the root: VITE_ANTHROPIC_API_KEY=your-api-key-here

---

## 🎱 Drill Types Supported

Straight-ins, Cut Shots, Cue Ball Control, Breaking, Safety Shots, Kick Shots, Bank Shots, Ghost

---

## 🤖 AI-Assisted Development

See [AI-NOTES.md](./AI-NOTES.md) for a transparent log of how AI tooling was used in this project.

---

## 🔗 Related Projects

- **[cue-qa](https://github.com/melscodingcave/cue-qa)** — Playwright E2E test suite for this app