# RepForge — System Architecture

## High-Level Architecture
```
┌─────────────────┐     REST API      ┌─────────────────┐
│   React Client  │ ◄──────────────►  │  Express Server │
│   (Vite + TS)   │     JSON          │  (Node.js)      │
└─────────────────┘                   └────────┬────────┘
                                                │
                                                ▼
                                         ┌─────────────────┐
                                         │    MongoDB      │
                                         │   (Mongoose)    │
                                         └─────────────────┘
```

**Pattern:** Modular monolith — separate client/server apps, shared via REST.

---

## Technology Stack (Verified Versions)

| Layer | Technology | Version | Source |
|-------|------------|---------|--------|
| Frontend | React | 18.x | Official docs |
| Frontend | Vite | 5.x | Official docs |
| Frontend | Tailwind CSS | 4.x | Official docs |
| Frontend | shadcn/ui | Latest | GitHub releases |
| Frontend | React Router | 6.x | Official docs |
| Frontend | Axios | 1.x | Official docs |
| Frontend | TanStack Query | 5.x | Official docs |
| Frontend | Recharts | 2.x | Official docs |
| Frontend | Lucide React | 0.4.x | Official docs |
| Backend | Node.js | 20.x LTS | Official releases |
| Backend | Express.js | 4.x | Official docs |
| Backend | MongoDB | 7.x | Official docs |
| Backend | Mongoose | 8.x | Official docs |
| Backend | JWT (jsonwebtoken) | 9.x | Official docs |
| Backend | bcryptjs | 2.x | Official docs |
| Backend | Zod | 3.x | Official docs |
| Testing | Vitest | 1.x | Official docs |
| Testing | Supertest | 6.x | Official docs |

> **Note:** Exact versions to be locked in `package.json` during Phase 1 setup.

---

## Database Collections (Initial Design)

### Users
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  passwordHash: String,
  name: String,
  preferences: {
    units: 'metric' | 'imperial',
    experienceLevel: 'beginner' | 'intermediate' | 'advanced',
    defaultSplit: 'PPL' | 'UL' | 'UL-PPL' | 'custom',
    goals: ['strength' | 'hypertrophy' | 'endurance' | 'skill'],
    restTimerDefault: Number // seconds
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Exercises
```javascript
{
  _id: ObjectId,
  name: String,
  aliases: [String], // for search
  primaryMuscle: String,
  secondaryMuscles: [String],
  equipment: [String],
  type: 'weighted' | 'bodyweight' | 'assisted' | 'timed' | 'cardio',
  movementPattern: 'push' | 'pull' | 'legs' | 'core' | 'hinge' | 'carry',
  isCustom: Boolean,
  createdBy: ObjectId (ref: Users, null for seeded),
  createdAt: Date
}
```

### WorkoutTemplates
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  split: 'PPL' | 'UL' | 'UL-PPL' | 'full-body' | 'custom',
  days: [{
    dayName: String,
    exercises: [{
      exerciseId: ObjectId (ref: Exercises),
      order: Number,
      targetSets: Number,
      targetReps: String, // e.g., "8-12" or "5"
      targetWeight: Number,
      targetRir: Number,
      restSeconds: Number,
      notes: String
    }]
  }],
  isCustom: Boolean,
  createdBy: ObjectId (ref: Users),
  createdAt: Date,
  updatedAt: Date
}
```

### WorkoutSessions (Historical — Immutable Snapshots)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, indexed),
  templateId: ObjectId (ref: WorkoutTemplates, nullable),
  templateSnapshot: {
    // Full template copy at time of session start
    name: String,
    split: String,
    days: [...] // Same structure as template
  },
  status: 'in_progress' | 'completed' | 'abandoned',
  startedAt: Date,
  completedAt: Date,
  actualDurationSeconds: Number,
  dayIndex: Number, // Which day of the split
  performedExercises: [{
    exerciseId: ObjectId,
    exerciseName: String, // Denormalized for history
    sets: [{
      setNumber: Number,
      weight: Number,
      reps: Number,
      rir: Number,
      rpe: Number,
      isWarmup: Boolean,
      completedAt: Date
    }],
    restTakenSeconds: Number,
    notes: String
  }],
  sessionRpe: Number, // Overall session RPE 1-10
  createdAt: Date
}
```

### BodyMetrics
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, indexed),
  date: Date (indexed),
  weightKg: Number,
  bodyFatPercent: Number,
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    bicep: Number,
    thigh: Number,
    calf: Number
  },
  notes: String,
  createdAt: Date
}
```

---

## Embedding vs Referencing Decisions

| Relationship | Strategy | Rationale |
|--------------|----------|-----------|
| User → Sessions | Reference (indexed `userId`) | Sessions queried by user frequently; unbounded growth |
| Session → Template | Reference + Snapshot | Preserve history when template changes |
| Session → Exercises | Reference + Denormalized name | Exercise name needed for display without join |
| Template → Exercises | Reference | Exercises shared across templates |
| User → BodyMetrics | Reference (indexed `userId`) | Time-series queries by user |

---

## API Design (REST)

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, set HTTP-only cookie |
| POST | `/api/auth/logout` | Clear cookie |
| GET | `/api/auth/me` | Get current user (from cookie) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get profile + preferences |
| PATCH | `/api/users/profile` | Update preferences |
| PATCH | `/api/users/password` | Change password |

### Exercises
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/exercises` | List with filters (muscle, equipment, type, search) |
| GET | `/api/exercises/:id` | Get single exercise |
| POST | `/api/exercises` | Create custom exercise |
| PATCH | `/api/exercises/:id` | Update custom exercise |
| DELETE | `/api/exercises/:id` | Delete custom exercise |

