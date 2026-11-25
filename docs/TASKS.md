# RepForge — Development Task Backlog

> Each task: ID, Feature ref, Learning prerequisites, Acceptance criteria
> Status: `Pending` → `In Progress` → `Review` → `Done`

---

## Phase 0 — Project Initialization

### T-001: Initialise project repository
**Phase:** 0  
**Status:** In Progress  
**Dependencies:** None  
**Feature Ref:** — (Foundation)  
**Learning Prerequisites:** L-001, L-002, L-004, L-005  

**Objective**
Create the initial project structure, documentation, Cursor rules, and Git repository.

**Implementation Requirements**
- [x] Create folder structure: `.cursor/rules/`, `docs/`
- [x] Create 5 Cursor rule files (project, technology, workflow, learning, git)
- [x] Create 8 documentation files (PROJECT, FEATURES, ARCHITECTURE, LEARNING, TASKS, DECISIONS, DEVLOG, README)
- [x] Configure `.gitignore`
- [x] Initialize Git repository
- [ ] Connect GitHub remote (awaiting username)
- [ ] Push initial commits

**Acceptance Criteria**
- [x] Git repository initialised with `main` branch
- [x] All 5 rule files present in `.cursor/rules/`
- [x] All 8 docs present in `docs/`
- [x] `.gitignore` excludes `node_modules`, `.env`, `.env.local`, `dist`, `build`, `*.log`, `.DS_Store`
- [ ] GitHub remote configured as `origin`
- [ ] Initial commits pushed successfully

**Verification**
- `git status` shows clean working tree
- `git remote -v` shows correct origin
- `git log --oneline` shows 2+ commits

**Proposed Commits**
1. `docs: define project goals and learning roadmap`
2. `chore: configure AI-assisted development rules`

---

## Phase 1 — MERN Setup

### T-002: Initialise client (React + Vite + Tailwind v4)
**Phase:** 1  
**Status:** Pending  
**Dependencies:** T-001  
**Feature Ref:** — (Infrastructure)  
**Learning Prerequisites:** L-007, L-008, L-009, L-010, L-012  

**Objective**
Scaffold the React frontend with Vite, configure Tailwind CSS v4, and add shadcn/ui.

**Acceptance Criteria**
- [ ] `client/` folder with Vite + React + JS
- [ ] Tailwind v4 configured (not v3 config)
- [ ] shadcn/ui installed with at least Button, Card, Input components
- [ ] ESLint + Prettier configured
- [ ] `npm run dev` starts without errors
- [ ] Basic layout with header, main, responsive container

---

### T-003: Initialise server (Express + MongoDB + Auth skeleton)
**Phase:** 1  
**Status:** Pending  
**Dependencies:** T-001  
**Feature Ref:** — (Infrastructure)  
**Learning Prerequisites:** L-011, L-014, L-015, L-018, L-021  

**Objective**
Scaffold the Express backend with MongoDB connection, middleware stack, and project structure.

**Acceptance Criteria**
- [ ] `server/` folder with Express + JS (ES modules)
- [ ] MongoDB connection via Mongoose (with connection pooling)
- [ ] Middleware: CORS, Helmet, rate-limit, body-parser, error handler
- [ ] Environment validation (Zod schema for env vars)
- [ ] `npm run dev` starts server on configured port
- [ ] Health check endpoint `GET /api/health` returns `{ status: 'ok' }`
- [ ] Concurrent dev script runs client + server

---

### T-004: Configure development tooling
**Phase:** 1  
**Status:** Pending  
**Dependencies:** T-002, T-003  
**Feature Ref:** — (Infrastructure)  
**Learning Prerequisites:** L-012, L-013  

**Objective**
Unify tooling across client and server.

**Acceptance Criteria**
- [ ] Root `package.json` with workspaces or concurrent scripts
- [ ] Shared ESLint config (or compatible separate configs)
- [ ] Shared Prettier config
- [ ] `npm run lint` passes on both client and server
- [ ] `npm run format` formats all files
- [ ] Git hooks via Husky (pre-commit: lint + format)

---

## Phase 2 — Authentication

### T-005: User model & registration endpoint
**Phase:** 2  
**Status:** Pending  
**Dependencies:** T-003  
**Feature Ref:** F01  
**Learning Prerequisites:** L-015, L-016, L-017, L-019  

**Objective**
Implement User Mongoose model and `POST /api/auth/register`.

**Acceptance Criteria**
- [ ] User model with email (unique), passwordHash, name, preferences
- [ ] Zod schema for registration input validation
- [ ] bcrypt hashing (cost 12)
- [ ] JWT token generation (access + refresh strategy)
- [ ] HTTP-only, Secure, SameSite=Strict cookie set
- [ ] Returns user object (no password hash)
- [ ] Supertest coverage: success, duplicate email, invalid input

