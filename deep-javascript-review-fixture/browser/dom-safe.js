export function showMessage(message) {
  const output = document.getElementById("message");
  if (!(output instanceof HTMLElement)) {
    throw new Error("Message output is unavailable");
  }
  output.textContent = String(message);
}

export function readEmail() {
  const input = document.getElementById("email");
  if (!(input instanceof HTMLInputElement)) {
    return null;
  }
  return input.value.trim();
}

export function continueTo(nextPath) {
  const destination = new URL(nextPath, window.location.origin);
  if (destination.origin !== window.location.origin) {
    throw new Error("Only local redirects are allowed");
  }
  window.location.assign(destination);
}

export function notifyParent(payload, trustedOrigin) {
  const allowedOrigins = new Set(["https://portal.example.test"]);
  if (!allowedOrigins.has(trustedOrigin)) {
    throw new Error("Untrusted message destination");
  }
  window.parent.postMessage(payload, trustedOrigin);
}

export async function createSession(credentials) {
  const response = await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "same-origin",
  });
  if (!response.ok) {
    throw new Error(`Unable to create session: HTTP ${response.status}`);
  }
  return response.json();
}
