import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResults } from '../config/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'), {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeResults(payload));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <div className="card shadow-sm p-4">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <div className="row g-3">
          {teams.length === 0 ? (
            <div className="col-12 text-muted">No teams found.</div>
          ) : (
            teams.map((team) => (
              <div className="col-md-6 col-xl-4" key={team._id || team.id || team.name}>
                <div className="border rounded p-3 h-100 bg-light">
                  <h3 className="h5">{team.name || 'Team'}</h3>
                  <p className="text-muted mb-2">
                    {team.description || 'No description provided.'}
                  </p>
                  <small className="d-block text-uppercase text-secondary">Members</small>
                  <span>{Array.isArray(team.members) ? team.members.length : 0}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
