const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchCollection(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  return []
}

export function displayId(value) {
  if (!value) return '—'
  return typeof value === 'object' ? value.name || value.username || value._id || '—' : value
}
