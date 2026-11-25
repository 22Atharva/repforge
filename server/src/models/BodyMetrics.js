import mongoose from 'mongoose';

const measurementsSchema = new mongoose.Schema(
  {
    chest: Number,
    waist: Number,
    hips: Number,
    bicep: Number,
    thigh: Number,
    calf: Number,
  },
  { _id: false }
);

const bodyMetricsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: Date, required: true, index: true },
    weightKg: { type: Number, required: true },
    bodyFatPercent: { type: Number },
    measurements: { type: measurementsSchema, default: () => ({}) },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

bodyMetricsSchema.index({ userId: 1, date: -1 }, { unique: true });

export const BodyMetrics = mongoose.model('BodyMetrics', bodyMetricsSchema);