---

### T-006: Login, logout, and session verification
**Phase:** 2  
**Status:** Pending  
**Dependencies:** T-005  
**Feature Ref:** F01  
**Learning Prerequisites:** L-016, L-018, L-020  

**Objective**
Complete auth flow: login, logout, `GET /api/auth/me`.

**Acceptance Criteria**
- [ ] `POST /api/auth/login` — validates credentials, sets cookie
- [ ] `POST /api/auth/logout` — clears cookie
- [ ] `GET /api/auth/me` — returns current user from cookie
- [ ] Protected route middleware (verifies JWT from cookie)
- [ ] Client auth context + hooks (useAuth, useUser)
- [ ] Supertest coverage: all endpoints + error cases

---

### T-007: Client auth pages & protected routing
**Phase:** 2  
**Status:** Pending  
**Dependencies:** T-002, T-006  
**Feature Ref:** F01, F02  
**Learning Prerequisites:** L-008, L-020, L-026, L-027  

**Objective**
Build Register, Login, Profile pages with form validation and protected routes.

**Acceptance Criteria**
- [ ] `/register` page with React Hook Form + Zod
- [ ] `/login` page with React Hook Form + Zod
- [ ] `/profile` page showing preferences (editable)
- [ ] Protected route wrapper (redirects to `/login` if unauthenticated)
- [ ] Auth state persisted via TanStack Query + cookie
- [ ] Responsive, accessible forms (labels, errors, loading states)
- [ ] Vitest coverage for form validation logic

---

## Phase 3 — Exercise Library

### T-008: Exercise model & CRUD API
**Phase:** 3  
**Status:** Pending  
**Dependencies:** T-003  
**Feature Ref:** F03, F04  
**Learning Prerequisites:** L-015, L-019, L-023, L-024  

**Objective**
Exercise Mongoose model and full CRUD REST API.

**Acceptance Criteria**
- [ ] Exercise model (see ARCHITECTURE.md)
- [ ] `GET /api/exercises` — paginated, filterable (muscle, equipment, type, search)
- [ ] `GET /api/exercises/:id` — single exercise
- [ ] `POST /api/exercises` — create custom exercise (auth required)
- [ ] `PATCH /api/exercises/:id` — update own custom exercise
- [ ] `DELETE /api/exercises/:id` — delete own custom exercise
- [ ] Text index on name + aliases for search
- [ ] Supertest coverage for all endpoints

---

### T-009: Seed exercise library
**Phase:** 3  
**Status:** Pending  
**Dependencies:** T-008  
**Feature Ref:** F03  
**Learning Prerequisites:** L-024  

**Objective**
Populate database with ~100 standard exercises.

**Acceptance Criteria**
- [ ] Seed script runnable via `npm run db:seed`
- [ ] Covers all major movement patterns (push, pull, legs, hinge, core, carry)
- [ ] Includes equipment variations (barbell, dumbbell, machine, cable, bodyweight, bands)
- [ ] Each exercise has primary/secondary muscles, type, equipment array
- [ ] Idempotent (safe to run multiple times)

---

### T-010: Exercise library UI
**Phase:** 3  
**Status:** Pending  
**Dependencies:** T-002, T-008  
**Feature Ref:** F03, F04  
**Learning Prerequisites:** L-025, L-026, L-027, L-029  

**Objective**
Searchable, filterable exercise browser with custom exercise creation.

**Acceptance Criteria**
- [ ] `/exercises` page with search, muscle filter, equipment filter, type filter
- [ ] Infinite scroll or pagination (TanStack Query)
- [ ] Exercise detail modal/drawer
- [ ] "Create Exercise" form (modal) with validation
- [ ] Custom exercises marked visually
- [ ] Responsive grid/list toggle
- [ ] Vitest for filter/search logic

---

## Phase 4 — Workout Planner

### T-011: WorkoutTemplate model & CRUD API
**Phase:** 4  
**Status:** Pending  
**Dependencies:** T-008  
**Feature Ref:** F05, F06  
**Learning Prerequisites:** L-015, L-019, L-032, L-033  

**Objective**
Template model with day/exercise structure and CRUD API.

**Acceptance Criteria**
- [ ] WorkoutTemplate model (see ARCHITECTURE.md)
- [ ] `GET /api/templates` — list user's templates
- [ ] `GET /api/templates/:id` — full template with days/exercises
- [ ] `POST /api/templates` — create from exercise library
- [ ] `PATCH /api/templates/:id` — update (reorder days, exercises, edit sets)
- [ ] `DELETE /api/templates/:id` — delete
- [ ] `POST /api/templates/:id/duplicate` — clone as new
- [ ] Supertest coverage

---

