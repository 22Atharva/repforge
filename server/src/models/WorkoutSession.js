import mongoose from 'mongoose';

const performedSetSchema = new mongoose.Schema(
  {
    setNumber: { type: Number, required: true },
    weight: { type: Number, required: true },
    reps: { type: Number, required: true },
    rir: { type: Number, min: 0, max: 10 },
    rpe: { type: Number, min: 1, max: 10 },
    isWarmup: { type: Boolean, default: false },
    completedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const performedExerciseSchema = new mongoose.Schema(
  {
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
    exerciseName: { type: String, required: true },
    sets: [performedSetSchema],
    restTakenSeconds: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { _id: false }
);

const templateSnapshotSchema = new mongoose.Schema(
  {
    name: { type: String },
    split: { type: String },
    days: [
      {
        dayName: String,
        exercises: [
          {
            exerciseId: mongoose.Schema.Types.ObjectId,
            exerciseName: String,
            order: Number,
            targetSets: Number,
            targetReps: String,
            targetWeight: Number,
            targetRir: Number,
            restSeconds: Number,
            notes: String,
          },
        ],
      },
    ],
  },
  { _id: false }
);

const workoutSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutTemplate', default: null },
    templateSnapshot: templateSnapshotSchema,
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'abandoned'],
      default: 'in_progress',
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    actualDurationSeconds: { type: Number, default: 0 },
    dayIndex: { type: Number, default: 0 },
    performedExercises: [performedExerciseSchema],
    sessionRpe: { type: Number, min: 1, max: 10 },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

workoutSessionSchema.index({ userId: 1, startedAt: -1 });
workoutSessionSchema.index({ userId: 1, status: 1 });

export const WorkoutSession = mongoose.model('WorkoutSession', workoutSessionSchema);
