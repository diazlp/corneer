# Milestone 01: frontend POC acceptance

## Purpose

Demonstrate Corneer's complete trust-and-introduction concept with fictional
data before implementing authentication or persistence.

## Acceptance checklist

### Public discovery

- [x] Landing page explains the buyer and supplier value proposition.
- [x] Supplier directory supports text, location, type, and category filtering.
- [x] Product showcases link back to the company behind the product.
- [x] Supplier profiles disclose manufacturer or trading-company type.
- [x] Verification presentation distinguishes checked, reviewed, and reported.

### Buyer journey

- [x] Buyer workspace summarizes active RFQs, responses, shortlists, and meetings.
- [x] Three-step RFQ form captures requirement, production details, and privacy.
- [x] Response comparison shows company context, fit, price range, lead time, and MOQ.
- [x] Buyer can shortlist a supplier.
- [x] Buyer can deliberately reveal its company identity.

### Supplier journey

- [x] Opportunity feed shows only structured buyer requests.
- [x] Opportunity detail shows the anonymized checked-buyer summary.
- [x] Supplier can compose and submit a demonstration response.
- [x] Response language makes clear that price is not the only comparison factor.

### Communication and operations

- [x] Conversation UI shows the opportunity context and identity-reveal event.
- [x] User can add a local demonstration message.
- [x] Administrator can review individual evidence checks.
- [x] Administrator can approve checked items or request more information.

### Quality

- [x] All data is labelled as fictional demonstration content.
- [x] Desktop and mobile layouts are supported.
- [x] Interface copy has a 12px minimum and regular copy uses a humane 13–16px scale.
- [x] Shared desktop layouts use a wider canvas with restrained page gutters.
- [x] English and natural Bahasa Indonesia copy cover the public, buyer,
      supplier, messaging, and admin demo routes.
- [x] Language selection persists across routes and reloads.
- [x] Fresh visitors default to Bahasa Indonesia, with ID left of EN.
- [x] Local development runs on port 3101.
- [x] The public frontend demo is deployed on Vercel from GitHub `main`.
- [x] Phone routes avoid page-level horizontal overflow; mobile supplier
      filters, conversations, and verification cases remain navigable.
- [x] ESLint passes.
- [x] TypeScript passes.
- [x] Production build passes.
- [x] Formatting is enforced through Prettier.

## Not accepted by this milestone

- Real accounts or organization authorization.
- Durable marketplace data.
- Real verification evidence.
- File upload and private storage.
- Email, realtime, meeting-provider, or billing integrations.
- Production security or deployment readiness.

## Manual smoke path

1. Open `/` and select the Buyer demo role.
2. Open `/buyer/rfqs/new` and complete all three steps.
3. Open `/buyer/rfqs/rfq-recycled-running`.
4. Shortlist Pearl River Performance Wear and reveal buyer identity.
5. Open `/messages` and send a local demonstration message.
6. Switch to Supplier and open `/supplier/opportunities/rfq-recycled-running`.
7. Submit the demonstration supplier response.
8. Switch to Admin and approve the checked verification items.
