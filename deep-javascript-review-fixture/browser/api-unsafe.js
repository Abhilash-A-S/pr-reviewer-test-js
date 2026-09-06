export async function loadUsers(apiUrl) {
  const response = await fetch(apiUrl);
  return response.json();
}

export function startBackgroundSync(syncUsers) {
  syncUsers();
}

export async function loadReport(apiUrl) {
  const response = await fetch(apiUrl);
  return response.text();
}

export function parsePreferences(rawPreferences) {
  return JSON.parse(rawPreferences);
}

export async function loadRequiredUser(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
  }
}
