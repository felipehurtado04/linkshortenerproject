# Repository Instructions

This is a critical requirement: before generating any code in this repository, you MUST read the relevant individual instruction files within the `docs/` directory and use them as the source of truth for the task.

These instructions apply to all work in this repository. Read the relevant topic documents in `docs/` before making changes, and follow the existing implementation where it is more specific than general guidance.
ALWAYS refer to the relevant .md file BEFORE generating any code. This is mandatory and extremely important: do not skip this step, do not infer behavior without reading the relevant instructions, and do not generate code before checking the applicable documentation.

Relevant files to review before coding:

- Authentication and protected-route requirements: [docs/authentication.md](docs/authentication.md)
- UI component standards: [docs/ui-standards.md](docs/ui-standards.md)

Keep changes scoped to the request. Do not invent product behavior or claim that planned functionality already exists. When a change establishes or alters a project-wide convention, update the relevant document in `docs/` in the same change.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
