import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    aliases: [{ type: String, trim: true }],
    primaryMuscle: { type: String, required: true, trim: true },
    secondaryMuscles: [{ type: String, trim: true }],
    equipment: [{ type: String, trim: true }],
    type: {
      type: String,
      enum: ['weighted', 'bodyweight', 'assisted', 'timed', 'cardio'],
      required: true,
    },
    movementPattern: {
      type: String,
      enum: ['push', 'pull', 'legs', 'core', 'hinge', 'carry'],
      required: true,
    },
    isCustom: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

exerciseSchema.index({ name: 'text', aliases: 'text' });
exerciseSchema.index({ primaryMuscle: 1 });
exerciseSchema.index({ equipment: 1 });
exerciseSchema.index({ type: 1 });
exerciseSchema.index({ isCustom: 1, createdBy: 1 });

export const Exercise = mongoose.model('Exercise', exerciseSchema);
