import { Plus, ClipboardList, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Planner() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workout Planner</h1>
          <p className="text-gray-600 mt-1">Build and manage your training routines</p>
        </div>
        <Link
          to="#"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="h-5 w-5" />
          Create Routine
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <ClipboardList className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-lg font-medium text-gray-900 mb-2">No routines yet</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Create your first workout routine by selecting a split and adding exercises from the
          library.
        </p>
        <Link
          to="#"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="h-5 w-5" />
          Build My First Routine
        </Link>
      </div>
    </div>
  );
}
