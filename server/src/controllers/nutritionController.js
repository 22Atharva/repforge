import { Food, DailyNutrition, WaterIntake } from '../models/index.js'

// ============ FOOD ============

export async function listFoods(req, res) {
  const { search, page = 1, limit = 50 } = req.query
  const query = { $or: [{ isCustom: false }, { createdBy: req.user._id }] }

  if (search) {
    query.$text = { $search: search }
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)
  const foods = await Food.find(query)
    .sort({ name: 1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean()

  const total = await Food.countDocuments(query)

  res.json({
    foods,
    pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) }
  })
}

export async function getFood(req, res) {
  const food = await Food.findById(req.params.id).lean()
  if (!food) return res.status(404).json({ message: 'Food not found' })
  res.json(food)
}

export async function createFood(req, res) {
  const food = await Food.create({ ...req.body, isCustom: true, createdBy: req.user._id })
  res.status(201).json(food)
}

export async function updateFood(req, res) {
  const food = await Food.findById(req.params.id)
  if (!food) return res.status(404).json({ message: 'Food not found' })
  if (food.createdBy && !food.createdBy.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized' })
  }
  Object.assign(food, req.body)
  await food.save()
  res.json(food)
}

export async function deleteFood(req, res) {
  const food = await Food.findById(req.params.id)
  if (!food) return res.status(404).json({ message: 'Food not found' })
  if (food.createdBy && !food.createdBy.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized' })
  }
  await food.deleteOne()
  res.json({ message: 'Food deleted' })
}

// ============ DAILY NUTRITION ============

export async function getDailyNutrition(req, res) {
  const { date } = req.query
  if (!date) return res.status(400).json({ message: 'Date required' })

  const nutrition = await DailyNutrition.findOne({ userId: req.user._id, date: new Date(date) }).lean()
  if (!nutrition) {
    return res.json({
      date,
      meals: [],
      dailyTotals: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 },
      targets: { calories: 2000, protein: 150, carbs: 200, fat: 70 }
    })
  }
  res.json(nutrition)
}

const DEFAULT_MEALS = [
  { name: 'breakfast', foods: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } },
  { name: 'lunch', foods: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } },
  { name: 'dinner', foods: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } },
  { name: 'snack', foods: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } },
]

