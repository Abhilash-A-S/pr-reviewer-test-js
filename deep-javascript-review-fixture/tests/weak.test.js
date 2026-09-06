import test from "node:test";
import assert from "node:assert/strict";
import { continueTo, readEmail } from "../browser/dom-unsafe.js";

globalThis.document = {
  getElementById: () => ({ value: "fixture@example.test" }),
};
globalThis.window = { location: { href: "https://app.example.test" } };

test("email field exists", () => {
  const result = readEmail();
  assert.ok(result);
});

test("redirect returns", () => {
  const result = continueTo("https://attacker.example");
  assert.equal(result, undefined);
});
