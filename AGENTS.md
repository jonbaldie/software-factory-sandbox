# textkit

## Coding standards

These rules apply to every agent working in this repo, and the reviewer agent enforces them.

- No runtime dependencies. Use only the JavaScript standard library.
- Every exported function in `src/textkit.js` needs:
  - a JSDoc block with an `@example`
  - tests in `test/textkit.test.js` covering the normal case **and** edge cases (empty string, unusual input)
  - an entry in the **API** section of `README.md`
- Keep functions pure: no I/O, no mutation of inputs.
- When you finish a `TODO(factory):` item, delete that TODO comment.
- Run `npm test` before you finish. All tests must pass.
- Do not run `git commit` or `git push`, and do not edit anything under `.github/`. The factory workflows handle git.

## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues and are managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default triage labels, unchanged. Adding `ready-for-agent` to an issue also starts the factory. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
