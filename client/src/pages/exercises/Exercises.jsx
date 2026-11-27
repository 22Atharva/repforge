import { useState, useEffect, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { exercisesApi } from '../../services/api'
import { Search, Filter, Plus, X, ChevronLeft, ChevronRight, Dumbbell, Loader2 } from 'lucide-react'

const exerciseSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  aliases: z.string().optional(),
  primaryMuscle: z.string().min(1, 'Primary muscle is required'),
  secondaryMuscles: z.string().optional(),
  equipment: z.string().optional(),
  type: z.enum(['weighted', 'bodyweight', 'assisted', 'timed', 'cardio']),
  movementPattern: z.enum(['push', 'pull', 'legs', 'core', 'hinge', 'carry']),
})

const MUSCLES = ['Chest', 'Back', 'Shoulders', 'Triceps', 'Biceps', 'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Core', 'Cardio']
const EQUIPMENT = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight', 'Kettlebell', 'EZ Bar', 'Pull-Up Bar', 'Dip Station', 'Bench', 'Box', 'Ab Wheel', 'Jump Rope', 'Battle Ropes', 'Treadmill', 'Bike', 'Rower', 'Plate', 'Landmine', 'Trap Bar', 'Nordic Bench', 'Sissy Squat Machine', 'Donkey Calf Machine', 'Wall']
const TYPES = ['weighted', 'bodyweight', 'assisted', 'timed', 'cardio']
const PATTERNS = ['push', 'pull', 'legs', 'core', 'hinge', 'carry']

export default function Exercises() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [muscleFilter, setMuscleFilter] = useState('')
  const [equipmentFilter, setEquipmentFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [page, setPage] = useState(1)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises', { search: debouncedSearch, muscle: muscleFilter, equipment: equipmentFilter, type: typeFilter, page }],
    queryFn: () => exercisesApi.list({ search: debouncedSearch, muscle: muscleFilter, equipment: equipmentFilter, type: typeFilter, page, limit: 50 }),
    placeholderData: (previousData) => previousData,
  })

  const createMutation = useMutation({
    mutationFn: (data) => exercisesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
      setShowCreateModal(false)
    },
  })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(exerciseSchema),
    defaultValues: { name: '', aliases: '', primaryMuscle: '', secondaryMuscles: '', equipment: '', type: 'weighted', movementPattern: 'push' },
  })

  const onCreateSubmit = (data) => {
    const payload = {
      ...data,
      aliases: data.aliases ? data.aliases.split(',').map(s => s.trim()).filter(Boolean) : [],
      secondaryMuscles: data.secondaryMuscles ? data.secondaryMuscles.split(',').map(s => s.trim()).filter(Boolean) : [],
      equipment: data.equipment ? data.equipment.split(',').map(s => s.trim()).filter(Boolean) : [],
    }
    createMutation.mutate(payload)
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">Failed to load exercises</div>
  }

  const exercises = data?.exercises || []
  const pagination = data?.pagination || { page: 1, limit: 50, total: 0, pages: 1 }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exercise Library</h1>
          <p className="text-gray-600 mt-1">Browse and manage your exercise database</p>
        </div>
        <button
          onClick={() => { reset(); setShowCreateModal(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Exercise
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exercises..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={muscleFilter}
              onChange={(e) => { setMuscleFilter(e.target.value); setPage(1); }}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Muscles</option>
              {MUSCLES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              value={equipmentFilter}
              onChange={(e) => { setEquipmentFilter(e.target.value); setPage(1); }}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Equipment</option>
              {EQUIPMENT.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Types</option>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Exercise</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Primary Muscle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Equipment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pattern</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={6} className="py-12 text-center"><Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" /></td></tr>
              ) : exercises.length === 0 ? (
                <tr className="text-center text-gray-500">
                  <td colSpan={6} className="py-12">
                    <Dumbbell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium">No exercises found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or add a new exercise</p>
                  </td>
                </tr>
              ) : (
                exercises.map((ex) => (
                  <tr key={ex._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{ex.name}</div>
                      {ex.aliases && ex.aliases.length > 0 && (
                        <div className="text-xs text-gray-500 mt-0.5">Also: {ex.aliases.join(', ')}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {ex.primaryMuscle}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                        {ex.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm max-w-xs truncate">
                      {ex.equipment?.join(', ') || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                        {ex.movementPattern}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ex.isCustom ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ex.isCustom ? 'Custom' : 'Built-in'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination.pages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Page {pagination.page} of {pagination.pages} — {pagination.total} exercises
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={pagination.page === 1}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                disabled={pagination.page === pagination.pages}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Create Exercise</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onCreateSubmit)} className="p-4 space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input {...register('name')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aliases (comma-separated)</label>
                <input {...register('aliases')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Bench Press, Press" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Muscle *</label>
                  <select {...register('primaryMuscle')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    {MUSCLES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.primaryMuscle && <p className="mt-1 text-sm text-red-600">{errors.primaryMuscle.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Muscles (comma-separated)</label>
                  <input {...register('secondaryMuscles')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Triceps, Front Delts" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Equipment (comma-separated)</label>
                  <input {...register('equipment')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Barbell, Dumbbell" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select {...register('type')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Movement Pattern *</label>
                <select {...register('movementPattern')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  {PATTERNS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => { setShowCreateModal(false); reset(); }} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting || createMutation.isPending} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50">
                  {isSubmitting || createMutation.isPending ? 'Creating...' : 'Create Exercise'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}