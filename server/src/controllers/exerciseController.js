import { Exercise } from '../models/index.js'
import { exerciseSchema } from '../utils/validationSchemas.js'

export async function listExercises(req, res) {
  const { muscle, equipment, type, search, page = 1, limit = 50 } = req.query
  const query = {}

  if (muscle) query.primaryMuscle = muscle
  if (equipment) query.equipment = { $in: [equipment] }
  if (type) query.type = type
  if (search) {
    query.$text = { $search: search }
  }

  const skip = (parseInt(page) - 1) * parseInt(limit)
  const exercises = await Exercise.find(query)
    .sort({ name: 1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean()

  const total = await Exercise.countDocuments(query)

  res.json({
    exercises,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit))
    }
  })
}

export async function getExercise(req, res) {
  const exercise = await Exercise.findById(req.params.id).lean()
  if (!exercise) {
    return res.status(404).json({ message: 'Exercise not found' })
  }
  res.json(exercise)
}

export async function createExercise(req, res) {
  const exercise = await Exercise.create({
    ...req.body,
    isCustom: true,
    createdBy: req.user._id
  })
  res.status(201).json(exercise)
}

export async function updateExercise(req, res) {
  const exercise = await Exercise.findById(req.params.id)
  if (!exercise) {
    return res.status(404).json({ message: 'Exercise not found' })
  }
  if (exercise.createdBy && !exercise.createdBy.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to update this exercise' })
  }
  Object.assign(exercise, req.body)
  await exercise.save()
  res.json(exercise)
}

export async function deleteExercise(req, res) {
  const exercise = await Exercise.findById(req.params.id)
  if (!exercise) {
    return res.status(404).json({ message: 'Exercise not found' })
  }
  if (exercise.createdBy && !exercise.createdBy.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to delete this exercise' })
  }
  await exercise.deleteOne()
  res.json({ message: 'Exercise deleted' })
}