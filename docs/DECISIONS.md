# RepForge — Technical Decisions Log

> Record significant architectural and technical decisions with rationale.
> Format: **Decision** → **Context** → **Options Considered** → **Choice** → **Consequences**

---

## DEC-001: JavaScript over TypeScript
**Date:** 2026-11-25  
**Context:** Starting a learning-focused MERN project. Developer has JS experience from internship.  
**Options:** TypeScript (strict types), JavaScript ES6+ (current)  
**Choice:** JavaScript ES6+  
**Rationale:** 
- Reduces initial cognitive load; focus on architecture/patterns first
- TypeScript can be added incrementally later (rename `.js` → `.ts`, add types)
- JSDoc + Zod runtime validation provides safety without compile-time overhead
- Easier to read/debug for learning purposes

**Consequences:** 
- No compile-time type checking
- Must rely on Zod for runtime validation
- Future migration path exists

---

## DEC-002: Tailwind CSS v4 over v3
**Date:** 2026-11-25  
**Context:** v4 is the current major version with significant API changes.  
**Options:** Tailwind v3 (mature, many resources), Tailwind v4 (current, CSS-first)  
**Choice:** Tailwind CSS v4  
**Rationale:**
- v4 is the future; learning v3 creates rework
- CSS-first config (`@import "tailwindcss"`) is simpler
- Better performance, smaller bundle
- Official migration guide available

**Consequences:**
- Fewer community examples (but growing)
- Must verify all shadcn/ui components work with v4
- No `tailwind.config.js` — config via CSS

---

## DEC-003: Modular Monolith over Microservices
**Date:** 2026-11-25  
**Context:** Solo developer, learning project, MVP scope.  
**Options:** Microservices (separate deployables), Modular Monolith (single deploy, clear boundaries)  
**Choice:** Modular Monolith  
**Rationale:**
- Single deployment = simpler DevOps
- Clear module boundaries (client/server, features) enforce discipline
- Can extract services later if genuinely needed
- Matches team size (1) and project scope

**Consequences:**
- All code in one repo
- Shared database (MongoDB)
- Scaling is vertical first

---

## DEC-004: JWT in HTTP-only Cookies over localStorage
**Date:** 2026-11-25  
**Context:** Authentication strategy for SPA.  
**Options:** localStorage + Authorization header, HTTP-only cookies  
**Choice:** HTTP-only, Secure, SameSite=Strict cookies  
**Rationale:**
- XSS cannot steal tokens (HttpOnly)
- CSRF mitigated by SameSite=Strict + double-submit pattern if needed
- Automatic credential handling (no manual header attachment)
- Industry best practice for browser apps

**Consequences:**
- Requires proper CORS configuration (credentials: include)
- Cookie size limits (keep JWT small)
- Slightly more complex logout (must clear cookie server-side)

---

## DEC-005: Snapshot Pattern for Workout History
**Date:** 2026-11-25  
**Context:** Workout templates evolve; historical sessions must reflect template *at time of execution*.  
**Options:** Reference template only, Full snapshot at session start  
**Choice:** Full template snapshot embedded in WorkoutSession  
**Rationale:**
- Templates change (exercises added, reps modified)
- Historical accuracy: user sees what they *actually did*
- No complex versioning/temporal queries needed
- Storage cost negligible (session ~2-5KB)

**Consequences:**
- Data duplication (template copied per session)
- Template updates don't affect past sessions
- Migration needed if snapshot schema changes

---

## DEC-006: Rule-Based Engine over External AI API
**Date:** 2026-11-25  
**Context:** Progressive overload, plateau detection, scheduling features.  
**Options:** OpenAI/Claude API, Custom rule-based algorithms  
**Choice:** Rule-based algorithms (pure JS functions)  
**Rationale:**
- Zero recurring cost
- Fully explainable (critical for fitness — users trust what they understand)
- Works offline
- Demonstrates algorithmic thinking (portfolio value)
- No latency, rate limits, or vendor lock-in

**Consequences:**
- Limited to predefined rules
- Requires domain knowledge to tune
- No "AI magic" marketing angle

---

## DEC-007: MongoDB over PostgreSQL
**Date:** 2026-11-25  
**Context:** Document-oriented workout data with variable structures.  
**Options:** PostgreSQL (relational), MongoDB (document)  
**Choice:** MongoDB with Mongoose  
**Rationale:**
- Workout sessions have nested, variable structures (sets, exercises per day)
- JSON-like documents map naturally to session snapshots
- Flexible schema for exercise types (weighted, bodyweight, timed, assisted)
- Mongoose provides validation + population
- Developer has MongoDB experience from internship

**Consequences:**
- No ACID transactions across collections (use application-level logic)
- Aggregation pipelines for analytics (learning opportunity)
- Must design indexes carefully

---

## DEC-008: TanStack Query over Redux/SWR
**Date:** 2026-11-25  
**Context:** Server state management in React.  
**Options:** Redux Toolkit + RTK Query, SWR, TanStack Query  
**Choice:** TanStack Query (React Query)  
**Rationale:**
- Purpose-built for server state (caching, invalidation, optimistic updates)
- Excellent TypeScript/JS support
- Devtools for debugging
- Mutation + query invalidation pattern fits workout logging perfectly
- Smaller bundle than Redux

**Consequences:**
- Learning curve for cache invalidation patterns
- Not for client state (use Context + useReducer)

---

## DEC-009: shadcn/ui over Material UI / Chakra
**Date:** 2026-11-25  
**Context:** Component library choice.  
**Options:** Material UI, Chakra UI, shadcn/ui, Headless UI + custom  
**Choice:** shadcn/ui  
**Rationale:**
- Copy-paste ownership (no hidden abstraction)
- Built on Radix UI (accessible primitives)
- Tailwind-native (no CSS-in-JS)
- Learn component internals by reading source
- Easy to customize

**Consequences:**
- More initial setup (install components individually)
- No pre-built complex components (data tables, date pickers)
- Must compose patterns yourself

---

## DEC-010: Vitest + Supertest over Jest
**Date:** 2026-11-25  
**Context:** Testing stack.  
**Options:** Jest, Vitest + Supertest  
**Choice:** Vitest + Supertest  
**Rationale:**
- Native ESM support (matches Vite)
- Faster (Vite-powered)
- Same API as Jest (easy migration)
- Supertest for Express integration tests

**Consequences:**
- Smaller ecosystem than Jest (but growing)
- Some Jest-specific libs incompatible