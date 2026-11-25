# RepForge

> Intelligent MERN stack strength training tracker — built for learning, designed for the gym.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## Overview

RepForge is a full-stack fitness application for tracking workouts, analysing strength progression, and receiving personalised training recommendations. It's built as a **learning-first software engineering project** — every architectural decision, algorithm, and line of code is documented to demonstrate not just *what* was built, but *why*.

**Core philosophy:** Clarity over complexity. Understanding over blind execution. Working software over unnecessary features.

---

## Features

### V1 — Core Workout Tracking (In Progress)
- 🔐 **Authentication** — JWT in HTTP-only cookies, protected routes
- 📚 **Exercise Library** — Searchable, filterable, with custom exercise creation
- 📋 **Workout Planner** — Drag-drop routine builder, split management (PPL, UL, UL-PPL, custom)
- ⏱️ **Active Workout Logging** — Set tracking (weight, reps, RIR), rest timer, previous performance display
- 📅 **History & Calendar** — Session browsing, calendar view, detail drill-down
- 📊 **Analytics** — Training volume, personal records, estimated 1RM, consistency dashboard

### V2 — Intelligent Training (Planned)
- 🧠 **Progressive Overload Engine** — Double progression + RIR-based weight/rep recommendations
- 📉 **Plateau Detection** — Statistical stall identification with explainable suggestions
- 🔥 **Muscle Volume Heatmap** — Weekly distribution across muscle groups
- 🔄 **Adaptive Scheduling** — Constraint-based rescheduling for missed sessions
- 🤸 **Calisthenics Skill Trees** — DAG-based progressions (muscle-up, L-sit, planche)

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Vite 5, Tailwind CSS v4, shadcn/ui, React Router 6, TanStack Query 5, Recharts, Axios |
| **Backend** | Node.js 20, Express 4, MongoDB 7, Mongoose 8, JWT, bcryptjs, Zod |
| **Testing** | Vitest, Supertest |
| **DevOps** | Git, GitHub Actions, Docker (planned) |

---

## Architecture

```
┌─────────────┐     REST API      ┌─────────────┐
│   Client    │ ◄──────────────►  │   Server    │
│  (React)    │     JSON          │  (Express)  │
└─────────────┘                   └──────┬──────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │  MongoDB    │
                                   │  (Mongoose) │
                                   └─────────────┘
```

**Pattern:** Modular monolith — separate client/server apps communicating via REST.

Key architectural decisions documented in [`docs/DECISIONS.md`](docs/DECISIONS.md).

---

## Project Structure

```
repforge/
├── .cursor/rules/       # AI development guidelines
├── docs/                # Engineering documentation
│   ├── PROJECT.md       # Goals & scope
│   ├── FEATURES.md      # Complete feature backlog
│   ├── ARCHITECTURE.md  # System design, DB, API
│   ├── LEARNING.md      # Personal learning roadmap
│   ├── TASKS.md         # Development task backlog
│   ├── DECISIONS.md     # Technical decision log
│   ├── DEVLOG.md        # Genuine debugging journal
│   └── README.md        # This file
├── client/              # React frontend
│   └── src/
│       ├── components/  # Reusable UI (shadcn/ui)
│       ├── pages/       # Route components
│       ├── features/    # Feature modules (auth, exercises, templates, sessions, analytics)
│       ├── hooks/       # Shared hooks
│       ├── services/    # API client (Axios + TanStack Query)
│       └── utils/       # Utilities
├── server/              # Express backend
│   └── src/
│       ├── config/      # DB, env validation
│       ├── models/      # Mongoose schemas
│       ├── controllers/ # Request handlers
│       ├── routes/      # Route definitions
│       ├── services/    # Business logic (algorithms)
│       ├── middleware/  # Auth, validation, errors
│       └── utils/       # Pure utilities
├── .gitignore
├── .env.example
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 20+ LTS
- MongoDB (local or Atlas)
- npm 9+

### Installation

```bash
# Clone repository
git clone https://github.com/22Atharva/repforge.git
cd repforge

# Install dependencies (client + server)
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.

# Start development servers (client + server concurrently)
npm run dev
```

### Environment Variables

```env
# Server
PORT=5000
MONGODB_URI=mongodb://localhost:27017/repforge
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=another-secret-min-32-chars
REFRESH_TOKEN_EXPIRES_IN=7d
NODE_ENV=development

# Client
VITE_API_URL=http://localhost:5000/api
```

---

## Development Workflow

This project follows a disciplined, learning-first process documented in `.cursor/rules/`:

1. **Plan** — Read docs, understand feature, define acceptance criteria
2. **Learn** — Study prerequisites in `docs/LEARNING.md`
3. **Implement** — Write code with AI assistance, but understand every line
4. **Test** — Run unit/integration tests, manual verification
5. **Document** — Update LEARNING.md, DEVLOG.md, DECISIONS.md
6. **Commit** — Conventional commits, meaningful messages
7. **Review** — Diff review before push

See [`docs/TASKS.md`](docs/TASKS.md) for current task backlog.

---

## Learning Roadmap

The [`docs/LEARNING.md`](docs/LEARNING.md) tracks 62 concepts across 8 phases — from Git basics to production DevOps. Each concept has:
- Prerequisites & resources
- Practical exercises
- Self-assessment questions
- Interview preparation questions

---

## Development Log

Genuine bugs, fixes, and lessons learned in [`docs/DEVLOG.md`](docs/DEVLOG.md). This becomes your interview answer bank for *"What was the hardest problem you solved?"*

---

## License

MIT — Built for learning and portfolio demonstration.

---

## Author

**Atharva** — Software Engineer in progress  
GitHub: [@22Atharva](https://github.com/22Atharva)

> *"The objective isn't simply to finish RepForge. It's to become a better software engineer by building RepForge."*