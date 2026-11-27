import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { Exercise } from '../models/index.js'
import { getEnv } from '../config/env.js'

const env = getEnv()

const exercises = [
  // CHEST
  { name: 'Barbell Bench Press', aliases: ['Bench Press'], primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Dumbbell Bench Press', aliases: ['DB Bench Press'], primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Incline Barbell Bench Press', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Incline Dumbbell Bench Press', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Decline Barbell Bench Press', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Decline Dumbbell Bench Press', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Push-Up', aliases: ['Press-Up'], primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts', 'Core'], equipment: ['Bodyweight'], type: 'bodyweight', movementPattern: 'push' },
  { name: 'Incline Push-Up', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: ['Bodyweight'], type: 'bodyweight', movementPattern: 'push' },
  { name: 'Decline Push-Up', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: ['Bodyweight'], type: 'bodyweight', movementPattern: 'push' },
  { name: 'Dumbbell Fly', aliases: ['Chest Fly'], primaryMuscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Incline Dumbbell Fly', primaryMuscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Cable Fly', aliases: ['Cable Crossover'], primaryMuscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: ['Cable'], type: 'weighted', movementPattern: 'push' },
  { name: 'Pec Deck Fly', aliases: ['Machine Fly'], primaryMuscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: ['Machine'], type: 'weighted', movementPattern: 'push' },
  { name: 'Dip', aliases: ['Chest Dip'], primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: ['Bodyweight', 'Dip Station'], type: 'bodyweight', movementPattern: 'push' },
  { name: 'Weighted Dip', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: ['Dip Belt', 'Dip Station'], type: 'weighted', movementPattern: 'push' },
  { name: 'Landmine Press', primaryMuscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts', 'Core'], equipment: ['Barbell', 'Landmine'], type: 'weighted', movementPattern: 'push' },

  // BACK
  { name: 'Pull-Up', primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: ['Pull-Up Bar'], type: 'bodyweight', movementPattern: 'pull' },
  { name: 'Chin-Up', primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: ['Pull-Up Bar'], type: 'bodyweight', movementPattern: 'pull' },
  { name: 'Weighted Pull-Up', primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: ['Pull-Up Bar', 'Dip Belt'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Lat Pulldown', primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: ['Cable', 'Lat Pulldown Machine'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Barbell Row', aliases: ['Bent Over Row'], primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts', 'Lower Back'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Dumbbell Row', aliases: ['Single Arm Row'], primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Cable Row', aliases: ['Seated Cable Row'], primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: ['Cable'], type: 'weighted', movementPattern: 'pull' },
  { name: 'T-Bar Row', primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: ['T-Bar', 'Barbell'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Chest-Supported Row', primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: ['Dumbbell', 'Bench'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Machine Row', primaryMuscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: ['Machine'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Face Pull', primaryMuscle: 'Back', secondaryMuscles: ['Rear Delts', 'Traps'], equipment: ['Cable'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Straight-Arm Pulldown', primaryMuscle: 'Back', secondaryMuscles: ['Triceps'], equipment: ['Cable'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Deadlift', aliases: ['Conventional Deadlift'], primaryMuscle: 'Back', secondaryMuscles: ['Glutes', 'Hamstrings', 'Traps', 'Forearms'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'hinge' },
  { name: 'Romanian Deadlift', aliases: ['RDL'], primaryMuscle: 'Back', secondaryMuscles: ['Hamstrings', 'Glutes'], equipment: ['Barbell', 'Dumbbell'], type: 'weighted', movementPattern: 'hinge' },
  { name: 'Trap Bar Deadlift', primaryMuscle: 'Back', secondaryMuscles: ['Glutes', 'Hamstrings', 'Traps'], equipment: ['Trap Bar'], type: 'weighted', movementPattern: 'hinge' },

  // SHOULDERS
  { name: 'Overhead Press', aliases: ['OHP', 'Standing Press', 'Military Press'], primaryMuscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Upper Chest'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Dumbbell Overhead Press', primaryMuscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Upper Chest'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Seated Overhead Press', primaryMuscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Upper Chest'], equipment: ['Barbell', 'Dumbbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Arnold Press', primaryMuscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Upper Chest'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Lateral Raise', aliases: ['Side Raise'], primaryMuscle: 'Shoulders', secondaryMuscles: [], equipment: ['Dumbbell', 'Cable'], type: 'weighted', movementPattern: 'push' },
  { name: 'Front Raise', primaryMuscle: 'Shoulders', secondaryMuscles: [], equipment: ['Dumbbell', 'Cable', 'Plate'], type: 'weighted', movementPattern: 'push' },
  { name: 'Rear Delt Fly', aliases: ['Reverse Fly', 'Bent Over Lateral Raise'], primaryMuscle: 'Shoulders', secondaryMuscles: ['Rear Delts', 'Traps'], equipment: ['Dumbbell', 'Cable', 'Machine'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Face Pull', primaryMuscle: 'Shoulders', secondaryMuscles: ['Rear Delts', 'Traps'], equipment: ['Cable'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Upright Row', primaryMuscle: 'Shoulders', secondaryMuscles: ['Traps'], equipment: ['Barbell', 'Dumbbell', 'Cable'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Pike Push-Up', primaryMuscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Upper Chest'], equipment: ['Bodyweight'], type: 'bodyweight', movementPattern: 'push' },
  { name: 'Handstand Push-Up', primaryMuscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Upper Chest'], equipment: ['Bodyweight', 'Wall'], type: 'bodyweight', movementPattern: 'push' },

  // TRICEPS
  { name: 'Tricep Pushdown', aliases: ['Cable Tricep Pushdown'], primaryMuscle: 'Triceps', secondaryMuscles: [], equipment: ['Cable'], type: 'weighted', movementPattern: 'push' },
  { name: 'Overhead Tricep Extension', primaryMuscle: 'Triceps', secondaryMuscles: [], equipment: ['Dumbbell', 'Cable', 'EZ Bar'], type: 'weighted', movementPattern: 'push' },
  { name: 'Skull Crusher', aliases: ['Lying Tricep Extension'], primaryMuscle: 'Triceps', secondaryMuscles: [], equipment: ['EZ Bar', 'Dumbbell', 'Barbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Close-Grip Bench Press', primaryMuscle: 'Triceps', secondaryMuscles: ['Chest', 'Front Delts'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'push' },
  { name: 'Diamond Push-Up', primaryMuscle: 'Triceps', secondaryMuscles: ['Chest', 'Front Delts'], equipment: ['Bodyweight'], type: 'bodyweight', movementPattern: 'push' },
  { name: 'Tricep Dip', aliases: ['Bench Dip'], primaryMuscle: 'Triceps', secondaryMuscles: ['Chest', 'Front Delts'], equipment: ['Bench', 'Bodyweight'], type: 'bodyweight', movementPattern: 'push' },
  { name: 'Weighted Tricep Dip', primaryMuscle: 'Triceps', secondaryMuscles: ['Chest', 'Front Delts'], equipment: ['Dip Belt', 'Dip Station'], type: 'weighted', movementPattern: 'push' },
  { name: 'Cable Overhead Tricep Extension', primaryMuscle: 'Triceps', secondaryMuscles: [], equipment: ['Cable'], type: 'weighted', movementPattern: 'push' },
  { name: 'Single-Arm Tricep Pushdown', primaryMuscle: 'Triceps', secondaryMuscles: [], equipment: ['Cable'], type: 'weighted', movementPattern: 'push' },

  // BICEPS
  { name: 'Barbell Curl', primaryMuscle: 'Biceps', secondaryMuscles: ['Forearms'], equipment: ['Barbell', 'EZ Bar'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Dumbbell Curl', aliases: ['Standing Dumbbell Curl'], primaryMuscle: 'Biceps', secondaryMuscles: ['Forearms'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Hammer Curl', primaryMuscle: 'Biceps', secondaryMuscles: ['Forearms', 'Brachialis'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Preacher Curl', primaryMuscle: 'Biceps', secondaryMuscles: ['Forearms'], equipment: ['EZ Bar', 'Dumbbell', 'Machine'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Concentration Curl', primaryMuscle: 'Biceps', secondaryMuscles: ['Forearms'], equipment: ['Dumbbell'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Incline Dumbbell Curl', primaryMuscle: 'Biceps', secondaryMuscles: ['Forearms'], equipment: ['Dumbbell', 'Bench'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Cable Curl', primaryMuscle: 'Biceps', secondaryMuscles: ['Forearms'], equipment: ['Cable'], type: 'weighted', movementPattern: 'pull' },
  { name: 'Chin-Up', primaryMuscle: 'Biceps', secondaryMuscles: ['Back', 'Rear Delts'], equipment: ['Pull-Up Bar'], type: 'bodyweight', movementPattern: 'pull' },
  { name: 'Reverse Curl', primaryMuscle: 'Biceps', secondaryMuscles: ['Forearms', 'Brachialis'], equipment: ['Barbell', 'EZ Bar', 'Dumbbell'], type: 'weighted', movementPattern: 'pull' },

  // LEGS - QUADS
  { name: 'Back Squat', aliases: ['Barbell Back Squat'], primaryMuscle: 'Quads', secondaryMuscles: ['Glutes', 'Hamstrings', 'Core'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Front Squat', primaryMuscle: 'Quads', secondaryMuscles: ['Glutes', 'Core'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Goblet Squat', primaryMuscle: 'Quads', secondaryMuscles: ['Glutes', 'Core'], equipment: ['Dumbbell', 'Kettlebell'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Leg Press', primaryMuscle: 'Quads', secondaryMuscles: ['Glutes', 'Hamstrings'], equipment: ['Leg Press Machine'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Bulgarian Split Squat', primaryMuscle: 'Quads', secondaryMuscles: ['Glutes', 'Hamstrings'], equipment: ['Dumbbell', 'Bench'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Lunge', aliases: ['Walking Lunge', 'Reverse Lunge'], primaryMuscle: 'Quads', secondaryMuscles: ['Glutes', 'Hamstrings'], equipment: ['Dumbbell', 'Barbell', 'Bodyweight'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Step-Up', primaryMuscle: 'Quads', secondaryMuscles: ['Glutes'], equipment: ['Dumbbell', 'Box'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Leg Extension', primaryMuscle: 'Quads', secondaryMuscles: [], equipment: ['Leg Extension Machine'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Sissy Squat', primaryMuscle: 'Quads', secondaryMuscles: [], equipment: ['Bodyweight', 'Sissy Squat Machine'], type: 'bodyweight', movementPattern: 'legs' },
  { name: 'Hack Squat', primaryMuscle: 'Quads', secondaryMuscles: ['Glutes'], equipment: ['Hack Squat Machine'], type: 'weighted', movementPattern: 'legs' },

  // LEGS - HAMSTRINGS/GLUTES
  { name: 'Romanian Deadlift', aliases: ['RDL'], primaryMuscle: 'Hamstrings', secondaryMuscles: ['Glutes', 'Lower Back'], equipment: ['Barbell', 'Dumbbell'], type: 'weighted', movementPattern: 'hinge' },
  { name: 'Stiff-Leg Deadlift', primaryMuscle: 'Hamstrings', secondaryMuscles: ['Glutes', 'Lower Back'], equipment: ['Barbell', 'Dumbbell'], type: 'weighted', movementPattern: 'hinge' },
  { name: 'Good Morning', primaryMuscle: 'Hamstrings', secondaryMuscles: ['Glutes', 'Lower Back'], equipment: ['Barbell'], type: 'weighted', movementPattern: 'hinge' },
  { name: 'Leg Curl', aliases: ['Seated Leg Curl', 'Lying Leg Curl'], primaryMuscle: 'Hamstrings', secondaryMuscles: [], equipment: ['Leg Curl Machine'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Nordic Curl', primaryMuscle: 'Hamstrings', secondaryMuscles: ['Glutes'], equipment: ['Nordic Bench', 'Bodyweight'], type: 'bodyweight', movementPattern: 'legs' },
  { name: 'Glute Bridge', primaryMuscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: ['Bodyweight', 'Barbell', 'Dumbbell'], type: 'weighted', movementPattern: 'hinge' },
  { name: 'Hip Thrust', primaryMuscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: ['Barbell', 'Bench'], type: 'weighted', movementPattern: 'hinge' },
  { name: 'Cable Pull-Through', primaryMuscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: ['Cable'], type: 'weighted', movementPattern: 'hinge' },
  { name: 'Kettlebell Swing', primaryMuscle: 'Glutes', secondaryMuscles: ['Hamstrings', 'Core'], equipment: ['Kettlebell'], type: 'weighted', movementPattern: 'hinge' },

  // CALVES
  { name: 'Standing Calf Raise', primaryMuscle: 'Calves', secondaryMuscles: [], equipment: ['Calf Raise Machine', 'Dumbbell', 'Barbell'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Seated Calf Raise', primaryMuscle: 'Calves', secondaryMuscles: [], equipment: ['Seated Calf Raise Machine'], type: 'weighted', movementPattern: 'legs' },
  { name: 'Donkey Calf Raise', primaryMuscle: 'Calves', secondaryMuscles: [], equipment: ['Donkey Calf Machine', 'Bodyweight'], type: 'weighted', movementPattern: 'legs' },

  // CORE
  { name: 'Plank', primaryMuscle: 'Core', secondaryMuscles: ['Shoulders', 'Glutes'], equipment: ['Bodyweight'], type: 'timed', movementPattern: 'core' },
  { name: 'Side Plank', primaryMuscle: 'Core', secondaryMuscles: ['Obliques', 'Shoulders'], equipment: ['Bodyweight'], type: 'timed', movementPattern: 'core' },
  { name: 'Hanging Leg Raise', primaryMuscle: 'Core', secondaryMuscles: ['Hip Flexors'], equipment: ['Pull-Up Bar'], type: 'bodyweight', movementPattern: 'core' },
  { name: 'Knee Raise', primaryMuscle: 'Core', secondaryMuscles: ['Hip Flexors'], equipment: ['Pull-Up Bar', 'Captain\'s Chair'], type: 'bodyweight', movementPattern: 'core' },
  { name: 'Ab Wheel Rollout', primaryMuscle: 'Core', secondaryMuscles: ['Shoulders', 'Lats'], equipment: ['Ab Wheel'], type: 'bodyweight', movementPattern: 'core' },
  { name: 'Cable Crunch', primaryMuscle: 'Core', secondaryMuscles: [], equipment: ['Cable'], type: 'weighted', movementPattern: 'core' },
  { name: 'Russian Twist', primaryMuscle: 'Core', secondaryMuscles: ['Obliques'], equipment: ['Bodyweight', 'Dumbbell', 'Medicine Ball'], type: 'weighted', movementPattern: 'core' },
  { name: 'Dead Bug', primaryMuscle: 'Core', secondaryMuscles: [], equipment: ['Bodyweight'], type: 'bodyweight', movementPattern: 'core' },
  { name: 'Bird Dog', primaryMuscle: 'Core', secondaryMuscles: ['Glutes', 'Lower Back'], equipment: ['Bodyweight'], type: 'bodyweight', movementPattern: 'core' },
  { name: 'Hollow Body Hold', primaryMuscle: 'Core', secondaryMuscles: [], equipment: ['Bodyweight'], type: 'timed', movementPattern: 'core' },

  // CARDIO / CONDITIONING
  { name: 'Running', primaryMuscle: 'Cardio', secondaryMuscles: ['Legs', 'Core'], equipment: ['Treadmill', 'Outdoors'], type: 'cardio', movementPattern: 'legs' },
  { name: 'Cycling', primaryMuscle: 'Cardio', secondaryMuscles: ['Legs'], equipment: ['Bike', 'Stationary Bike'], type: 'cardio', movementPattern: 'legs' },
  { name: 'Rowing', primaryMuscle: 'Cardio', secondaryMuscles: ['Back', 'Legs', 'Arms'], equipment: ['Rower'], type: 'cardio', movementPattern: 'pull' },
  { name: 'Jump Rope', primaryMuscle: 'Cardio', secondaryMuscles: ['Calves', 'Shoulders'], equipment: ['Jump Rope'], type: 'cardio', movementPattern: 'legs' },
  { name: 'Battle Ropes', primaryMuscle: 'Cardio', secondaryMuscles: ['Shoulders', 'Arms', 'Core'], equipment: ['Battle Ropes'], type: 'cardio', movementPattern: 'push' },
  { name: 'Burpee', primaryMuscle: 'Cardio', secondaryMuscles: ['Chest', 'Legs', 'Core', 'Shoulders'], equipment: ['Bodyweight'], type: 'bodyweight', movementPattern: 'legs' },
]

async function seed() {
  await mongoose.connect(env.MONGODB_URI)
  console.log('Connected to MongoDB')

  await Exercise.deleteMany({ isCustom: { $ne: true } })
  console.log('Cleared existing seeded exercises')

  const seeded = await Exercise.insertMany(
    exercises.map(e => ({ ...e, isCustom: false, createdBy: null }))
  )
  console.log(`Seeded ${seeded.length} exercises`)

  await mongoose.disconnect()
  console.log('Done')
  process.exit(0)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})