### Workout Templates
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/templates` | List user's templates |
| GET | `/api/templates/:id` | Get template with full day structure |
| POST | `/api/templates` | Create template |
| PATCH | `/api/templates/:id` | Update template |
| DELETE | `/api/templates/:id` | Delete template |
| POST | `/api/templates/:id/duplicate` | Duplicate as new template |

### Workout Sessions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sessions` | List with pagination, filters |
| GET | `/api/sessions/:id` | Get full session |
| POST | `/api/sessions` | Start new session (from template or blank) |
| PATCH | `/api/sessions/:id` | Update in-progress session (add sets, notes) |
| POST | `/api/sessions/:id/complete` | Mark complete |
| POST | `/api/sessions/:id/abandon` | Mark abandoned |
| GET | `/api/sessions/:id/previous-performance` | Get last session for same day/exercises |

### Body Metrics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/body-metrics` | List with date range |
| POST | `/api/body-metrics` | Add entry |
| PATCH | `/api/body-metrics/:id` | Update entry |
| DELETE | `/api/body-metrics/:id` | Delete entry |

### Analytics (V2+)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/volume` | Weekly/monthly volume per muscle |
| GET | `/api/analytics/prs` | Personal records history |
| GET | `/api/analytics/estimated-1rm` | 1RM trends per exercise |
| GET | `/api/analytics/progressive-overload` | Recommendations for next session |
| GET | `/api/analytics/plateau` | Plateau detection results |
| GET | `/api/analytics/heatmap` | Muscle volume heatmap data |

---

## Security Architecture

- **JWT** in HTTP-only, Secure, SameSite=Strict cookies
- **bcrypt** with cost factor 12 for password hashing
- **Zod** validation on all incoming requests
- **Rate limiting**: 100 req/min general, 10 req/min auth
- **CORS**: Restricted to frontend origin
- **Helmet**: Security headers
- **No secrets in code** — all via environment variables

---

## Client Architecture (React)

```
client/src/
├── components/       # Reusable UI components (shadcn/ui based)
├── pages/            # Route-level components
├── features/         # Feature-specific logic (hooks, components, services)
│   ├── auth/
│   ├── exercises/
│   ├── templates/
│   ├── sessions/
│   ├── analytics/
│   └── bodyMetrics/
├── hooks/            # Shared custom hooks
├── services/         # API client (Axios + TanStack Query)
├── utils/            # Pure utility functions
└── main.jsx          # Entry point
```

### State Management
- **Server state**: TanStack Query (caching, invalidation, optimistic updates)
- **Client state**: React Context + useReducer for auth, UI state
- **Forms**: React Hook Form + Zod resolvers

---

## Backend Architecture (Express)

```
server/src/
├── config/           # DB connection, env validation
├── models/           # Mongoose schemas
├── controllers/      # Request handlers (thin)
├── routes/           # Route definitions
├── services/         # Business logic (thick)
├── middleware/       # Auth, validation, error handling, rate limit
└── utils/            # Pure utilities (calculations, helpers)
```

### Key Services (Business Logic)
- `progressiveOverloadService` — Double progression, RIR-based recommendations
- `plateauDetectionService` — Stall identification, suggestions
- `volumeCalculationService` — Weekly/monthly muscle group volume
- `estimated1RMService` — Epley/Brzycki formulas
- `schedulingService` — Adaptive rescheduling for missed sessions

---

## Data Flow Example: Active Workout Logging

```
1. User starts session → POST /api/sessions
   → Creates session with templateSnapshot
   
2. User logs set → PATCH /api/sessions/:id
   → Appends to performedExercises[].sets[]
   → Returns updated session + previous performance
   
3. User completes → POST /api/sessions/:id/complete
   → Calculates session analytics
   → Triggers PR detection
   → Updates user consistency metrics
   
4. Next session start → GET /api/sessions/:id/previous-performance
   → Returns last session's sets for same exercises
```

---

## Deployment Architecture (Post-MVP)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Vercel    │     │  Render/    │     │   MongoDB   │
│  (Client)   │────►│  Railway    │────►│   Atlas     │
│             │     │  (Server)   │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

- Client: Vercel (static + SPA routing)
- Server: Render or Railway (Node.js)
- Database: MongoDB Atlas (free tier → paid)
- CI/CD: GitHub Actions (lint, test, build, deploy)

---

## Decisions Recorded in DECISIONS.md
- [ ] JS over TS (learning focus)
- [ ] Tailwind v4 over v3
- [ ] Modular monolith over microservices
- [ ] HTTP-only cookies over localStorage for JWT
- [ ] Snapshot pattern for workout history
- [ ] Rule-based engine over external AI API