# OctoFit Tracker Frontend

This React app renders the OctoFit dashboard and calls the backend API from either a GitHub Codespace or local development environment.

## Required environment variable

Define `VITE_CODESPACE_NAME` in `.env.local` before starting the app in a GitHub Codespace:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is not set, the app falls back to `http://localhost:8000` instead of generating a broken URL such as `https://undefined-8000.app.github.dev`.

## API URL pattern

In Codespaces, the frontend expects the backend at:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When running locally, it falls back to:

```text
http://localhost:8000/api/[component]/
```

## Scripts

```bash
npm install --prefix octofit-tracker/frontend
npm --prefix octofit-tracker/frontend run dev
```
