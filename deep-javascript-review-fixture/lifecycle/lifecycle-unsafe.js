export function startPolling(refresh) {
  setInterval(refresh, 5000);
}

export function watchWindow(render) {
  window.addEventListener("resize", () => render());
}

export function registerSearch(input, search) {
  input.addEventListener("input", async () => {
    await search(input.value);
  });
}

export function loadWithoutOwnership(load) {
  load().then(updateScreen);
}

function updateScreen(result) {
  document.title = String(result);
}
