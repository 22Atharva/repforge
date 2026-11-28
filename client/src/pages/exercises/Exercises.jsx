import { useState, useEffect, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { exercisesApi } from '../../services/api'
import { Search, Filter, Plus, X, ChevronLeft, ChevronRight, Dumbbell, Loader2, Activity, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

const typeColors = {
  weighted: { bg: 'rgba(59, 130, 246, 0.12)', text: '#3b82f6' },
  bodyweight: { bg: 'rgba(34, 197, 94, 0.12)', text: '#22c55e' },
  assisted: { bg: 'rgba(168, 85, 247, 0.12)', text: '#a855f7' },
  timed: { bg: 'rgba(249, 115, 22, 0.12)', text: '#f97316' },
  cardio: { bg: 'rgba(236, 72, 153, 0.12)', text: '#ec4899' },
}

const patternColors = {
  push: { bg: 'rgba(239, 68, 68, 0.12)', text: '#ef4444' },
  pull: { bg: 'rgba(59, 130, 246, 0.12)', text: '#3b82f6' },
  legs: { bg: 'rgba(139, 92, 246, 0.12)', text: '#8b5cf6' },
  core: { bg: 'rgba(249, 115, 22, 0.12)', text: '#f97316' },
  hinge: { bg: 'rgba(168, 85, 247, 0.12)', text: '#a855f7' },
  carry: { bg: 'rgba(236, 72, 153, 0.12)', text: '#ec4899' },
}

export default function Exercises() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [muscleFilter, setMuscleFilter] = useState('')
  const [equipmentFilter, setEquipmentFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [page, setPage] = useState(1)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)

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
    return (
      <motion.div className="flex items-center justify-center min-h-[400px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.12)' }}>
            <svg className="h-8 w-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h3 className="text-lg font-medium text-text mb-2">Failed to load exercises</h3>
          <p className="text-text-muted">Please try again later</p>
        </div>
      </motion.div>
    )
  }

  const exercises = data?.exercises || []
  const pagination = data?.pagination || { page: 1, limit: 50, total: 0, pages: 1 }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
  }

  const handleOpenCreate = () => { reset(); setShowCreateModal(true); }

  return (
    <motion.div className="space-y-5xl" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }} initial="hidden" animate="visible">
      {/* Header */}
      <motion.section style={{ paddingTop: 'var(--spacing-xl)' }} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}>
        <motion.div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6" style={{ paddingBottom: 'var(--spacing-xl)' }}>
          <div>
            <motion.h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
              }}
            >
              Exercise Library
            </motion.h1>
            <motion.p
              className="text-text-muted"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', marginTop: 'var(--spacing-md)', maxWidth: '45ch' }}
            >
              Browse, search, and manage your exercise database. Build your perfect movement library.
            </motion.p>
          </div>

          <motion.button
            onClick={handleOpenCreate}
            className="btn btn-primary group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-90" />
            <span>Add Exercise</span>
          </motion.button>
        </motion.div>
      </motion.section>

      <motion.div className="divider" />

      {/* Search & Filters */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 p-5 lg:p-6">
            <div className="relative flex-1">
              <motion.div className="absolute inset-0" whileHover={{ scaleX: [1, 1.02] }} transition={{ duration: 300 }}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-dim" />
              </motion.div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercises..."
                className="input pl-12 pr-4"
                placeholder="Search exercises..."
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-secondary gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SlidersHorizontal className="h-4 w-4 group-hover:rotate-45 transition-transform" />
                <span className="hidden sm:inline">Filters</span>
                <span className="text-text-muted text-sm font-medium">{muscleFilter || equipmentFilter || typeFilter ? 'Active' : ''}</span>
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="pt-4 border-t border-border"
              >
                <div className="flex flex-col sm:flex-row gap-3 p-5 lg:p-6">
                  <select
                    value={muscleFilter}
                    onChange={(e) => { setMuscleFilter(e.target.value); setPage(1); }}
                    className="input flex-1 max-w-xs"
                  >
                    <option value="">All Muscles</option>
                    {MUSCLES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select
                    value={equipmentFilter}
                    onChange={(e) => { setEquipmentFilter(e.target.value); setPage(1); }}
                    className="input flex-1 max-w-xs"
                  >
                    <option value="">All Equipment</option>
                    {EQUIPMENT.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                    className="input flex-1 max-w-xs"
                  >
                    <option value="">All Types</option>
                    {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                  <motion.button
                    onClick={() => { setMuscleFilter(''); setEquipmentFilter(''); setTypeFilter(''); setPage(1); }}
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <X className="h-4 w-4 mr-2" /> Clear All
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* Exercises Table */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
        <motion.div className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                className="flex items-center justify-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    className="relative w-12 h-12"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute inset-0 border-2 border-transparent border-t-accent rounded-full" />
                  </motion.div>
                  <p className="text-text-muted">Loading exercises...</p>
                </div>
              </motion.div>
            ) : exercises.length === 0 ? (
              <motion.div
                key="empty"
                className="flex flex-col items-center justify-center py-16"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(212, 168, 67, 0.12)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Dumbbell className="h-10 w-10" style={{ color: 'var(--color-accent)' }} />
                </motion.div>
                <motion.h3 className="text-lg font-medium text-text mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  No exercises found
                </motion.h3>
                <motion.p className="text-text-muted text-sm mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  Try adjusting your filters or add a new exercise
                </motion.p>
                <motion.button onClick={() => { reset(); setShowCreateModal(true); }} className="btn btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Plus className="h-4 w-4 mr-2" /> Add Your First Exercise
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="table"
                className="overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-5 py-4 text-left text-xs font-semibold text-text-dim uppercase tracking-wider">Exercise</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-text-dim uppercase tracking-wider">Primary Muscle</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-text-dim uppercase tracking-wider">Type</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-text-dim uppercase tracking-wider">Equipment</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-text-dim uppercase tracking-wider">Pattern</th>
                      <th className="px-5 py-4 text-right text-xs font-semibold text-text-dim uppercase tracking-wider">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <AnimatePresence>
                      {exercises.map((ex, index) => (
                        <motion.tr
                          key={ex._id}
                          custom={index}
                          className="group hover:bg-bg-card/50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="px-5 py-4">
                            <div className="font-medium text-text group-hover:text-accent transition-colors">{ex.name}</div>
                            {ex.aliases && ex.aliases.length > 0 && (
                              <div className="text-xs text-text-dim mt-0.5 truncate">
                                Also: {ex.aliases.join(', ')}
                              </div>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <span className="badge badge-muted" style={{ background: `rgba(168, 85, 247, 0.12)`, color: '#a855f7' }}>
                              <Activity className="h-3 w-3 mr-1.5" /> {ex.primaryMuscle}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {typeColors[ex.type] && (
                              <span className="badge" style={{ background: typeColors[ex.type].bg, color: typeColors[ex.type].text }}>
                                {ex.type.charAt(0).toUpperCase() + ex.type.slice(1)}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-text-muted text-sm max-w-xs truncate">
                            {ex.equipment?.join(', ') || '—'}
                          </td>
                          <td className="px-5 py-4">
                            {patternColors[ex.movementPattern] && (
                              <span className="badge" style={{ background: patternColors[ex.movementPattern].bg, color: patternColors[ex.movementPattern].text }}>
                                {ex.movementPattern.charAt(0).toUpperCase() + ex.movementPattern.slice(1)}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className={`badge ${ex.isCustom ? 'badge-accent' : 'badge-muted'}`}>
                              {ex.isCustom ? 'Custom' : 'Built-in'}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <motion.div
              className="flex items-center justify-between mt-6 pt-5 border-t border-border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.div className="text-sm text-text-muted">
                Page {pagination.page} of {pagination.pages} — {pagination.total} exercises
              </motion.div>
              <motion.div className="flex gap-2" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }} initial="hidden" animate="visible">
                <motion.button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={pagination.page === 1}
                  className="btn btn-secondary btn-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={pagination.page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </motion.button>
                <motion.button
                  onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={pagination.page === pagination.pages}
                  className="btn btn-secondary btn-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={pagination.page === pagination.pages}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => { setShowCreateModal(false); }}
            style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              className="bg-bg-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 lg:p-6 border-b border-border">
                <motion.h2 className="text-lg font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                  Create Exercise
                </motion.h2>
                <motion.button
                  onClick={() => { setShowCreateModal(false); reset(); }}
                  className="p-2 rounded-xl text-text-dim hover:text-text hover:bg-bg-card transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <form onSubmit={handleSubmit(onCreateSubmit)} className="p-5 lg:p-6 space-y-4" noValidate>
                <div>
                  <label className="label">Name *</label>
                  <input {...register('name')} className="input" />
                  {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="label">Aliases (comma-separated)</label>
                  <input {...register('aliases')} className="input" placeholder="Bench Press, Press" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Primary Muscle *</label>
                    <select {...register('primaryMuscle')} className="input">
                      {MUSCLES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    {errors.primaryMuscle && <p className="mt-1 text-sm text-error">{errors.primaryMuscle.message}</p>}
                  </div>
                  <div>
                    <label className="label">Secondary Muscles (comma-separated)</label>
                    <input {...register('secondaryMuscles')} className="input" placeholder="Triceps, Front Delts" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Equipment (comma-separated)</label>
                    <input {...register('equipment')} className="input" placeholder="Barbell, Dumbbell" />
                  </div>
                  <div>
                    <label className="label">Type *</label>
                    <select {...register('type')} className="input">
                      {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Movement Pattern *</label>
                  <select {...register('movementPattern')} className="input">
                    {PATTERNS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <motion.button
                    type="button"
                    onClick={() => { setShowCreateModal(false); reset(); }}
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || createMutation.isPending}
                    className="btn btn-primary"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting || createMutation.isPending ? 'Creating...' : 'Create Exercise'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.div>
  )
}