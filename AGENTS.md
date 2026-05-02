This is a theme for VitePress. Written in Vue.

## Commands

- `pnpm lint`: format and fix fixable lint errors (always run before `pnpm check`).
- `pnpm check`: check types, lint and format (no file change).
- `pnpm dev`: open up a dev server for testing.

## Methods

### Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

### Don't Look Back

- No re-reading `bun.lock`, `package.json`, `node_modules` after installing a new package.
- No re-reading the file after applying a patch.
- Don't use explorer only to find a file whose file path has been specified (that's silly).
- If the tool / agent says so, that is so, trust the tool, don't double check unless you are in the dedicated reviewing phase.
