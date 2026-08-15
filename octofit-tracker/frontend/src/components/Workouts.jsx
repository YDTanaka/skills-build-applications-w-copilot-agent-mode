import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResults } from '../config/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'), {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeResults(payload));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <div className="card shadow-sm p-4">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workout Suggestions</h2>
        <div className="row g-3">
          {workouts.length === 0 ? (
            <div className="col-12 text-muted">No workout suggestions yet.</div>
          ) : (
            workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.id || workout.name}>
                <div className="border rounded p-3 h-100 bg-light">
                  <h3 className="h5">{workout.name || 'Workout'}</h3>
                  <p className="mb-1">
                    <strong>Difficulty:</strong> {workout.difficulty || 'medium'}
                  </p>
                  <p className="mb-1">
                    <strong>Focus:</strong> {workout.focus || workout.type || 'General fitness'}
                  </p>
                  <p className="mb-0">
                    <strong>Suggested for:</strong> {workout.suggestedFor || 'Everyone'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