export async function upsertDailyNutrition(req, res) {
  const { date, meals, targets } = req.body
  if (!date) return res.status(400).json({ message: 'Date required' })

  // Calculate totals from meals
  let dailyTotals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 }
  const processedMeals = (meals || []).map(meal => {
    const mealTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 }
    const processedFoods = meal.foods.map(f => {
      mealTotals.calories += f.calories
      mealTotals.protein += f.protein
      mealTotals.carbs += f.carbs
      mealTotals.fat += f.fat
      dailyTotals.calories += f.calories
      dailyTotals.protein += f.protein
      dailyTotals.carbs += f.carbs
      dailyTotals.fat += f.fat
      return f
    })
    return { ...meal, foods: processedFoods, totals: mealTotals }
  })

  // Ensure all default meals exist
  const finalMeals = DEFAULT_MEALS.map(defaultMeal => {
    const existing = processedMeals.find(m => m.name === defaultMeal.name)
    return existing || defaultMeal
  })

  const nutrition = await DailyNutrition.findOneAndUpdate(
    { userId: req.user._id, date: new Date(date) },
    { $set: { meals: finalMeals, dailyTotals, targets: targets || { calories: 2000, protein: 150, carbs: 200, fat: 70 } } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean()

  res.json(nutrition)
}

export async function addFoodToMeal(req, res) {
  const { date, mealName, foodId, servings } = req.body
  if (!date || !mealName || !foodId || !servings) {
    return res.status(400).json({ message: 'date, mealName, foodId, servings required' })
  }

  const food = await Food.findById(foodId).lean()
  if (!food) return res.status(404).json({ message: 'Food not found' })

  const nutrition = await DailyNutrition.findOne({ userId: req.user._id, date: new Date(date) })
  if (!nutrition) {
    return res.status(404).json({ message: 'Daily nutrition not found. Create it first.' })
  }

  const meal = nutrition.meals.find(m => m.name === mealName)
  if (!meal) return res.status(404).json({ message: 'Meal not found' })

  const entry = {
    foodId: food._id,
    foodName: food.name,
    servings,
    calories: food.caloriesPerServing * servings,
    protein: food.proteinPerServing * servings,
    carbs: food.carbsPerServing * servings,
    fat: food.fatPerServing * servings,
  }
  meal.foods.push(entry)

  // Recalculate meal totals
  meal.totals = meal.foods.reduce((acc, f) => ({
    calories: acc.calories + f.calories,
    protein: acc.protein + f.protein,
    carbs: acc.carbs + f.carbs,
    fat: acc.fat + f.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  // Recalculate daily totals
  nutrition.dailyTotals = nutrition.meals.reduce((acc, m) => ({
    calories: acc.calories + m.totals.calories,
    protein: acc.protein + m.totals.protein,
    carbs: acc.carbs + m.totals.carbs,
    fat: acc.fat + m.totals.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  await nutrition.save()
  res.json(nutrition)
}

export async function removeFoodFromMeal(req, res) {
  const { date, mealName, foodIndex } = req.body
  if (!date || !mealName || foodIndex === undefined) {
    return res.status(400).json({ message: 'date, mealName, foodIndex required' })
  }

  const nutrition = await DailyNutrition.findOne({ userId: req.user._id, date: new Date(date) })
  if (!nutrition) return res.status(404).json({ message: 'Daily nutrition not found' })

  const meal = nutrition.meals.find(m => m.name === mealName)
  if (!meal || !meal.foods[foodIndex]) return res.status(404).json({ message: 'Food entry not found' })

  meal.foods.splice(foodIndex, 1)

  // Recalculate
  meal.totals = meal.foods.reduce((acc, f) => ({
    calories: acc.calories + f.calories,
    protein: acc.protein + f.protein,
    carbs: acc.carbs + f.carbs,
    fat: acc.fat + f.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  nutrition.dailyTotals = nutrition.meals.reduce((acc, m) => ({
    calories: acc.calories + m.totals.calories,
    protein: acc.protein + m.totals.protein,
    carbs: acc.carbs + m.totals.carbs,
    fat: acc.fat + m.totals.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  await nutrition.save()
  res.json(nutrition)
}

// ============ WATER INTAKE ============

export async function getWaterIntake(req, res) {
  const { date } = req.query
  if (!date) return res.status(400).json({ message: 'Date required' })

  const water = await WaterIntake.findOne({ userId: req.user._id, date: new Date(date) }).lean()
  if (!water) {
    return res.json({ date, entries: [], dailyTotal: 0, target: 2500 })
  }
  res.json(water)
}

export async function upsertWaterIntake(req, res) {
  const { date, entries, target } = req.body
  if (!date) return res.status(400).json({ message: 'Date required' })

  const dailyTotal = (entries || []).reduce((sum, e) => {
    const amount = e.unit === 'oz' ? e.amount * 29.5735 : e.unit === 'cup' ? e.amount * 236.588 : e.amount
    return sum + amount
  }, 0)

  const water = await WaterIntake.findOneAndUpdate(
    { userId: req.user._id, date: new Date(date) },
    { $set: { entries: entries || [], dailyTotal, target: target || 2500 } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean()

  res.json(water)
}

export async function addWaterEntry(req, res) {
  const { date, amount, unit } = req.body
  if (!date || !amount) return res.status(400).json({ message: 'date, amount required' })

  const water = await WaterIntake.findOne({ userId: req.user._id, date: new Date(date) })
  if (!water) {
    return res.status(404).json({ message: 'Water intake not found. Create it first.' })
  }

  const entry = { amount, unit: unit || 'ml', time: new Date() }
  water.entries.push(entry)

  const mlAmount = unit === 'oz' ? amount * 29.5735 : unit === 'cup' ? amount * 236.588 : amount
  water.dailyTotal += mlAmount

  await water.save()
  res.json(water)
}

export async function removeWaterEntry(req, res) {
  const { date, entryIndex } = req.body
  if (!date || entryIndex === undefined) return res.status(400).json({ message: 'date, entryIndex required' })

  const water = await WaterIntake.findOne({ userId: req.user._id, date: new Date(date) })
  if (!water || !water.entries[entryIndex]) return res.status(404).json({ message: 'Entry not found' })

  const entry = water.entries[entryIndex]
  const mlAmount = entry.unit === 'oz' ? entry.amount * 29.5735 : entry.unit === 'cup' ? entry.amount * 236.588 : entry.amount
  water.dailyTotal = Math.max(0, water.dailyTotal - mlAmount)

  water.entries.splice(entryIndex, 1)
  await water.save()
  res.json(water)
}