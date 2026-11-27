import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, trim: true },
  servingSize: { type: Number, required: true },
  servingUnit: { type: String, enum: ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece'], required: true },
  caloriesPerServing: { type: Number, required: true, min: 0 },
  proteinPerServing: { type: Number, required: true, min: 0 },
  carbsPerServing: { type: Number, required: true, min: 0 },
  fatPerServing: { type: Number, required: true, min: 0 },
  fiberPerServing: { type: Number, default: 0 },
  sugarPerServing: { type: Number, default: 0 },
  sodiumPerServing: { type: Number, default: 0 },
  isCustom: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true })

foodSchema.index({ name: 'text', brand: 'text' })
foodSchema.index({ createdBy: 1, isCustom: 1 })

const dailyNutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: Date, required: true, index: true },
  meals: [{
    name: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
    foods: [{
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
      foodName: { type: String, required: true },
      servings: { type: Number, required: true, min: 0.1 },
      calories: { type: Number, required: true },
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fat: { type: Number, required: true },
    }],
    totals: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
    }
  }],
  dailyTotals: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 },
  },
  targets: {
    calories: { type: Number },
    protein: { type: Number },
    carbs: { type: Number },
    fat: { type: Number },
  }
}, { timestamps: true })

dailyNutritionSchema.index({ userId: 1, date: -1 }, { unique: true })

const waterIntakeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: Date, required: true, index: true },
  entries: [{
    amount: { type: Number, required: true, min: 1 },
    unit: { type: String, enum: ['ml', 'oz', 'cup'], default: 'ml' },
    time: { type: Date, default: Date.now },
  }],
  dailyTotal: { type: Number, default: 0 },
  target: { type: Number, default: 2500 },
}, { timestamps: true })

waterIntakeSchema.index({ userId: 1, date: -1 }, { unique: true })

export const Food = mongoose.model('Food', foodSchema)
export const DailyNutrition = mongoose.model('DailyNutrition', dailyNutritionSchema)
export const WaterIntake = mongoose.model('WaterIntake', waterIntakeSchema)