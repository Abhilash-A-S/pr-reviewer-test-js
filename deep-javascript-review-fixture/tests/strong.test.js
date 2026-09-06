import test from "node:test";
import assert from "node:assert/strict";
import { parsePreferences } from "../browser/api-safe.js";
import { downloadPath } from "../node/backend-safe.js";

test("invalid preferences return an explicit failure", () => {
  assert.deepEqual(parsePreferences("not-json"), {
    ok: false,
    error: "Invalid preferences JSON",
  });
});

test("download path rejects traversal outside the root", () => {
  assert.throws(
    () => downloadPath("/srv/downloads", "../../etc/passwd"),
    /outside the download directory/,
  );
});
