export function startPolling(refresh) {
  const timerId = window.setInterval(refresh, 5000);
  return () => window.clearInterval(timerId);
}

export function watchWindow(render) {
  window.addEventListener("resize", render);
  return () => window.removeEventListener("resize", render);
}

export function registerSearch(input, search) {
  const controller = new AbortController();
  const onInput = async () => {
    try {
      await search(input.value, controller.signal);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        throw error;
      }
    }
  };
  input.addEventListener("input", onInput, { signal: controller.signal });
  return () => controller.abort();
}

export async function loadWithOwnership(load, updateScreen) {
  try {
    const result = await load();
    updateScreen(result);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Load failed",
    };
  }
}
