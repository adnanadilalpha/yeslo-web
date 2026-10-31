# Yeslo API contract

The iOS app (bundle id `com.yeslo.app`) is the system of record for the item library. Line items are copied onto a quote when it is saved. This API creates the quote, the share token, and the status the phone shows after a client decides.

Base URL is `NEXT_PUBLIC_SITE_URL`. Send `Authorization: Bearer <supabase access token>` and `Content-Type: application/json`.

Errors:

```json
{ "error": { "code": "unauthorized", "message": "Human readable reason." } }
```

Codes you should handle: `unauthorized` (401), `not_configured` (503), `invalid` (400), `business_required` (404 or 409), `not_found` (404), `conflict` (409), `save_failed` (500).

Money is dollars in requests (`unitPrice: 18`) and integer cents in stored lines (`unit_price_cents: 1800`). `taxRate` is a fraction: `0.085` means 8.5%. Currency is `USD`, `CAD`, `GBP`, `EUR`, or `AUD`.

## Business

`PUT /api/v1/business`

```json
{
  "name": "Harbor Studio",
  "email": "mina@harbor.studio",
  "phone": "",
  "address": "Portland, Oregon",
  "mode": "freelancer"
}
```

`mode` is `freelancer` or `trades`. One business per account. The same call updates it later.

`GET /api/v1/business` returns `{ "business": { ... } }`.

## Clients

`POST /api/v1/clients`

```json
{ "name": "Jordan Hale", "email": "jordan@northwind.example", "company": "Northwind Supply" }
```

`GET /api/v1/clients` returns `{ "clients": [ ... ] }`.

## Create a quote

`POST /api/v1/quotes`

```json
{
  "title": "Brand and website for the spring line",
  "kind": "proposal",
  "currency": "USD",
  "taxRate": 0,
  "notes": "Two rounds of revisions are included.",
  "validUntil": "2026-12-15",
  "client": { "name": "Jordan Hale", "email": "jordan@northwind.example", "company": "Northwind Supply" },
  "lines": [
    {
      "name": "Discovery workshop",
      "description": "Positioning and audience.",
      "quantity": 1,
      "unit": "week",
      "unitPrice": 1800
    }
  ]
}
```

`kind` is `proposal` or `estimate`. Pass `clientId` instead of `client` to reuse someone already saved. The quote is created as `draft`. Response `201`:

```json
{
  "quote": {
    "id": "uuid",
    "number": "Q-1001",
    "title": "Brand and website for the spring line",
    "kind": "proposal",
    "status": "draft",
    "lines": []
  }
}
```

Estimate numbers use an `E-` prefix.

`GET /api/v1/quotes/:id` returns the quote, client, lines, and share tokens.

## Duplicate

`POST /api/v1/quotes/:id/duplicate`

Copies the client, lines, tax, notes, and validity into a new `draft` titled `Copy of …`. No share token is created, and it does not count as a send.

## Send

`POST /api/v1/quotes/:id/send`

```json
{ "expiresInDays": 45 }
```

Allowed while the quote is `draft`, `sent`, or `changes_requested`. The call revokes older tokens, stores a new one, sets status to `sent`, and clears any previous signer so the client can decide again. Earlier decision events stay in `quote_events`.

```json
{
  "token": "…",
  "url": "https://your-deployment.example/q/…",
  "expiresAt": "2026-12-15T23:59:59.999Z",
  "quoteId": "uuid",
  "status": "sent"
}
```

Put `url` on the iOS share sheet. The API does not text or email anyone. If `validUntil` is sooner than `expiresInDays`, the token expires at the end of that date.

The free plan’s “3 sent quotes a month” is enforced on the device in v1. The server still records every send.

## Invoice and paid

The phone builds the PDF from the quote payload. Then:

`POST /api/v1/quotes/:id/status`

```json
{ "status": "invoiced" }
```

`status` is `invoiced`, `paid`, or `closed`.

- `approved` can become `invoiced`, `paid`, or `closed`
- `invoiced` can become `paid` or `closed`
- `draft`, `sent`, `changes_requested`, and `expired` can become `closed`
- `paid` and `closed` do not move

## What the client hits

`GET /q/:token` is the page. Decisions are `POST /api/q/:token/decision` with:

```json
{
  "intent": "approve",
  "signerName": "Jordan Hale",
  "comment": "",
  "agreed": true
}
```

`intent` may be `changes`, and then `comment` is required. The server stores the name, comment, time, IP address, and user agent, and sets the quote to `approved` or `changes_requested`. A second decision returns 409.

Subscribe to inserts on `quote_events` for quotes you own (Realtime is enabled for that table) and raise the local push from the app when `event_type` is `approved` or `changes_requested`.

## Demo, without a database

`/q/demo` records the decision in an httpOnly cookie so the site can be shown before Supabase is connected. Do not use that token in the app. Seed `seed-harbor-studio` with `npm run seed` when you want a real row.
