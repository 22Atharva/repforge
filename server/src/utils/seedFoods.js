import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { Food } from '../models/index.js'
import { getEnv } from '../config/env.js'

const foods = [
  // Proteins
  { name: 'Chicken Breast', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 165, proteinPerServing: 31, carbsPerServing: 0, fatPerServing: 3.6 },
  { name: 'Salmon', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 208, proteinPerServing: 25, carbsPerServing: 0, fatPerServing: 12 },
  { name: 'Eggs', brand: '', servingSize: 1, servingUnit: 'piece', caloriesPerServing: 78, proteinPerServing: 6.3, carbsPerServing: 0.6, fatPerServing: 5.3 },
  { name: 'Greek Yogurt (0% fat)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 59, proteinPerServing: 10, carbsPerServing: 3.6, fatPerServing: 0.4 },
  { name: 'Cottage Cheese (2%)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 98, proteinPerServing: 11, carbsPerServing: 3.4, fatPerServing: 4.3 },
  { name: 'Whey Protein', brand: '', servingSize: 30, servingUnit: 'g', caloriesPerServing: 120, proteinPerServing: 24, carbsPerServing: 3, fatPerServing: 1 },
  { name: 'Tofu (firm)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 144, proteinPerServing: 17, carbsPerServing: 3, fatPerServing: 8 },
  { name: 'Ground Beef (90% lean)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 176, proteinPerServing: 24, carbsPerServing: 0, fatPerServing: 8 },
  { name: 'Turkey Breast', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 135, proteinPerServing: 29, carbsPerServing: 0, fatPerServing: 1 },
  { name: 'Tuna (canned in water)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 98, proteinPerServing: 22, carbsPerServing: 0, fatPerServing: 1 },

  // Carbs
  { name: 'White Rice (cooked)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 130, proteinPerServing: 2.7, carbsPerServing: 28, fatPerServing: 0.3 },
  { name: 'Brown Rice (cooked)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 111, proteinPerServing: 2.6, carbsPerServing: 23, fatPerServing: 0.9 },
  { name: 'Oats (dry)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 389, proteinPerServing: 17, carbsPerServing: 66, fatPerServing: 7 },
  { name: 'Sweet Potato', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 86, proteinPerServing: 1.6, carbsPerServing: 20, fatPerServing: 0.1 },
  { name: 'Potato', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 77, proteinPerServing: 2, carbsPerServing: 17, fatPerServing: 0.1 },
  { name: 'Quinoa (cooked)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 120, proteinPerServing: 4.4, carbsPerServing: 22, fatPerServing: 1.9 },
  { name: 'Pasta (cooked)', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 131, proteinPerServing: 5, carbsPerServing: 25, fatPerServing: 1.1 },
  { name: 'Bread (whole wheat)', brand: '', servingSize: 1, servingUnit: 'piece', caloriesPerServing: 80, proteinPerServing: 4, carbsPerServing: 14, fatPerServing: 1 },
  { name: 'Banana', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 89, proteinPerServing: 1.1, carbsPerServing: 23, fatPerServing: 0.3 },
  { name: 'Apple', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 52, proteinPerServing: 0.3, carbsPerServing: 14, fatPerServing: 0.2 },

  // Fats
  { name: 'Avocado', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 160, proteinPerServing: 2, carbsPerServing: 9, fatPerServing: 15 },
  { name: 'Almonds', brand: '', servingSize: 28, servingUnit: 'g', caloriesPerServing: 164, proteinPerServing: 6, carbsPerServing: 6, fatPerServing: 14 },
  { name: 'Peanut Butter', brand: '', servingSize: 16, servingUnit: 'g', caloriesPerServing: 94, proteinPerServing: 4, carbsPerServing: 3, fatPerServing: 8 },
  { name: 'Olive Oil', brand: '', servingSize: 15, servingUnit: 'ml', caloriesPerServing: 119, proteinPerServing: 0, carbsPerServing: 0, fatPerServing: 13.5 },
  { name: 'Chia Seeds', brand: '', servingSize: 15, servingUnit: 'g', caloriesPerServing: 73, proteinPerServing: 2.5, carbsPerServing: 6, fatPerServing: 4.5 },
  { name: 'Walnuts', brand: '', servingSize: 28, servingUnit: 'g', caloriesPerServing: 185, proteinPerServing: 4.3, carbsPerServing: 4, fatPerServing: 18.5 },

  // Vegetables
  { name: 'Broccoli', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 34, proteinPerServing: 2.8, carbsPerServing: 7, fatPerServing: 0.4 },
  { name: 'Spinach', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 23, proteinPerServing: 2.9, carbsPerServing: 3.6, fatPerServing: 0.4 },
  { name: 'Bell Pepper', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 31, proteinPerServing: 1, carbsPerServing: 7, fatPerServing: 0.3 },
  { name: 'Carrots', brand: '', servingSize: 100, servingUnit: 'g', caloriesPerServing: 41, proteinPerServing: 0.9, carbsPerServing: 10, fatPerServing: 0.2 },

  // Drinks
  { name: 'Water', brand: '', servingSize: 250, servingUnit: 'ml', caloriesPerServing: 0, proteinPerServing: 0, carbsPerServing: 0, fatPerServing: 0 },
  { name: 'Black Coffee', brand: '', servingSize: 240, servingUnit: 'ml', caloriesPerServing: 2, proteinPerServing: 0.3, carbsPerServing: 0, fatPerServing: 0 },
  { name: 'Milk (whole)', brand: '', servingSize: 240, servingUnit: 'ml', caloriesPerServing: 149, proteinPerServing: 8, carbsPerServing: 12, fatPerServing: 8 },
]

async function seed() {
  const env = getEnv()
  await mongoose.connect(env.MONGODB_URI)
  console.log('Connected to MongoDB')

  await Food.deleteMany({ isCustom: { $ne: true } })
  console.log('Cleared existing seeded foods')

  const seeded = await Food.insertMany(
    foods.map(f => ({ ...f, isCustom: false, createdBy: null }))
  )
  console.log(`Seeded ${seeded.length} foods`)

  await mongoose.disconnect()
  console.log('Done')
  process.exit(0)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})