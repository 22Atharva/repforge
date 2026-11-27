import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format, startOfDay } from 'date-fns'
import {
  Utensils, Droplets, Flame, TrendingUp, Target, ChevronLeft, ChevronRight,
  Plus, Apple, WheatOff, Drumstick, Zap, Droplet, CheckCircle, AlertTriangle,
  BarChart2, PieChart, Activity, Sun, Moon, Settings
} from 'lucide-react'
import { nutritionApi } from '../../services/nutritionApi'
import { useAuth } from '../../features/auth/hooks/useAuth'

const MACRO_COLORS = {
  protein: '#3B82F6',
  carbs: '#F59E0B',
  fat: '#EF4444',
  fiber: '#10B981',
}

const MEALS = [
  { key: 'breakfast', label: 'Breakfast', icon: Sun, color: '#F59E0B' },
  { key: 'lunch', label: 'Lunch', icon: Sun, color: '#F97316' },
  { key: 'dinner', label: 'Dinner', icon: Moon, color: '#8B5CF6' },
  { key: 'snack', label: 'Snacks', icon: Apple, color: '#EC4899' },
]

function ProgressRing({ value, max, color, size = 120, strokeWidth = 12, children }) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

function MacroCard({ label, value, target, unit, color, icon }) {
  const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <icon className="h-5 w-5" style={{ color }} />
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900">{value.toFixed(1)}</span>
        <span className="text-sm text-gray-500 ml-1">{unit}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0{unit}</span>
        <span>{target}{unit}</span>
      </div>
    </div>
  )
}

function WaterTracker({ dailyTotal, target, onAddWater }) {
  const percentage = target > 0 ? Math.min((dailyTotal / target) * 100, 100) : 0
  const liters = (dailyTotal / 1000).toFixed(1)
  const targetLiters = (target / 1000).toFixed(1)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-100">
            <Droplets className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Water Intake</h3>
            <p className="text-sm text-gray-500">{liters}L / {targetLiters}L</p>
          </div>
        </div>
        <span className="text-2xl font-bold text-gray-900">{Math.round(percentage)}%</span>
      </div>

      <div className="relative h-16 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div
          className="absolute inset-0 bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <span className="text-lg font-bold text-gray-700">{Math.round(percentage)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[100, 250, 500].map((amount) => (
          <button
            key={amount}
            onClick={() => onAddWater(amount)}
            className="py-2 px-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            +{amount}ml
          </button>
        ))}
      </div>
    </div>
  )
}