### T-012: Workout planner UI (template builder)
**Phase:** 4  
**Status:** Pending  
**Dependencies:** T-010, T-011  
**Feature Ref:** F05, F06  
**Learning Prerequisites:** L-030, L-031, L-034, L-035  

**Objective**
Visual routine builder with drag-and-drop, split selection.

**Acceptance Criteria**
- [ ] `/planner` page — list templates, create new
- [ ] Template editor: split selector (PPL, UL, UL-PPL, Full, Custom)
- [ ] Day tabs/accordion with exercise list
- [ ] Add exercise from library (searchable modal)
- [ ] Per-exercise: target sets, rep range, weight, RIR, rest
- [ ] Drag-drop reorder exercises within day, reorder days
- [ ] Mobile-friendly (drawer for exercise picker)
- [ ] Save → creates template via API
- [ ] Vitest for template serialization

---

## Phase 5 — Workout Logging

### T-013: WorkoutSession model & session management API
**Phase:** 5  
**Status:** Pending  
**Dependencies:** T-011  
**Feature Ref:** F07, F08, F11  
**Learning Prerequisites:** L-015, L-032, L-033, L-037  

**Objective**
Session model with snapshot pattern and start/complete/abandon endpoints.

**Acceptance Criteria**
- [ ] WorkoutSession model (see ARCHITECTURE.md — immutable snapshot)
- [ ] `POST /api/sessions` — start from template or blank
- [ ] `PATCH /api/sessions/:id` — append sets, update rest, notes
- [ ] `POST /api/sessions/:id/complete` — finalize, trigger analytics
- [ ] `POST /api/sessions/:id/abandon` — mark abandoned
- [ ] `GET /api/sessions/:id/previous-performance` — last session for same day
- [ ] Optimistic locking (version field) for concurrent updates
- [ ] Supertest coverage

---

### T-014: Active workout UI (logging interface)
**Phase:** 5  
**Status:** Pending  
**Dependencies:** T-012, T-013  
**Feature Ref:** F07, F08, F09, F10, F11  
**Learning Prerequisites:** L-036, L-037, L-038, L-039, L-040, L-041, L-042  

**Objective**
Mobile-first active workout screen with set logging, rest timer, previous performance.

**Acceptance Criteria**
- [ ] `/workout/:sessionId` — main logging screen
- [ ] Exercise list with expandable set rows
- [ ] Set input: weight (numeric), reps (numeric), RIR (0-10 slider), warmup toggle
- [ ] Rest timer: auto-starts after set, configurable, pause/resume, sound/vibration
- [ ] "Previous" button shows last session's sets for that exercise
- [ ] Persist to localStorage every 5s + on blur (resume after refresh)
- [ ] Keyboard-friendly: Enter to add set, arrow keys to navigate
- [ ] "Complete Workout" → calls complete endpoint, redirects to summary
- [ ] Vitest for timer logic, persistence helpers

---

### T-015: Workout history & calendar
**Phase:** 5  
**Status:** Pending  
**Dependencies:** T-013  
**Feature Ref:** F12  
**Learning Prerequisites:** L-027, L-048  

**Objective**
Browse past sessions with calendar view and filters.

**Acceptance Criteria**
- [ ] `/history` page with monthly calendar (color-coded by split)
- [ ] List view with pagination (TanStack Query)
- [ ] Filters: date range, split, completed/abandoned
- [ ] Click session → navigate to session detail
- [ ] Session detail: all sets, duration, volume, PRs marked
- [ ] Responsive: calendar on desktop, list on mobile

---

## Phase 6 — Analytics

### T-016: Volume analytics API & service
**Phase:** 6  
**Status:** Pending  
**Dependencies:** T-013  
**Feature Ref:** F14  
**Learning Prerequisites:** L-043, L-044, L-046  

**Objective**
Aggregation pipeline for weekly/monthly volume per muscle group.

**Acceptance Criteria**
- [ ] `volumeCalculationService` — pure functions for volume math
- [ ] `GET /api/analytics/volume` — query params: `startDate`, `endDate`, `groupBy` (week/month)
- [ ] Returns: `{ muscleGroup, weekStart, totalSets, totalReps, totalVolumeKg }[]`
- [ ] Handles weighted, bodyweight, assisted exercises correctly
- [ ] Unit tests (Vitest) for volume calculations

---

### T-017: PR detection & estimated 1RM
**Phase:** 6  
**Status:** Pending  
**Dependencies:** T-013  
**Feature Ref:** F13, F15  
**Learning Prerequisites:** L-046, L-047  

**Objective**
Auto-detect PRs and calculate 1RM history per exercise.

**Acceptance Criteria**
- [ ] `estimated1RMService` — Epley & Brzycki formulas
- [ ] PR detection on session complete: 1RM PR, volume PR, rep PR
- [ ] `GET /api/analytics/prs` — list with date, exercise, type, value
- [ ] `GET /api/analytics/estimated-1rm/:exerciseId` — time series
- [ ] Unit tests for formulas and PR logic

