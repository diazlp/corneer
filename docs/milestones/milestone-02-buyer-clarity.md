# Milestone 02: buyer clarity and connected demo

## Purpose

Make the buyer's first task and the consequences of each action understandable.
This remains a frontend-only, fictional demonstration; user comprehension and
marketplace demand still require buyer testing.

## Acceptance checklist

- [x] Homepage has one primary buyer CTA and a worked example.
- [x] Demo roles remain accessible without competing with buyer navigation.
- [x] Required order fields validate; edits survive step navigation and review.
- [x] New previews carry entered data into company comparison and the dashboard.
- [x] Category and quantity changes affect profile comparisons without inventing quotes.
- [x] Unlisted capabilities and minimum-order conflicts are explained conservatively.
- [x] Shortlisting does not reveal identity; sharing names one recipient.
- [x] Identity shares remain scoped to request and supplier.
- [x] Messages, drafts, and meeting proposals remain isolated by conversation.
- [x] Supplier replies update the same-session buyer comparison.
- [x] Directory filters and sorting work; profile contact keeps the selected company.
- [x] Bahasa Indonesia and English cover the new journey.
- [x] Buyer screens fit at 320px, 390px, 768px, and desktop widths.
- [x] Reloaded temporary links explain expiration and offer a recovery action.
- [x] Sourcing assertions and the complete format/lint/type/build gate pass.

## Manual task

Browser verification on 2026-10-08 covered a new 800-unit order, review edits,
recipient and request isolation, scoped drafts/messages/meeting proposals,
supplier replies, reload recovery, both languages, and 320/390/768/1440px layouts.
The checks exercise the demo; the comprehension task below still needs real buyers.

Ask a reviewer to find a company for 800 activewear sets across two styles and
two colors. Observe where they hesitate without explaining the interface.
They should be able to create a preview, notice the 200-unit estimated split,
save a company, understand the identity recipient, and open a conversation.
Then test another recipient and another request to verify isolation.

## Limits

No real requests, messages, verification operations, or calendar invitations
are sent. Meeting proposals remain unconfirmed. Company capability is reported,
not guaranteed. Marketplace state resets on reload; only language is persisted.