function MealSection({ meal, dailyNutrition, onAddFood, onRemoveFood, foods }) {
  const mealData = dailyNutrition?.meals?.find(m => m.name === meal.key) || { foods: [], totals: { calories: 0, protein: 0, carbs: 0, fat: 0 } }
  const Icon = meal.icon

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${meal.color}15` }}>
            <Icon className="h-5 w-5" style={{ color: meal.color }} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 capitalize">{meal.label}</h4>
            <p className="text-sm text-gray-500">{mealData.totals.calories} cal • {mealData.foods.length} items</p>
          </div>
        </div>
        <button
          onClick={() => onAddFood(meal.key)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {mealData.foods.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p className="text-sm">No foods logged yet</p>
            <button
              onClick={() => onAddFood(meal.key)}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Add food
            </button>
          </div>
        ) : (
          mealData.foods.map((food, index) => (
            <div key={`${food.foodId}-${index}`} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{food.foodName}</p>
                <p className="text-sm text-gray-500">
                  {food.servings}x • {food.calories} cal • P:{food.protein}g C:{food.carbs}g F:{food.fat}g
                </p>
              </div>
              <button
                onClick={() => onRemoveFood(meal.key, index)}
                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v12m-6 0h12m-6 0H5" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function FoodSearchModal({ isOpen, onClose, onSelect, mealKey, searchQuery, setSearchQuery }) {
  if (!isOpen) return null

  const { data: foods } = useQuery({
    queryKey: ['foods', 'search', searchQuery],
    queryFn: () => nutritionApi.listFoods({ search: searchQuery, limit: 20 }),
    enabled: isOpen && searchQuery.length >= 2,
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Food to {mealKey.charAt(0).toUpperCase() + mealKey.slice(1)}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search foods... (min 2 chars)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {foods?.foods?.length ? (
            <div className="divide-y divide-gray-100">
              {foods.foods.map((food) => (
                <button
                  key={food._id}
                  onClick={() => { onSelect(food); onClose(); }}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">{food.name}</p>
                    <p className="text-sm text-gray-500">
                      {food.caloriesPerServing} cal / {food.servingSize}{food.servingUnit} • P:{food.proteinPerServing}g C:{food.carbsPerServing}g F:{food.fatPerServing}g
                    </p>
                  </div>
                  <span className="text-primary font-medium">Add</span>
                </button>
              ))}
            </div>
          ) : searchQuery.length >= 2 ? (
            <div className="p-8 text-center text-gray-500">No foods found</div>
          ) : (
            <div className="p-8 text-center text-gray-500">Type at least 2 characters to search</div>
          )}
        </div>
      </div>
    </div>
  )
}

function MacroProgressSection({ dailyNutrition, targets }) {
  const totals = dailyNutrition?.dailyTotals || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Calories</h3>
          <span className="text-sm text-gray-500">Target: {targets?.calories || 2000}</span>
        </div>
        <ProgressRing
          value={totals.calories}
          max={targets?.calories || 2000}
          color="#EF4444"
          size={140}
          strokeWidth={14}
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{Math.round(totals.calories)}</p>
            <p className="text-sm text-gray-500">kcal</p>
          </div>
        </ProgressRing>
      </div>

      <MacroCard label="Protein" value={totals.protein} target={targets?.protein || 150} unit="g" color={MACRO_COLORS.protein} icon={Drumstick} />
      <MacroCard label="Carbs" value={totals.carbs} target={targets?.carbs || 200} unit="g" color={MACRO_COLORS.carbs} icon={WheatOff} />
      <MacroCard label="Fat" value={totals.fat} target={targets?.fat || 70} unit="g" color={MACRO_COLORS.fat} icon={Zap} />
    </div>
  )
}

export default function NutritionDashboard() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [foodSearchOpen, setFoodSearchOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)

  const dateStr = format(selectedDate, 'yyyy-MM-dd')

  const { data: dailyNutrition, isLoading: nutritionLoading } = useQuery({
    queryKey: ['dailyNutrition', dateStr],
    queryFn: () => nutritionApi.getDailyNutrition(dateStr),
  })

  const { data: waterIntake, isLoading: waterLoading } = useQuery({
    queryKey: ['waterIntake', dateStr],
    queryFn: () => nutritionApi.getWaterIntake(dateStr),
  })

  const addFoodMutation = useMutation({
    mutationFn: ({ mealName, foodId, servings }) => nutritionApi.addFoodToMeal({ date: dateStr, mealName, foodId, servings }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyNutrition', dateStr] })
    },
  })

  const removeFoodMutation = useMutation({
    mutationFn: ({ mealName, foodIndex }) => nutritionApi.removeFoodFromMeal({ date: dateStr, mealName, foodIndex }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyNutrition', dateStr] })
    },
  })

  const addWaterMutation = useMutation({
    mutationFn: (amount) => nutritionApi.addWaterEntry({ date: dateStr, amount, unit: 'ml' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waterIntake', dateStr] })
    },
  })

  const upsertNutritionMutation = useMutation({
    mutationFn: (data) => nutritionApi.upsertDailyNutrition({ ...data, date: dateStr }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyNutrition', dateStr] })
    },
  })

  const upsertWaterMutation = useMutation({
    mutationFn: (data) => nutritionApi.upsertWaterIntake({ ...data, date: dateStr }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waterIntake', dateStr] })
    },
  })

  // Initialize daily nutrition and water if not exists
  useEffect(() => {
    if (!dailyNutrition?.dailyTotals && !nutritionLoading) {
      upsertNutritionMutation.mutate({ meals: [], targets: { calories: 2000, protein: 150, carbs: 200, fat: 70 } })
    }
    if (!waterIntake?.dailyTotal && !waterLoading) {
      upsertWaterMutation.mutate({ entries: [], target: 2500 })
    }
  }, [dailyNutrition, waterIntake, nutritionLoading, waterLoading])

  const handleAddFood = (mealKey, food) => {
    addFoodMutation.mutate({ mealName: mealKey, foodId: food._id, servings: 1 })
  }

  const handleRemoveFood = (mealKey, index) => {
    removeFoodMutation.mutate({ mealName: mealKey, foodIndex: index })
  }

  const handleAddWater = (amount) => {
    addWaterMutation.mutate(amount)
  }

  const targets = dailyNutrition?.targets || { calories: 2000, protein: 150, carbs: 200, fat: 70 }

  return (
    <div className="space-y-6">
      {/* Header with date picker */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracker</h1>
          <p className="text-gray-600 mt-1">Track your calories, macros, and water intake</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedDate(d => new Date(d.setDate(d.getDate() - 1)))}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium text-gray-900 min-w-[150px] text-center">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </span>
          <button
            onClick={() => setSelectedDate(d => new Date(d.setDate(d.getDate() + 1)))}
            disabled={format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-4 py-2 text-sm font-medium text-primary bg-primary-light rounded-lg hover:bg-primary/20"
          >
            Today
          </button>
        </div>
      </div>

      {/* Macro Progress Rings */}
      <MacroProgressSection dailyNutrition={dailyNutrition} targets={targets} />

      {/* Water Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <WaterTracker
            dailyTotal={waterIntake?.dailyTotal || 0}
            target={waterIntake?.target || 2500}
            onAddWater={handleAddWater}
          />
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* Meals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEALS.map((meal) => (
              <MealSection
                key={meal.key}
                meal={meal}
                dailyNutrition={dailyNutrition}
                onAddFood={(mealKey) => { setSelectedMeal(mealKey); setFoodSearchOpen(true); }}
                onRemoveFood={handleRemoveFood}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Food Search Modal */}
      <FoodSearchModal
        isOpen={foodSearchOpen}
        onClose={() => { setFoodSearchOpen(false); setSearchQuery(''); }}
        onSelect={(food) => handleAddFood(selectedMeal, food)}
        mealKey={selectedMeal || ''}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  )
}