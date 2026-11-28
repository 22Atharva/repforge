import { useAuth } from '../features/auth/hooks/useAuth';
import { Dumbbell, Flame, Calendar, TrendingUp, Target, Clock, ArrowRight, BarChart2, Trophy, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Current Streak',
    value: '0',
    suffix: ' days',
    icon: Flame,
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.12)',
    trend: '+12%',
    trendLabel: 'vs last month',
  },
  {
    label: 'Sessions This Month',
    value: '0',
    suffix: '',
    icon: Calendar,
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.12)',
    trend: '+3',
    trendLabel: 'vs last month',
  },
  {
    label: 'Total Volume',
    value: '0',
    suffix: ' kg',
    icon: Dumbbell,
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.12)',
    trend: '+2.4t',
    trendLabel: 'vs last month',
  },
  {
    label: 'Personal Records',
    value: '0',
    suffix: '',
    icon: Trophy,
    color: '#d4a843',
    bg: 'rgba(212, 168, 67, 0.12)',
    trend: '+2',
    trendLabel: 'this month',
  },
];

const quickActions = [
  { label: 'Start Workout', href: '/planner', icon: Dumbbell, primary: true, description: 'Plan and log your session' },
  { label: 'Track Nutrition', href: '/nutrition', icon: 'utensils', primary: false, description: 'Log meals and water' },
  { label: 'View History', href: '/history', icon: Clock, primary: false, description: 'Review past sessions' },
];

const iconMap = {
  utensils: <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5-5H6a5 5 0 0 0-5 5v13"/><path d="M7 20a2 2 0 0 1-2-2"/><path d="M17 20a2 2 0 0 0 2-2"/></svg>,
};

