export async function loadUsers(apiUrl, signal) {
  const response = await fetch(apiUrl, { signal });
  if (!response.ok) {
    throw new Error(`Unable to load users: HTTP ${response.status}`);
  }
  return response.json();
}

export async function startBackgroundSync(syncUsers) {
  try {
    await syncUsers();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Sync failed",
    };
  }
}

export async function loadReport(apiUrl, timeoutMilliseconds = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMilliseconds);
  try {
    const response = await fetch(apiUrl, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Unable to load report: HTTP ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

export function parsePreferences(rawPreferences) {
  try {
    return { ok: true, value: JSON.parse(rawPreferences) };
  } catch {
    return { ok: false, error: "Invalid preferences JSON" };
  }
}
