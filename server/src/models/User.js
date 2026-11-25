import mongoose from 'mongoose';

const preferencesSchema = new mongoose.Schema(
  {
    units: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    defaultSplit: {
      type: String,
      enum: ['PPL', 'UL', 'UL-PPL', 'full-body', 'custom'],
      default: 'PPL',
    },
    goals: [{ type: String, enum: ['strength', 'hypertrophy', 'endurance', 'skill'] }],
    restTimerDefault: { type: Number, default: 90 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    preferences: { type: preferencesSchema, default: () => ({}) },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model('User', userSchema);