---

### T-018: Dashboard & charts
**Phase:** 6  
**Status:** Pending  
**Dependencies:** T-016, T-017  
**Feature Ref:** F17  
**Learning Prerequisites:** L-045, L-048  

**Objective**
Main dashboard with consistency metrics and visualizations.

**Acceptance Criteria**
- [ ] `/dashboard` page
- [ ] Consistency: current streak, longest streak, sessions this month, adherence %
- [ ] Volume chart: weekly volume (Recharts area/bar)
- [ ] 1RM trend chart: per exercise (Recharts line)
- [ ] Muscle distribution: heatmap or stacked bar (Recharts)
- [ ] Bodyweight trend (if data exists)
- [ ] Responsive grid layout
- [ ] Loading/skeleton states

---

## Phase 7 — Intelligent Features (V2)

### T-019: Progressive overload engine
**Phase:** 7  
**Status:** Pending  
**Dependencies:** T-014, T-017  
**Feature Ref:** F19  
**Learning Prerequisites:** L-049, L-050, L-055  

**Objective**
Double progression + RIR-based recommendations for next session.

**Acceptance Criteria**
- [ ] `progressiveOverloadService` — pure functions
- [ ] Input: last 3 sessions for exercise, current RIR trend
- [ ] Output: `{ action: 'increase_weight' | 'increase_reps' | 'maintain', weightDelta, repTarget, reasoning }`
- [ ] Rules: RIR ≤ 1 → increase weight; RIR 2-3 → increase reps; RIR ≥ 4 → maintain
- [ ] `GET /api/analytics/progressive-overload/:exerciseId` — recommendation
- [ ] Display in active workout UI as "Suggested next set"
- [ ] Unit tests for all rule branches

---

### T-020: Plateau detection
**Phase:** 7  
**Status:** Pending  
**Dependencies:** T-017  
**Feature Ref:** F20  
**Learning Prerequisites:** L-051, L-055  

**Objective**
Identify stalled exercises and suggest actionable changes.

**Acceptance Criteria**
- [ ] `plateauDetectionService` — statistical stall detection
- [ ] Criteria: no 1RM improvement in 6+ comparable sessions over 4+ weeks
- [ ] `GET /api/analytics/plateau` — list of plateaued exercises with suggestions
- [ ] Suggestions: deload, rep range change, exercise variant, volume increase
- [ ] Unit tests with synthetic session data

---

### T-021: Muscle volume heatmap
**Phase:** 7  
**Status:** Pending  
**Dependencies:** T-016  
**Feature Ref:** F21  
**Learning Prerequisites:** L-045, L-046  

**Objective**
Visual weekly muscle group distribution.

**Acceptance Criteria**
- [ ] `GET /api/analytics/heatmap` — returns `{ muscle, dayOfWeek, volume }[]`
- [ ] Dashboard heatmap component (CSS grid or SVG)
- [ ] Color intensity = relative volume
- [ ] Tooltip shows exact sets/reps/volume
- [ ] Week selector (current, previous, custom)

---

## Phase 8 — Production Engineering

### T-022: Docker configuration
**Phase:** 8  
**Status:** Pending  
**Dependencies:** T-004  
**Learning Prerequisites:** L-056  

**Objective**
Multi-stage Dockerfiles for client and server.

---

### T-023: GitHub Actions CI/CD
**Phase:** 8  
**Status:** Pending  
**Dependencies:** T-022  
**Learning Prerequisites:** L-057  

**Objective**
Lint, test, build, deploy on push to main.

---

### T-024: Security audit & hardening
**Phase:** 8  
**Status:** Pending  
**Dependencies:** T-003  
**Learning Prerequisites:** L-061  

**Objective**
npm audit, dependency review, OWASP checks.

---

## Task Status Summary

| Phase | Total | Done | In Progress | Pending |
|-------|-------|------|-------------|---------|
| 0     | 1     | 0    | 1           | 0       |
| 1     | 3     | 0    | 0           | 3       |
| 2     | 3     | 0    | 0           | 3       |
| 3     | 3     | 0    | 0           | 3       |
| 4     | 2     | 0    | 0           | 2       |
| 5     | 3     | 0    | 0           | 3       |
| 6     | 3     | 0    | 0           | 3       |
| 7     | 3     | 0    | 0           | 3       |
| 8     | 3     | 0    | 0           | 3       |
| **Total** | **24** | **0** | **1** | **23** |

---

## Next Task to Approve

**T-001** is in progress — completing Git init, GitHub remote, and initial push.

Once pushed, **T-002** (Client scaffold) and **T-003** (Server scaffold) can begin in parallel.