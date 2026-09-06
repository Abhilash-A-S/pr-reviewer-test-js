# Deep JavaScript PR review fixture

This fixture validates the Intelligent PR Reviewer against browser JavaScript,
Node-style backend code, asynchronous lifecycle ownership, and tests.

The `*-unsafe.js` files intentionally contain defects. Do not repair them before
running the reviewer. Their paired `*-safe.js` files are safe controls and must
produce zero findings.

## Test workflow

1. Add this entire folder on a feature branch.
2. Keep the base branch without these files so every fixture line is changed.
3. Open a pull request.
4. Run build 1088 in dry-run mode.
5. Compare the output with `EXPECTED_FINDINGS.md`.

Documentation and `package.json` may be used for context, but should not consume
normal semantic-review calls.
