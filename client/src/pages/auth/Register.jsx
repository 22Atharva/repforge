import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Mail, Lock, User, AlertCircle, Eye, EyeOff, Dumbbell, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async data => {
    setError('');
    setLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--color-bg)' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ opacity: 0.03 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, var(--color-accent), transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, var(--color-accent), transparent)' }} />
      </motion.div>

      <motion.div
        className="relative w-full max-w-md"
        variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } } }}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-8" variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } } }}>
          <motion.div
            className="relative inline-flex items-center justify-center mb-6"
            style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, var(--color-accent), #c49638)',
              boxShadow: 'var(--shadow-lg)',
            }}
            whileHover={{ scale: 1.02, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Dumbbell className="h-8 w-8" style={{ color: 'var(--color-bg)' }} />
          </motion.div>
          <motion.h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              marginTop: 'var(--spacing-md)',
            }}
          >
            Create your account
          </motion.h1>
          <motion.p className="text-text-muted" style={{ fontSize: '1.0625rem', marginTop: 'var(--spacing-sm)', maxWidth: '35ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Start tracking your strength journey
          </motion.p>
        </motion.div>

        <motion.div
          className="card-elevated p-6 lg:p-8"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } } }}
        >
          <motion.div
            className="space-y-5"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            {error && (
              <motion.div
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="flex-shrink-0 p-2 rounded-lg"
                  style={{ background: 'rgba(239, 68, 68, 0.18)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <AlertCircle className="h-5 w-5 text-error" />
                </motion.div>
                <motion.p className="text-error text-sm font-medium flex-1">{error}</motion.p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                <label htmlFor="name" className="label">Name</label>
                <div className="relative">
                  <motion.div className="absolute left-4 top-1/2 -translate-y-1/2" whileFocusWithin={{ scale: 1.1 }}>
                    <User className="h-5 w-5 text-text-dim" />
                  </motion.div>
                  <input
                    {...register('name')}
                    id="name"
                    type="text"
                    autoComplete="name"
                    className="input pl-12"
                    placeholder="John Doe"
                    disabled={loading}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </div>
                {errors.name && (
                  <motion.p id="name-error" className="text-error text-sm flex items-center gap-1" role="alert" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.name.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.05 } } }}>
                <label htmlFor="email" className="label">Email</label>
                <div className="relative">
                  <motion.div className="absolute left-4 top-1/2 -translate-y-1/2" whileFocusWithin={{ scale: 1.1 }}>
                    <Mail className="h-5 w-5 text-text-dim" />
                  </motion.div>
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="input pl-12"
                    placeholder="you@example.com"
                    disabled={loading}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <motion.p id="email-error" className="text-error text-sm flex items-center gap-1" role="alert" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } } }}>
                <label htmlFor="password" className="label">Password</label>
                <div className="relative">
                  <motion.div className="absolute left-4 top-1/2 -translate-y-1/2" whileFocusWithin={{ scale: 1.1 }}>
                    <Lock className="h-5 w-5 text-text-dim" />
                  </motion.div>
                  <input
                    {...register('password')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className="input pl-12 pr-12"
                    placeholder="••••••••"
                    disabled={loading}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim hover:text-text transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </motion.button>
                </div>
                {errors.password && (
                  <motion.p id="password-error" className="text-error text-sm flex items-center gap-1" role="alert" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.15 } } }}>
                <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                <div className="relative">
                  <motion.div className="absolute left-4 top-1/2 -translate-y-1/2" whileFocusWithin={{ scale: 1.1 }}>
                    <Lock className="h-5 w-5 text-text-dim" />
                  </motion.div>
                  <input
                    {...register('confirmPassword')}
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className="input pl-12 pr-4"
                    placeholder="••••••••"
                    disabled={loading}
                    aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                    aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                  />
                </div>
                {errors.confirmPassword && (
                  <motion.p id="confirm-error" className="text-error text-sm flex items-center gap-1" role="alert" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.confirmPassword.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full group"
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? (
                  <>
                    <motion.span className="animate-spin mr-2">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </motion.span>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create account</span>
                    <motion.div className="ml-2 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </>
                )}
              </motion.button>
            </form>

            <motion.p className="text-center text-text-muted text-sm" style={{ marginTop: 'var(--spacing-md)' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}