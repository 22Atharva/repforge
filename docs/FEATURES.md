# RepForge — Complete Feature Backlog

## V1 — Core Workout Tracking (0/18 complete)

| ID | Feature | Description |
|----|---------|-------------|
| F01 | User registration and login | Email/password auth with JWT in HTTP-only cookies |
| F02 | User profile and fitness preferences | Goals, experience level, preferred splits, units |
| F03 | Searchable exercise library | Filter by muscle, equipment, type; seeded + custom |
| F04 | Custom exercise creation | User-defined exercises with metadata |
| F05 | Custom workout routine builder | Drag-drop routine builder from exercise library |
| F06 | Training split management | PPL, UL, UL-PPL, full-body, custom splits |
| F07 | Active workout logging | Start/pause/finish workout sessions |
| F08 | Weight, repetitions, sets and RIR tracking | Per-set logging with RIR/RPE |
| F09 | Rest timer | Configurable rest periods with notifications |
| F10 | Previous workout performance display | Show last session's sets during active workout |
| F11 | Active workout persistence | Survives app close/refresh; resume capability |
| F12 | Workout history and calendar | Browse past sessions, filter by date/split |
| F13 | Personal record detection | Auto-detect 1RM, volume, rep PRs |
| F14 | Training volume analytics | Weekly/monthly volume per muscle group |
| F15 | Estimated 1RM tracking | Epley/Brzycki formulas with history |
| F16 | Bodyweight tracking | Weight logs with trend visualization |
| F17 | Dashboard and training consistency | Streaks, frequency, adherence metrics |
| F18 | CSV import and export | Backup/restore workout data |

---

## V2 — Intelligent Training (0/9 complete)

| ID | Feature | Description |
|----|---------|-------------|
| F19 | Progressive overload engine | Double progression + RIR-based weight/rep recommendations |
| F20 | Plateau detection | Stall detection across comparable sessions with suggestions |
| F21 | Muscle volume heatmap | Visual weekly distribution across muscle groups |
| F22 | Adaptive workout scheduling | Constraint-based rescheduling for missed sessions |
| F23 | Calisthenics skill trees | DAG-based progressions (muscle-up, L-sit, planche, etc.) |
| F24 | Deload week automation | Auto-schedule deloads based on fatigue signals |
| F25 | Exercise substitution | Smart alternatives when equipment unavailable |
| F26 | Weak point identification | Lagging muscle groups from volume/strength ratios |
| F27 | Periodization templates | Linear, undulating, block periodization presets |

---

## V3 — Optional Future Expansion (0/7 complete)

| ID | Feature | Description |
|----|---------|-------------|
| F28 | Social features | Follow, share workouts, leaderboards |
| F29 | Wearable integration | Apple Health, Google Fit, Garmin sync |
| F30 | Nutrition tracking | Basic macros, meal logging |
| F31 | Video form analysis | Upload + reference comparison |
| F32 | Coach mode | Trainer-client workflow |
| F33 | Offline-first PWA | Service worker, IndexedDB sync |
| F34 | Multi-language support | i18n for global audience |

---

## Development Notes
- Cursor expands each feature into functional requirements and acceptance criteria when its phase begins.
- Target: V1 + 2–3 well-executed V2 features = substantial portfolio project.
- Do not implement all 34 features.