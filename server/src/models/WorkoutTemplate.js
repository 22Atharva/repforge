import mongoose from 'mongoose';

const templateExerciseSchema = new mongoose.Schema(
  {
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
    order: { type: Number, required: true },
    targetSets: { type: Number, required: true, min: 1 },
    targetReps: { type: String, required: true },
    targetWeight: { type: Number, default: 0 },
    targetRir: { type: Number, default: 2, min: 0, max: 10 },
    restSeconds: { type: Number, default: 90 },
    notes: { type: String, default: '' },
  },
  { _id: false }
);

const templateDaySchema = new mongoose.Schema(
  {
    dayName: { type: String, required: true },
    exercises: [templateExerciseSchema],
  },
  { _id: false }
);

const workoutTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    split: { type: String, enum: ['PPL', 'UL', 'UL-PPL', 'full-body', 'custom'], required: true },
    days: [templateDaySchema],
    isCustom: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

workoutTemplateSchema.index({ createdBy: 1, name: 1 });

export const WorkoutTemplate = mongoose.model('WorkoutTemplate', workoutTemplateSchema);
