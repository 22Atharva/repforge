import { useAuth } from '../features/auth/hooks/useAuth';
import { User, Mail, Settings, Dumbbell, Target, LogOut, BarChart2, Flame, Trophy, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'fitness', label: 'Fitness', icon: Target },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
  };

  return (
    <motion.div className="max-w-3xl mx-auto space-y-5xl" variants={containerVariants} initial="hidden" animate="visible">
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
              Profile
            </motion.h1>
            <motion.p className="text-text-muted" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', marginTop: 'var(--spacing-md)', maxWidth: '45ch' }}>
              Manage your account, preferences, and fitness profile
          </motion.p>
          </div>
        </motion.div>
      </motion.section>

      <motion.div className="divider" />

      {/* Tabs */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
        <motion.nav className="card" aria-label="Profile tabs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
          <div className="flex flex-wrap -mb-px" role="tablist">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-4 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-accent'
                    : 'text-text-muted hover:text-text hover:bg-bg-card'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } } }}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <motion.span
                  className="flex items-center justify-center"
                  style={{ width: '1.25rem', height: '1.25rem' }}
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <tab.icon className="h-5 w-5" style={{ color: 'inherit' }} />
                </motion.span>
                <span>{tab.label}</span>
                <motion.div
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))',
                    transformOrigin: 'center',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === tab.id ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                />
              </motion.button>
            ))}
          </div>
        </motion.nav>
      </motion.section>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="p-5 lg:p-6">
            {activeTab === 'account' && (
              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="visible">
                <motion.div className="flex items-center gap-4 mb-6" custom={0} variants={itemVariants}>
                  <motion.div
                    className="relative flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="w-24 h-24 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-accent), #c49638)' }}>
                      <User className="h-12 w-12" style={{ color: 'var(--color-bg)' }} />
                    </div>
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, var(--color-accent), #c49638)', boxShadow: 'var(--shadow-md)' }}
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <Shield className="h-3.5 w-3.5" style={{ color: 'var(--color-bg)' }} />
                    </motion.div>
                  </motion.div>
                  <div>
                    <motion.h2 className="text-xl lg:text-2xl font-semibold text-text" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '-0.02em' }}>
                      {user?.name || 'User'}
                    </motion.h2>
                    <motion.p className="text-text-muted mt-1">{user?.email || 'email@example.com'}</motion.p>
                  </div>
                </motion.div>

                <motion.div className="border-t border-border pt-6" custom={1} variants={itemVariants}>
                  <motion.h3 className="text-lg font-medium text-text mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                    Account Info
                  </motion.h3>
                  <motion.dl className="space-y-4" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }} initial="hidden" animate="visible">
                    <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 rounded-xl" style={{ background: 'var(--color-bg-elevated)' }} custom={0} variants={itemVariants}>
                      <motion.dt className="text-text-muted">Email</motion.dt>
                      <motion.dd className="font-medium text-text flex items-center gap-2">
                        {user?.email}
                        <motion.button className="p-1 text-text-dim hover:text-accent hover:bg-bg-card rounded-lg transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M14 11h5m-5 0v-5m5 5v-5" /></svg>
                        </motion.button>
                      </motion.dd>
                    </motion.div>
                    <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 rounded-xl" style={{ background: 'var(--color-bg-elevated)' }} custom={1} variants={itemVariants}>
                      <motion.dt className="text-text-muted">Member since</motion.dt>
                      <motion.dd className="font-medium text-text">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                      </motion.dd>
                    </motion.div>
                  </motion.dl>
                </motion.div>

                <motion.div className="pt-6" custom={2} variants={itemVariants}>
                  <motion.button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-error hover:bg-error/10 transition-colors"
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign out</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.form className="space-y-6" onSubmit={e => e.preventDefault()} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="visible">
                <motion.fieldset custom={0} variants={itemVariants}>
                  <legend className="text-lg font-medium text-text mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>Units</legend>
                  <motion.div className="grid grid-cols-2 gap-4" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }} initial="hidden" animate="visible">
                    {[
                      { label: 'Metric (kg, cm)', value: 'metric', desc: 'Kilograms, centimeters' },
                      { label: 'Imperial (lb, in)', value: 'imperial', desc: 'Pounds, inches' },
                    ].map((opt, i) => (
                      <motion.label key={opt.value} custom={i} variants={itemVariants} className="relative">
                        <input type="radio" name="units" value={opt.value} defaultChecked={opt.value === 'metric'} className="sr-only" />
                        <motion.div
                          className="p-4 rounded-xl cursor-pointer transition-all duration-300"
                          style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
                          whileHover={{ borderColor: 'var(--color-accent)', boxShadow: 'var(--shadow-md)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div className="font-medium text-text">{opt.label}</motion.div>
                          <motion.p className="text-sm text-text-muted mt-1">{opt.desc}</motion.p>
                        </motion.div>
                      </motion.label>
                    ))}
                  </motion.div>
                </motion.fieldset>

                <motion.fieldset custom={1} variants={itemVariants}>
                  <legend className="text-lg font-medium text-text mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>Default Rest Timer</legend>
                  <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-3" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }} initial="hidden" animate="visible">
                    {[
                      { label: '60s', value: 60 },
                      { label: '90s', value: 90 },
                      { label: '120s', value: 120 },
                      { label: '180s', value: 180 },
                      { label: '3 min', value: 180 },
                      { label: 'Custom', value: 'custom' },
                    ].map((opt, i) => (
                      <motion.label key={opt.value} custom={i} variants={itemVariants} className="relative">
                        <input type="radio" name="restTimer" value={opt.value} className="sr-only" />
                        <motion.div
                          className="p-4 rounded-xl cursor-pointer text-center transition-all duration-300"
                          style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
                          whileHover={{ borderColor: 'var(--color-accent)', boxShadow: 'var(--shadow-md)', y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.span className="font-medium text-text">{opt.label}</motion.span>
                        </motion.div>
                      </motion.label>
                    ))}
                  </motion.div>
                </motion.fieldset>

                <motion.button type="submit" className="btn btn-primary w-full" whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}>
                  Save Preferences
                </motion.button>
              </motion.form>
            )}

            {activeTab === 'fitness' && (
              <motion.form className="space-y-6" onSubmit={e => e.preventDefault()} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="visible">
                <motion.fieldset custom={0} variants={itemVariants}>
                  <legend className="text-lg font-medium text-text mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>Experience Level</legend>
                  <motion.div className="grid grid-cols-3 gap-4" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }} initial="hidden" animate="visible">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level, i) => (
                      <motion.label key={level} custom={i} variants={itemVariants} className="relative">
                        <input type="radio" name="experience" value={level.toLowerCase()} className="sr-only" />
                        <motion.div
                          className="p-4 rounded-xl cursor-pointer text-center transition-all duration-300"
                          style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
                          whileHover={{ borderColor: 'var(--color-accent)', boxShadow: 'var(--shadow-md)', y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.span className="font-medium text-text">{level}</motion.span>
                        </motion.div>
                      </motion.label>
                    ))}
                  </motion.div>
                </motion.fieldset>

                <motion.fieldset custom={1} variants={itemVariants}>
                  <legend className="text-lg font-medium text-text mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>Primary Goal</legend>
                  <motion.div className="grid grid-cols-2 gap-4" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }} initial="hidden" animate="visible">
                    {[
                      { label: 'Strength', icon: Dumbbell },
                      { label: 'Hypertrophy', icon: Target },
                      { label: 'Endurance', icon: Flame },
                      { label: 'Skill', icon: Trophy },
                    ].map((goal, i) => (
                      <motion.label key={goal.label} custom={i} variants={itemVariants} className="relative">
                        <input type="checkbox" name="goals" value={goal.label.toLowerCase()} className="sr-only" />
                        <motion.div
                          className="p-4 rounded-xl cursor-pointer flex items-center gap-3 transition-all duration-300"
                          style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
                          whileHover={{ borderColor: 'var(--color-accent)', boxShadow: 'var(--shadow-md)', y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div className="p-2 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }} whileHover={{ scale: 1.1, rotate: 6 }}>
                            <goal.icon className="h-5 w-5" />
                          </motion.div>
                          <motion.span className="font-medium text-text">{goal.label}</motion.span>
                        </motion.div>
                      </motion.label>
                    ))}
                  </motion.div>
                </motion.fieldset>

                <motion.fieldset custom={2} variants={itemVariants}>
                  <legend className="text-lg font-medium text-text mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>Default Split</legend>
                  <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-3" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }} initial="hidden" animate="visible">
                    {['PPL', 'Upper/Lower', 'UL-PPL', 'Full Body', 'Custom'].map((split, i) => (
                      <motion.label key={split} custom={i} variants={itemVariants} className="relative">
                        <input type="radio" name="split" value={split.toLowerCase().replace(/\//g, '-')} className="sr-only" />
                        <motion.div
                          className="p-4 rounded-xl cursor-pointer text-center transition-all duration-300"
                          style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
                          whileHover={{ borderColor: 'var(--color-accent)', boxShadow: 'var(--shadow-md)', y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.span className="font-medium text-text">{split}</motion.span>
                        </motion.div>
                      </motion.label>
                    ))}
                  </motion.div>
                </motion.fieldset>

                <motion.button type="submit" className="btn btn-primary w-full" whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}>
                  Save Fitness Profile
                </motion.button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}