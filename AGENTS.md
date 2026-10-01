# Corneer agent guide

## Product boundary

Corneer is currently a frontend-only proof of concept for a verified B2B
apparel sourcing network. Preserve the end-to-end journey from company or RFQ
discovery through response, shortlist, identity reveal, conversation, and
meeting. Do not present demo state as persisted or production-ready.

## Trust rules

- The company is the primary marketplace object; products are representative
  discovery examples, not checkout inventory.
- Keep manufacturer and trading-company types explicit.
- Distinguish checked, reviewed, and company-reported information.
- Never imply that Corneer guarantees product quality, delivery, payment, or
  transaction outcomes.
- Keep all committed fixture companies and opportunities obviously fictional.
- Buyer identity stays private until an explicit reveal action.

## Change workflow

1. Read the relevant installed Next.js guide before changing framework APIs.
2. Make the smallest complete product change.
3. Update the relevant numbered guide and milestone checklist when behavior or
   configuration changes.
4. Run `npm run format` followed by `npm run check`.
5. Report frontend-only limitations; do not describe planned Supabase features
   as implemented.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
