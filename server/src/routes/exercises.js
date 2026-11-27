import express from 'express'
import { listExercises, getExercise, createExercise, updateExercise, deleteExercise } from '../controllers/exerciseController.js'
import { validate } from '../middleware/validate.js'
import { authenticate } from '../middleware/auth.js'
import { exerciseSchema } from '../utils/validationSchemas.js'

const router = express.Router()

router.get('/', listExercises)
router.get('/:id', getExercise)
router.post('/', authenticate, validate(exerciseSchema), createExercise)
router.patch('/:id', authenticate, validate(exerciseSchema.partial()), updateExercise)
router.delete('/:id', authenticate, deleteExercise)

export default router