# Aura Travels

AURA TRAVEL is a fictional boutique travel agency site (Next.js, Tailwind, mock data, Supabase-ready). Live at https://auratravels.vercel.app. Project context is in AGENTS.md section 10.

@AGENTS.md

The general operating rules (communication, simplicity, surgical changes, goal-driven execution, learnings) live in AGENTS.md, imported above. Below are the additions AGENTS.md does not cover. Where they conflict, AGENTS.md section 0 wins, except that the hard rules below always apply.

---

# Hard rules: non-negotiable, no exceptions

## Ask Before Destructive Commands

Never run irreversible or shared-state-changing commands without explicit permission. State the exact command, why you want to run it, and wait for an OK.

Always require confirmation:

- `git push --force` / `--force-with-lease`
- `git reset --hard`, `git clean -fd`, `git checkout -- .`
- `git merge`, `git rebase`, `git cherry-pick` onto shared branches
- `git branch -D`, deleting remote branches (`git push origin :branch`)
- `git commit --amend` on already-pushed commits
- `git tag -d` / force-pushing tags
- `rm -rf`, dropping DB tables, truncating data, running destructive migrations
- Anything touching production: deploys, infra apply, secrets, DNS
- Publishing packages, posting to GitHub/Slack/email, or anything visible to others

Safe by default: read-only commands (`status`, `diff`, `log`), local builds, tests, lint, typecheck, and edits inside the working tree.

If unsure whether a command is destructive, ask.

## Verify Before Reporting Complete

- Run the tests, execute the script, check the output yourself.
- TypeScript: run `tsc --noEmit` and fix every type error.
- Builds: run the build command and confirm it succeeds.
- If you cannot verify, say so explicitly. Don't imply success.
- If tests fail, say so with the relevant output. Never suppress, simplify, or skip a failing check to get a green result.
- When something passed, state it plainly. Don't hedge it and don't re-verify it.

---

# Medium priority

## Match the Model to the Task

Use subagents/cheaper models (Haiku/Sonnet) for mechanical, well-specified work (bulk edits, sweeps, boilerplate, test scaffolding). Keep hard architecture, deep debugging, and security reasoning on the strongest model. Fan independent chunks out to parallel subagents.

## Keep Files Current

Keep CLAUDE.md and AGENTS.md under 300 lines. Move detail into scoped files instead of growing them.

---

# Low priority: references

- [`.claude/rules/`](./.claude/rules): path-scoped rule files, each declaring scope in its `paths:` frontmatter. Currently: `security.md`.
- [`DESIGN.md`](./DESIGN.md): the design system (tokens + rationale). Read it before building or styling any UI; follow its Do's and Don'ts.
- Add directory-level `CLAUDE.md` files (e.g. `app/CLAUDE.md`, `api/CLAUDE.md`) once those trees exist.
- Learnings go in AGENTS.md section 11 (not a separate file). When the user corrects you, append a concrete one-line rule there and show it to them.
