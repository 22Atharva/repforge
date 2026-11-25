import { useParams } from 'react-router-dom';
import { Dumbbell, Timer, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

export default function Workout() {
  const { sessionId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Workout</h1>
          <p className="text-gray-600 mt-1">Session: {sessionId}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Timer className="h-5 w-5" />
            <span>Rest: 0:00</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center py-12">
          <Dumbbell className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Workout logging coming in Phase 5
          </h2>
          <p className="text-gray-600 mb-6">
            Features: set logging, rest timer, previous performance, RIR tracking
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover">
              <CheckCircle className="h-5 w-5" />
              Complete Set
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <RotateCcw className="h-5 w-5" />
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
