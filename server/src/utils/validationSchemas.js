import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  preferences: z
    .object({
      units: z.enum(['metric', 'imperial']).optional(),
      experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
      defaultSplit: z.enum(['PPL', 'UL', 'UL-PPL', 'full-body', 'custom']).optional(),
      goals: z.array(z.enum(['strength', 'hypertrophy', 'endurance', 'skill'])).optional(),
      restTimerDefault: z.number().int().positive().optional(),
    })
    .optional(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(128),
});

export const exerciseSchema = z.object({
  name: z.string().min(1).max(100),
  aliases: z.array(z.string()).optional(),
  primaryMuscle: z.string().min(1),
  secondaryMuscles: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  type: z.enum(['weighted', 'bodyweight', 'assisted', 'timed', 'cardio']),
  movementPattern: z.enum(['push', 'pull', 'legs', 'core', 'hinge', 'carry']),
});

export const templateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  split: z.enum(['PPL', 'UL', 'UL-PPL', 'full-body', 'custom']),
  days: z.array(
    z.object({
      dayName: z.string().min(1),
      exercises: z.array(
        z.object({
          exerciseId: z.string(),
          order: z.number().int().positive(),
          targetSets: z.number().int().positive(),
          targetReps: z.string().min(1),
          targetWeight: z.number().nonnegative().optional(),
          targetRir: z.number().int().min(0).max(10).optional(),
          restSeconds: z.number().int().nonnegative().optional(),
          notes: z.string().optional(),
        })
      ),
    })
  ),
});

export const sessionSchema = z.object({
  templateId: z.string().optional(),
  dayIndex: z.number().int().nonnegative().optional(),
});

export const sessionUpdateSchema = z.object({
  performedExercises: z
    .array(
      z.object({
        exerciseId: z.string(),
        exerciseName: z.string(),
        sets: z.array(
          z.object({
            setNumber: z.number().int().positive(),
            weight: z.number().nonnegative(),
            reps: z.number().int().positive(),
            rir: z.number().int().min(0).max(10).optional(),
            rpe: z.number().int().min(1).max(10).optional(),
            isWarmup: z.boolean().optional(),
            completedAt: z.string().datetime().optional(),
          })
        ),
        restTakenSeconds: z.number().int().nonnegative().optional(),
        notes: z.string().optional(),
      })
    )
    .optional(),
  sessionRpe: z.number().int().min(1).max(10).optional(),
  actualDurationSeconds: z.number().int().nonnegative().optional(),
  version: z.number().int().positive(),
});

export const bodyMetricsSchema = z.object({
  date: z.string().datetime(),
  weightKg: z.number().positive(),
  bodyFatPercent: z.number().min(0).max(100).optional(),
  measurements: z
    .object({
      chest: z.number().optional(),
      waist: z.number().optional(),
      hips: z.number().optional(),
      bicep: z.number().optional(),
      thigh: z.number().optional(),
      calf: z.number().optional(),
    })
    .optional(),
  notes: z.string().optional(),
});
