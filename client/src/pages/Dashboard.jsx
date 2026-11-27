import { useAuth } from '../features/auth/hooks/useAuth';
import { Dumbbell, Flame, Calendar, TrendingUp, Target, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  {
    label: 'Current Streak',
    value: '0 days',
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-100',
  },
  {
    label: 'Sessions This Month',
    value: '0',
    icon: Calendar,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  {
    label: 'Total Volume',
    value: '0 kg',
    icon: Dumbbell,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
  },
  {
    label: 'Personal Records',
    value: '0',
    icon: Target,
    color: 'text-green-500',
    bg: 'bg-green-100',
  },
];

const quickActions = [
  { label: 'Start Workout', href: '/planner', icon: Dumbbell, primary: true },
  { label: 'Browse Exercises', href: '/exercises', icon: Target },
  { label: 'View History', href: '/history', icon: Clock },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || 'Athlete'}
          </h1>
          <p className="text-gray-600 mt-1">Ready to crush today's session?</p>
        </div>
        <Link
          to="/planner"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Dumbbell className="h-5 w-5" />
          Start Workout
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map(action => (
            <Link
              key={action.label}
              to={action.href}
              className={`flex flex-col items-center gap-3 p-6 rounded-lg border-2 transition-all ${
                action.primary
                  ? 'border-primary bg-primary-light text-primary hover:bg-primary/10'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <action.icon
                className={`h-8 w-8 ${action.primary ? 'text-primary' : 'text-gray-500'}`}
              />
              <span className="font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Strength Progress</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <TrendingUp className="h-12 w-12 mb-2" />
          <p>Charts coming in Phase 6 — connect your workout data to see progression</p>
        </div>
      </div>
    </div>
  );
}
