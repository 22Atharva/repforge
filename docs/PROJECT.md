# RepForge — Project Goals and Scope

## Project Overview
RepForge is a MERN stack gym and strength training tracker designed to help users plan workouts, record training sessions, analyse performance and progressively improve their strength.

This is both a practical fitness application and a learning-focused software engineering project.

## Primary Goals
- Build a reliable, usable and maintainable fitness tracker.
- Develop full-stack software engineering skills throughout implementation.
- Create a mobile-first workout logging experience.
- Provide meaningful training analytics.
- Develop explainable fitness recommendation algorithms.
- Produce a portfolio project that the developer can confidently explain.

## Product Requirements
- Prioritise core workout tracking before advanced features.
- Keep workout logging fast and intuitive.
- Support weighted, bodyweight, assisted and timed exercises.
- Separate workout templates from actual workout sessions.
- Preserve historical records when templates are modified.
- Display previous performance during active workouts.
- Make training recommendations explainable.
- Do not present heuristic fitness estimates as medically validated measurements.

## Scope Management
- Implement only approved features.
- Do not introduce unrelated functionality or future features prematurely.
- Prefer a smaller working application over a larger incomplete application.
- Clarity, correctness and learning take priority over development speed.

## Source of Truth
| Document | Responsibility |
|----------|----------------|
| PROJECT.md | Project goals and scope |
| FEATURES.md | Complete feature list and requirements |
| ARCHITECTURE.md | System design, database and API design |
| LEARNING.md | Personal learning roadmap and progress |
| TASKS.md | Development backlog and current task |
| DECISIONS.md | Why important technical decisions were made |
| DEVLOG.md | Genuine development experiences, bugs and fixes |
| README.md | Public GitHub project introduction |

## What Makes RepForge Unique
1. **Progressive Overload Engine** — Recommends whether to increase weight, reps, or maintain based on previous training
2. **Plateau Detection** — Identifies stalled performance across comparable sessions with explainable suggestions
3. **Muscle Volume Heatmap** — Weekly training distribution across muscle groups with weighted scoring
4. **Adaptive Workout Scheduling** — Missed a day? Get a revised schedule without destroying your split
5. **Calisthenics Skill Trees** — Unlock progressions (muscle-ups, L-sits) via prerequisite DAGs

Priority: Progressive overload and plateau detection — achievable without external AI services.