export default function Dashboard() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
  };

  return (
    <motion.div className="space-y-5xl" variants={containerVariants} initial="hidden" animate="visible">
      {/* Hero Section */}
      <motion.section className="relative" variants={itemVariants} style={{ paddingTop: 'var(--spacing-xl)' }}>
        <motion.div className="absolute inset-0 -z-10" style={{ opacity: 0.03 }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, var(--color-accent), transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, var(--color-accent), transparent)' }} />
        </motion.div>

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
              Welcome back,{' '}
              <span style={{ fontWeight: 400, color: 'var(--color-accent)' }}>
                {user?.name || 'Athlete'}
              </span>
            </motion.h1>
            <motion.p
              className="text-text-muted"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', marginTop: 'var(--spacing-md)', maxWidth: '40ch' }}
            >
              Every rep counts. Every meal matters. Every day brings you closer.
            </motion.p>
          </div>

          <motion.div className="flex flex-wrap gap-3" style={{ marginTop: 'var(--spacing-lg)' }}>
            <Link to="/planner" className="btn btn-primary btn-lg group">
              <Dumbbell className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-6" />
              <span>Start Workout</span>
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.1))' }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              />
            </Link>
            <Link to="/nutrition" className="btn btn-secondary btn-lg group">
              <svg className="h-5 w-5 mr-2 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5-5H6a5 5 0 0 0-5 5v13"/><path d="M7 20a2 2 0 0 1-2-2"/><path d="M17 20a2 2 0 0 0 2-2"/></svg>
              <span>Nutrition</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.div className="divider" />

      {/* Stats Grid */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5" variants={itemVariants}>
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              custom={index}
              className="card group relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, var(--color-bg-card), var(--color-bg-elevated))',
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}15, transparent 60%)`,
                  opacity: 0,
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 400 }}
              />
              <div className="relative flex flex-col h-full p-5 lg:p-6">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="p-3 rounded-xl"
                    style={{ background: stat.bg }}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                  </motion.div>
                  <motion.div
                    className="text-right"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <p className="text-xs font-medium text-text-dim uppercase tracking-wider mb-1">
                      {stat.trendLabel}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-success)' }}>
                      {stat.trend}
                    </p>
                  </motion.div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <motion.p
                      className="text-text-muted text-sm font-medium uppercase tracking-wider mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {stat.label}
                    </motion.p>
                    <motion.div
                      className="flex items-baseline gap-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                    >
                      <motion.span
                        className="text-3xl lg:text-4xl font-light"
                        style={{
                          fontFamily: 'var(--font-display)',
                          letterSpacing: '-0.03em',
                          color: 'var(--color-text)',
                        }}
                      >
                        {stat.value}
                      </motion.span>
                      <motion.span
                        className="text-text-muted text-lg font-medium"
                        style={{ marginBottom: '0.125em' }}
                      >
                        {stat.suffix}
                      </motion.span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="pt-4 border-t border-border"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      to="/history"
                      className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-accent transition-colors group"
                    >
                      View details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.div className="divider" />

      {/* Quick Actions */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="flex items-center justify-between mb-5" variants={itemVariants}>
          <motion.h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
            }}
          >
            Quick Actions
          </motion.h2>
          <motion.div className="text-text-muted text-sm">
            3 ways to level up today
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={itemVariants}>
          {quickActions.map((action, index) => (
            <motion.article
              key={action.label}
              custom={index}
              className={`card relative overflow-hidden group ${action.primary ? 'ring-1' : ''}`}
              style={{
                borderColor: action.primary ? 'var(--color-accent)' : 'var(--color-border)',
                background: action.primary ? 'linear-gradient(145deg, var(--color-accent-light), var(--color-bg-card))' : undefined,
              }}
              whileHover={{ y: -6, boxShadow: 'var(--shadow-xl)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.div className="p-5 lg:p-6 h-full flex flex-col">
                <motion.div
                  className="flex items-center justify-between mb-4"
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {action.icon === 'utensils' ? (
                    <svg className="h-8 w-8 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5-5H6a5 5 0 0 0-5 5v13"/><path d="M7 20a2 2 0 0 1-2-2"/><path d="M17 20a2 2 0 0 0 2-2"/></svg>
                  ) : (
                    <motion.span
                      className="p-3 rounded-xl"
                      style={{ background: action.primary ? 'var(--color-accent)' : 'var(--color-accent-light)' }}
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <action.icon className="h-6 w-6" style={{ color: action.primary ? 'var(--color-bg)' : 'var(--color-accent)' }} />
                    </motion.span>
                  )}
                  <motion.div className="ml-auto text-text-dim text-xs font-medium uppercase tracking-wider group-hover:text-accent transition-colors">
                    Action
                  </motion.div>
                </motion.div>

                <div className="flex-1 flex flex-col justify-between">
                  <motion.h3
                    className="text-lg lg:text-xl font-medium mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontWeight: 400 }}
                  >
                    {action.label}
                  </motion.h3>
                  <motion.p className="text-text-muted text-sm leading-relaxed flex-1">
                    {action.description}
                  </motion.p>

                  <motion.button
                    className={`w-full mt-4 rounded-xl font-medium transition-all group-hover:translate-x-1 ${action.primary ? 'btn-primary' : 'btn-secondary'}`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.primary ? (
                      <>
                        <span>Start Now</span>
                        <motion.span className="ml-2" initial={{ x: 0 }} whileHover={{ x: 4 }}>
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </>
                    ) : (
                      'Open'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.div className="divider" />

      {/* Progress Preview */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5" variants={itemVariants}>
          <motion.h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
            }}
          >
            Strength Progress
          </motion.h2>
          <motion.div className="flex items-center gap-2 text-text-muted text-sm">
            <BarChart2 className="h-4 w-4 text-accent" />
            <span>Charts coming in Phase 6</span>
          </motion.div>
        </motion.div>

        <motion.article className="card-elevated relative overflow-hidden" variants={itemVariants}>
          <div className="absolute inset-0" style={{ opacity: 0.02 }}>
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl" style={{ background: 'var(--color-accent)' }} />
          </div>
          <div className="relative h-64 lg:h-80 flex items-center justify-center p-8">
            <motion.div className="text-center max-w-md">
              <motion.div
                className="inline-flex items-center justify-center mb-6"
                style={{
                  width: '6rem',
                  height: '6rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-accent-light), transparent)',
                  border: '1px solid var(--color-accent-light)',
                }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <BarChart2 className="h-10 w-10 text-accent" />
              </motion.div>
              <motion.h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  marginBottom: 'var(--spacing-sm)',
                }}
              >
                Visualize Your Journey
              </motion.h3>
              <motion.p className="text-text-muted max-w-sm mx-auto mb-6">
                Interactive charts for volume trends, PR progression, and muscle balance coming soon.
              </motion.p>
              <motion.button className="btn btn-ghost group" whileHover={{ scale: 1.02 }}>
                Notify Me When Ready
                <motion.span className="ml-2 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </motion.article>
      </motion.section>
    </motion.div>
  );
}