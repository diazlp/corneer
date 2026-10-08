# Corneer

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/status-frontend%20POC-D8FF62)](#current-scope)

Corneer is a proof of concept for a focused B2B sourcing network. It helps
verified buyers discover apparel suppliers, prepare private sourcing briefs,
compare supplier responses, and reveal their company identity only when they
choose to continue a conversation.

The current demo focuses on sportswear suppliers in Hong Kong and Mainland
China. Every company, RFQ, response, message, and verification event in the
repository is fictional.

**Live demo:** [corneer.vercel.app](https://corneer.vercel.app/). Vercel deploys
the `main` branch of this repository.

## Current scope

This repository is a frontend-only product demonstration. It includes:

- Public supplier and product discovery.
- Detailed company profiles with transparent verification language.
- Buyer RFQ creation, response comparison, shortlisting, and identity reveal.
- Supplier opportunity discovery and response composition.
- In-product messaging and meeting-request concepts.
- Administrator verification review.
- Responsive desktop and mobile layouts.
- English and Bahasa Indonesia interface copy, with ID shown first in the
  language switcher.

It does not yet include real authentication, persistence, file uploads,
notifications, payments, or Supabase integration. Marketplace interactions are
demonstration state and reset after a reload; the language preference is saved
in browser storage.

## Requirements

- Node.js 20.9 or newer.
- npm 10 or newer.
- Internet access for the remote demonstration images.

## Start locally

From the repository root:

```powershell
npm ci
npm run dev
```

Open <http://localhost:3101>.

Start with **Describe your order**, or **Walk through an example** to review
fictional supplier responses. New briefs create company previews; no suppliers
are contacted and no quotation is fabricated. Save a company, deliberately
share the demo company identity with that recipient, then open its conversation.

Use the **Demo view** control in the top demo bar to move between the public,
buyer, supplier, and administrator experiences. Protected workspaces are only
simulated in this POC; the role switcher is not an authorization mechanism.

## Main routes

| Route                          | Audience               | Purpose                                                     |
| ------------------------------ | ---------------------- | ----------------------------------------------------------- |
| `/`                            | Everyone               | Product positioning and featured marketplace content        |
| `/suppliers`                   | Everyone               | Search and filter supplier companies                        |
| `/suppliers/[id]`              | Everyone               | Review one supplier, its products, and verification summary |
| `/products`                    | Everyone               | Browse representative products and find their suppliers     |
| `/buyer/rfqs`                  | Buyer demo             | Review sourcing requests and progress                       |
| `/buyer/rfqs/new`              | Buyer demo             | Preview a structured apparel order                          |
| `/buyer/rfqs/[id]`             | Buyer demo             | Compare responses, shortlist suppliers, and reveal identity |
| `/supplier/opportunities`      | Supplier demo          | Browse relevant verified-buyer opportunities                |
| `/supplier/opportunities/[id]` | Supplier demo          | Review an RFQ and submit a response                         |
| `/messages`                    | Buyer or supplier demo | Continue after explicit buyer identity sharing              |
| `/admin/verification`          | Administrator demo     | Review evidence and record verification decisions           |

## Quality gate

Before committing or handing off a change:

```powershell
npm run format
npm run check
```

The checks cover formatting, ESLint, TypeScript, sourcing/identity assertions,
the optimized production build, and actual SEO/sharing-bot HTTP responses.

## Documentation

- [User journey guide — English](docs/english/user-journey.md) — simple steps and flowcharts for Visitor, Buyer, and Supplier.
- [Panduan alur pengguna — Bahasa Indonesia](docs/bahasa/user-journey.md) — langkah sederhana dan diagram alur untuk Pengunjung, Pembeli, dan Pemasok.
- [`docs/01-architecture.md`](docs/01-architecture.md) — current frontend boundaries, state, and future backend seam.
- [`docs/02-product-scope.md`](docs/02-product-scope.md) — product promise, personas, trust language, and POC exclusions.
- [`docs/03-frontend-guide.md`](docs/03-frontend-guide.md) — route map, role journeys, component ownership, and browser checks.
- [`docs/04-seo-and-brand.md`](docs/04-seo-and-brand.md) — page titles, crawl rules, sharing thumbnails, canonical host, and logo assets.
- [`docs/milestones/milestone-02-buyer-clarity.md`](docs/milestones/milestone-02-buyer-clarity.md) — connected buyer journey checks.
- [`docs/milestones/milestone-03-seo-and-brand.md`](docs/milestones/milestone-03-seo-and-brand.md) — SEO and brand acceptance checks.
- [`docs/milestones/milestone-01-frontend-poc-acceptance.md`](docs/milestones/milestone-01-frontend-poc-acceptance.md) — acceptance checklist for the current demonstration.

## Data and verification disclaimer

The demo illustrates how Corneer may communicate evidence checks. It does not
represent real audits, guarantees, endorsements, or commercial opportunities.
Future production verification must record what was checked, how it was
checked, when it was checked, and which claims remain company-reported.

## License

This project is proprietary and unlicensed for public redistribution or
commercial reuse. See [`LICENSE`](LICENSE). Third-party dependencies and remote
images remain subject to their respective licenses and terms.
