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
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Activity },
  { path: '/exercises', label: 'Exercises', icon: BookOpen },
  { path: '/planner', label: 'Planner', icon: ClipboardList },
  { path: '/history', label: 'History', icon: History },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function Layout() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="container-main" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-primary"
              aria-label="RepForge Home"
            >
              <Dumbbell className="h-6 w-6" />
              <span>RepForge</span>
            </NavLink>

            <div className="hidden md:flex md:items-center md:gap-6">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="hidden md:flex md:items-center md:gap-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">{user.name}</span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/login"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>

            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-2">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium ${
                        isActive
                          ? 'bg-primary-light text-primary'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                ))}
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 pt-2">
                    <NavLink
                      to="/login"
                      className="px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="px-3 py-2 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-hover"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="container-main py-6" id="main-content">
        <Outlet />
      </main>
    </div>
  );
}
