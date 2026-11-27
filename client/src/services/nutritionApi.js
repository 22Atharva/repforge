import { api } from './api'

export const nutritionApi = {
  // Foods
  listFoods: (params) => api.get('/nutrition/foods', { params }),
  getFood: (id) => api.get(`/nutrition/foods/${id}`),
  createFood: (data) => api.post('/nutrition/foods', data),

  // Daily Nutrition
  getDailyNutrition: (date) => api.get('/nutrition/daily', { params: { date } }),
  upsertDailyNutrition: (data) => api.post('/nutrition/daily', data),
  addFoodToMeal: (data) => api.post('/nutrition/daily/meal', data),
  removeFoodFromMeal: (data) => api.delete('/nutrition/daily/meal', { data }),

  // Water
  getWaterIntake: (date) => api.get('/nutrition/water', { params: { date } }),
  upsertWaterIntake: (data) => api.post('/nutrition/water', data),
  addWaterEntry: (data) => api.post('/nutrition/water/entry', data),
  removeWaterEntry: (data) => api.delete('/nutrition/water/entry', { data }),
}