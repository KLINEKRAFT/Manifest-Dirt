# Manifest Dirt

A responsive Next.js App Router frontend for a satirical personal land acquisition campaign. No property has been selected; checkout and verified funding data are not connected.

## Run

Requires Node.js 20.9+.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production: `npm run build && npm start`.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
# With the production or development server running on port 3000:
npm test
```

Browser tests use installed Google Chrome and cover 1440×900, 1024×768, and 390×844. They check overflow, map modes, land details, contribution controls, disabled checkout, Escape and focus restoration, updates, ledger, FAQ, mobile navigation, reduced motion, and browser errors. Screenshots are written under the ignored `test-results/` directory.

## Content and funding

`src/data/campaign.ts` is the typed source for campaign copy, funding values, land categories, updates, FAQs, preset amounts, and ledger records. `demoMode` defaults to false. Turning it on explicitly labels demonstration figures and sample ledger records. Production starts with $0, zero supporters, and an unspecified goal. The funding ring handles missing goals and caps its visual percentage at 100%.

The supplied landscape originals are retained in `public/images/`; Next Image handles responsive image optimization and lazy loading. Google Fonts are fetched at build time and self-hosted by Next.js.

## Frontend boundaries

- Stripe checkout is not configured. The contribution dialog never submits data, stores a display name, charges a card, or increments totals.
- Supabase and a verified public ledger are not connected.
- Updates are editorial content from the configuration file; no administration interface exists yet.
- Vercel-compatible source is provided, but no hosting deployment has been provisioned. Import the repository into Vercel using its Next.js preset when ready.
- The original ZIPs, standalone CODEX_PROMPT.md, and concept-01.png were unavailable at implementation time. The complete original brief from chat and the explicit pasted request were used, with the two supplied image files located in Desktop/Manifest Dirt. Exact comparison to the approved screenshot remains pending.

Before enabling payments, establish the actual goal and campaign policies, add secure server-created checkout, verify signed payment webhooks, and derive public totals only from verified records. Never ship secret keys to the browser.

## Dependency note

The install audit reports five high-severity findings in the development-only ESLint dependency chain (braces → micromatch → fast-glob → Next lint plugin). The suggested automated fix would downgrade the framework lint configuration across major versions and has not been applied. Production dependencies are checked separately. Versions are pinned and the lockfile is committed.
