# So you’ve never used an agent?

A retro-styled, responsive course for technical Windows users making their first AI-assisted video with OpenCode and Framefields.

Live: https://silvio-agent-primer-nov-2026.pgs.sh

## Development

Requires a current Node.js LTS release.

```sh
npm ci
npm run dev
npm run check
npm run build
```

Svelte 5 + SvelteKit, statically exported to `build/`. Lessons live in `src/lib/lessons.js`; the interface lives in `src/routes/+page.svelte`. Progress and topic are saved in browser localStorage; no server or analytics.

## Deploy

With the pgs.sh SSH identity configured:

```sh
npm run check
npm run build
rsync -rv build/ pgs.sh:/agent-primer-nov-2026/
```

The upload intentionally retains older hashed assets so an already-open tab can finish loading after a deployment.

## Editorial workflow

`draft.md` is the initial text penned by `agy --dangerously-skip-permissions`. The published lessons revise that draft for technical readers, the agent/tool-calling practice topic, verified installation instructions, and Git/LFS habits. The draft is not the authoritative course. Review model availability, prices and provider instructions against official sources when updating; the course records its review date.

The animated landing-page diagram is an illustrative browser demo, not a rendered Framefields sample. Native Windows learner installation and actual Framefields rendering still require a Windows validation pass.

## Media and Git LFS

This repository currently contains only text/code. If adding substantial binary source assets, install Git LFS, track the chosen asset patterns, commit `.gitattributes`, and verify remote LFS support/quotas. Build output, dependencies and secrets are ignored.
