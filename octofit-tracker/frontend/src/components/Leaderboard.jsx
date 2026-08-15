import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResults } from '../config/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'), {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeResults(payload));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <div className="card shadow-sm p-4">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-muted">
                    No leaderboard data yet.
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry._id || entry.id || `${entry.user}-${index}`}>
                    <td>#{entry.rank ?? index + 1}</td>
                    <td>{entry.user?.name || entry.user || 'Unknown'}</td>
                    <td>{entry.team?.name || entry.team || 'No team'}</td>
                    <td>{entry.points ?? 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
