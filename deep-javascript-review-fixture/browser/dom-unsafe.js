export function showMessage(message) {
  const output = document.getElementById("message");
  output.innerHTML = message;
}

export function readEmail() {
  return document.getElementById("email").value.trim();
}

export function continueTo(nextUrl) {
  window.location.href = nextUrl;
}

export function notifyParent(payload) {
  window.parent.postMessage(payload, "*");
}

export function saveSessionToken(token) {
  localStorage.setItem("sessionToken", token);
}
