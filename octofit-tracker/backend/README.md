# OctoFit Tracker Backend

This backend exposes the OctoFit Tracker API on port `8000`.

## Local and GitHub Codespaces hosting

When running locally, the app should use:

- `http://localhost:8000`

When the app is running in a GitHub Codespace, build the API URL from the `CODESPACE_NAME` environment variable:

```ts
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
```

This ensures the frontend can reach the backend correctly in both local development and cloud-hosted environments.

## API routes

- `/api/health`
- `/api/users`
- `/api/activities`
- `/api/teams`
- `/api/leaderboard`
- `/api/workouts`
