import express from 'express'
import { listFoods, getFood, createFood, updateFood, deleteFood } from '../controllers/nutritionController.js'
import { getDailyNutrition, upsertDailyNutrition, addFoodToMeal, removeFoodFromMeal } from '../controllers/nutritionController.js'
import { getWaterIntake, upsertWaterIntake, addWaterEntry, removeWaterEntry } from '../controllers/nutritionController.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { foodSchema, dailyNutritionSchema, waterIntakeSchema } from '../utils/validationSchemas.js'

const router = express.Router()

router.use(authenticate)

// ============ FOOD ============
router.get('/foods', listFoods)
router.get('/foods/:id', getFood)
router.post('/foods', validate(foodSchema), createFood)
router.patch('/foods/:id', validate(foodSchema.partial()), updateFood)
router.delete('/foods/:id', deleteFood)

// ============ DAILY NUTRITION ============
router.get('/daily', getDailyNutrition)
router.post('/daily', validate(dailyNutritionSchema), upsertDailyNutrition)
router.post('/daily/meal', addFoodToMeal)
router.delete('/daily/meal', removeFoodFromMeal)

// ============ WATER INTAKE ============
router.get('/water', getWaterIntake)
router.post('/water', validate(waterIntakeSchema), upsertWaterIntake)
router.post('/water/entry', addWaterEntry)
router.delete('/water/entry', removeWaterEntry)

export default router