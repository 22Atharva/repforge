import { Calendar, Filter, Dumbbell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function History() {
  const [view, setView] = useState('list'); // 'calendar' | 'list'
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workout History</h1>
          <p className="text-gray-600 mt-1">Review your past training sessions</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('calendar')}
            className={`px-3 py-2 rounded-lg transition-colors ${view === 'calendar' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Calendar className="h-5 w-5" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-2 rounded-lg transition-colors ${view === 'list' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Calendar days would go here */}
            <div className="col-span-7 text-center py-12 text-gray-500">
              <Dumbbell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>Calendar view coming in Phase 5</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Split
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Volume
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="text-center text-gray-500">
                  <td colSpan={5} className="py-12">
                    <Dumbbell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium">No workouts yet</p>
                    <p className="text-sm mt-1">Complete your first session to see history</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
