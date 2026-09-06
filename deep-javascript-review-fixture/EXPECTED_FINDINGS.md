# Expected findings

This manifest defines the intended professional-review result. It is an
acceptance target, not a description of what the current reviewer already
supports. A missing target exposes a capability gap; a finding in a safe file
is a false positive.

## Unsafe targets

| # | File | Line | Expected rule | Severity | Root cause |
|---:|---|---:|---|---|---|
| 1 | `browser/api-unsafe.js` | 2 | `fetch-status-not-checked` | medium | Response status is never checked. |
| 2 | `browser/api-unsafe.js` | 2 | `missing-timeout` | medium | External request has no cancellation/timeout boundary. |
| 3 | `browser/api-unsafe.js` | 7 | `async-issue` | medium | Potential asynchronous result is neither awaited nor returned. |
| 4 | `browser/api-unsafe.js` | 11 | `fetch-status-not-checked` | medium | Response status is never checked. |
| 5 | `browser/api-unsafe.js` | 11 | `missing-timeout` | medium | External request has no cancellation/timeout boundary. |
| 6 | `browser/api-unsafe.js` | 16 | `json-parse-without-error-handling` | medium | Invalid JSON can escape as an exception. |
| 7 | `browser/api-unsafe.js` | 21 | `fetch-status-not-checked` | medium | Catching transport errors does not validate HTTP failure status. |
| 8 | `browser/api-unsafe.js` | 21 | `missing-timeout` | medium | External request has no cancellation/timeout boundary. |
| 9 | `browser/api-unsafe.js` | 23 | `empty-catch-block` | medium | Failure is swallowed and the function resolves with `undefined`. |
| 10 | `browser/dom-unsafe.js` | 3 | `unsafe-inner-html` | high | Caller-controlled content reaches an HTML interpretation sink. |
| 11 | `browser/dom-unsafe.js` | 7 | `null-safety` | medium | A possibly missing DOM element is immediately dereferenced. |
| 12 | `browser/dom-unsafe.js` | 11 | `security` | high | An unvalidated destination controls top-level navigation. |
| 13 | `browser/dom-unsafe.js` | 15 | `security` | high | Sensitive cross-window data is sent to every origin. |
| 14 | `browser/dom-unsafe.js` | 19 | `security` | high | A session token is persisted in script-readable storage. |
| 15 | `node/backend-unsafe.js` | 5 | `sql-injection` | high | Runtime input is concatenated into SQL. |
| 16 | `node/backend-unsafe.js` | 9 | `command-injection` | high | Runtime input is concatenated into an OS command. |
| 17 | `node/backend-unsafe.js` | 13 | `path-traversal` | high | A requested path is joined without canonical containment. |
| 18 | `node/backend-unsafe.js` | 17 | `authorization` | high | A caller-controlled header grants destructive access. |
| 19 | `node/backend-unsafe.js` | 25 | `security` | high | Password data is written to logs. |
| 20 | `node/backend-unsafe.js` | 29 | `security` | A predictable generator creates a reset code. |
| 21 | `lifecycle/lifecycle-unsafe.js` | 2 | `setinterval-without-timer-reference` | medium | Timer ownership and cleanup are impossible. |
| 22 | `lifecycle/lifecycle-unsafe.js` | 6 | `global-event-listener-without-removal` | medium | Anonymous global listener has no removal path. |
| 23 | `lifecycle/lifecycle-unsafe.js` | 10 | `listener-cleanup` | medium | Repeated setup can accumulate input listeners. |
| 24 | `lifecycle/lifecycle-unsafe.js` | 11 | `async-issue` | medium | Rejected asynchronous search escapes the event callback. |
| 25 | `lifecycle/lifecycle-unsafe.js` | 16 | `async-issue` | medium | Promise chain has no rejection handling. |
| 26 | `tests/weak.test.js` | 12 | `insufficient-test-assertion` | medium | Truthiness does not prove the expected email value. |
| 27 | `tests/weak.test.js` | 17 | `insufficient-test-assertion` | medium | The test accepts an attacker-controlled redirect. |

Expected total: **27 distinct findings**.

## Expected non-findings

These files must produce zero findings:

- `browser/api-safe.js`
- `browser/dom-safe.js`
- `node/backend-safe.js`
- `lifecycle/lifecycle-safe.js`
- `tests/strong.test.js`

Additional constraints:

- `README.md`, `EXPECTED_FINDINGS.md`, and `package.json` are context-only.
- No finding may target an unchanged line.
- Equivalent static and AI descriptions must collapse to one root cause.
- Safe and unsafe cases in adjacent files must not contaminate each other.
- Final output must use the professional category/rule/issue/impact/evidence/
  suggestion format.
