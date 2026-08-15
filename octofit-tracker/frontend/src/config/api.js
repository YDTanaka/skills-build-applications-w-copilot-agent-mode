export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;

    if (host.includes('.app.github.dev')) {
      return host.replace(/-5173(\.app\.github\.dev)$/, '-8000$1');
    }

    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://localhost:8000';
    }
  }

  return 'http://localhost:8000';
};

export const buildApiUrl = (resource) => `${getApiBaseUrl()}/api/${resource}/`;

export const normalizeResults = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
};
