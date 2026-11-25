import { useAuth } from '../features/auth/hooks/useAuth';
import { User, Mail, Settings, Dumbbell, Target, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <nav className="border-b border-gray-200" aria-label="Profile tabs">
          <ul className="flex flex-wrap -mb-px" role="tablist">
            {[
              { id: 'account', label: 'Account', icon: User },
              { id: 'preferences', label: 'Preferences', icon: Settings },
              { id: 'fitness', label: 'Fitness', icon: Target },
            ].map(tab => (
              <li key={tab.id} role="presentation">
                <button
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  id={`${tab.id}-tab`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6" role="tabpanel">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary-light flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{user?.name || 'User'}</h2>
                  <p className="text-gray-600">{user?.email || 'email@example.com'}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Info</h3>
                <dl className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <dt className="text-gray-600">Email</dt>
                    <dd className="font-medium text-gray-900">{user?.email}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <dt className="text-gray-600">Member since</dt>
                    <dd className="font-medium text-gray-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                    </dd>
                  </div>
                </dl>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sign out
              </button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <fieldset>
                <legend className="text-lg font-medium text-gray-900 mb-4">Units</legend>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="units"
                      value="metric"
                      defaultChecked
                      className="sr-only"
                    />
                    <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                      <div className="font-medium text-gray-900">Metric (kg, cm)</div>
                      <div className="text-sm text-gray-600">Kilograms, centimeters</div>
                    </div>
                  </label>
                  <label className="relative">
                    <input type="radio" name="units" value="imperial" className="sr-only" />
                    <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                      <div className="font-medium text-gray-900">Imperial (lb, in)</div>
                      <div className="text-sm text-gray-600">Pounds, inches</div>
                    </div>
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-lg font-medium text-gray-900 mb-4">
                  Default Rest Timer
                </legend>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: '60s', value: 60 },
                    { label: '90s', value: 90 },
                    { label: '120s', value: 120 },
                    { label: '180s', value: 180 },
                    { label: '3min', value: 180 },
                    { label: 'Custom', value: 'custom' },
                  ].map(opt => (
                    <label key={opt.value} className="relative">
                      <input type="radio" name="restTimer" value={opt.value} className="sr-only" />
                      <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 text-center">
                        {opt.label}
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
              >
                Save Preferences
              </button>
            </form>
          )}

          {activeTab === 'fitness' && (
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <fieldset>
                <legend className="text-lg font-medium text-gray-900 mb-4">Experience Level</legend>
                <div className="grid grid-cols-3 gap-4">
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <label key={level} className="relative">
                      <input
                        type="radio"
                        name="experience"
                        value={level.toLowerCase()}
                        className="sr-only"
                      />
                      <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 text-center">
                        {level}
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-lg font-medium text-gray-900 mb-4">Primary Goal</legend>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Strength', icon: Dumbbell },
                    { label: 'Hypertrophy', icon: Target },
                    { label: 'Endurance', icon: Target },
                    { label: 'Skill', icon: Dumbbell },
                  ].map(goal => (
                    <label key={goal.label} className="relative">
                      <input
                        type="checkbox"
                        name="goals"
                        value={goal.label.toLowerCase()}
                        className="sr-only"
                      />
                      <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 flex items-center gap-3">
                        <goal.icon className="h-5 w-5 text-gray-500" />
                        {goal.label}
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-lg font-medium text-gray-900 mb-4">Default Split</legend>
                <div className="grid grid-cols-2 gap-4">
                  {['PPL', 'Upper/Lower', 'UL-PPL', 'Full Body', 'Custom'].map(split => (
                    <label key={split} className="relative">
                      <input
                        type="radio"
                        name="split"
                        value={split.toLowerCase().replace(/\//g, '-')}
                        className="sr-only"
                      />
                      <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 text-center">
                        {split}
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
              >
                Save Fitness Profile
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
