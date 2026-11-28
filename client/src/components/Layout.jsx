import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  Dumbbell,
  BookOpen,
  ClipboardList,
  Activity,
  History,
  User,
  LogOut,
  Menu,
  X,
  Utensils,
  Droplets,
  Sun,
  Moon,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Activity },
  { path: '/exercises', label: 'Exercises', icon: BookOpen },
  { path: '/planner', label: 'Planner', icon: ClipboardList },
  { path: '/nutrition', label: 'Nutrition', icon: Utensils },
  { path: '/history', label: 'History', icon: History },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function Layout() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="relative w-12 h-12 animate-spin" style={{ border: '2px solid transparent', borderTopColor: 'var(--color-accent)', borderRadius: '50%' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
          borderBottomColor: scrolled ? 'var(--color-border)' : 'transparent',
          backdropFilter: 'blur(20px)',
        }}
      >
        <nav className="container" aria-label="Main navigation" style={{ height: '4.5rem' }}>
          <div className="flex h-full items-center justify-between">
            <NavLink
              to="/"
              className="flex items-center gap-3"
              aria-label="RepForge Home"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="relative p-2 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent), #c49638)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <Dumbbell className="h-6 w-6" style={{ color: 'var(--color-bg)' }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                }}
              >
                RepForge
              </span>
            </NavLink>

            <div className="hidden md:flex md:items-center md:gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                    text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-accent bg-accent-light'
                        : 'text-text-muted hover:text-text hover:bg-bg-card'
                    }`
                  }
                  style={{ textDecoration: 'none' }}
                >
                  <span className="flex items-center justify-center" style={{ width: '1.25rem', height: '1.25rem' }}>
                    <item.icon className="h-5 w-5" style={{ color: 'inherit' }} />
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            <div className="hidden md:flex md:items-center md:gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative p-2.5 rounded-xl bg-bg-card border border-border hover:bg-bg-card-hover hover:border-border-light transition-all duration-300"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-accent" />
                ) : (
                  <Moon className="h-5 w-5 text-text-muted" />
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block px-4 py-2 text-sm font-medium text-text-muted">
                    {user.name}
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-text-muted hover:text-error hover:bg-error/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/login"
                    className="px-4 py-2.5 rounded-xl font-medium text-text-muted hover:text-text hover:bg-bg-card transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="btn btn-primary btn-sm"
                  >
                    Get Started
                  </NavLink>
                </div>
              )}
            </div>

            <button
              className="md:hidden p-2.5 rounded-xl bg-bg-card border border-border hover:bg-bg-card-hover hover:border-border-light transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-text" /> : <Menu className="h-6 w-6 text-text" />}
            </button>
          </div>

          <div
            id="mobile-menu"
            className={`md:hidden overflow-hidden border-t border-border transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
            }`}
          >
            <div className="py-6 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-colors
                    ${isActive
                      ? 'text-accent bg-accent-light'
                      : 'text-text-muted hover:text-text hover:bg-bg-card'
                    }
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="flex items-center justify-center" style={{ width: '1.5rem', height: '1.5rem' }}>
                    <item.icon className="h-6 w-6" style={{ color: 'inherit' }} />
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
              {user ? (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl font-medium text-error hover:bg-error/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <NavLink
                    to="/login"
                    className="w-full px-4 py-3.5 rounded-xl font-medium text-text-muted hover:text-text hover:bg-bg-card transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="btn btn-primary w-full py-3.5 rounded-xl text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="container" id="main-content" style={{ paddingTop: '2.5rem', paddingBottom: '4.5rem' }}>
        <Outlet />
      </main>

      <footer className="border-t border-border py-8" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Dumbbell className="h-4 w-4 text-accent" />
              <span style={{ fontFamily: 'var(--font-display)' }}>RepForge</span>
            </div>
            <p className="text-text-dim text-sm">Built with intention. Train with purpose.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}