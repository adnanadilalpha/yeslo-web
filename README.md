# Yeslo web

Marketing site and client quote pages for Yeslo, the iOS app for freelancers and trades. A quote is a proposal or an estimate. Send creates a link. The client opens it with no account, types their name, and approves or requests changes. That is a record of agreement, not legal advice. The owner turns the yes into an invoice PDF and marks it paid. Version 1 does not take payments.

The future public domain is getyeslo.com. The iOS bundle id is `com.yeslo.app`. Until the domain is attached, set `NEXT_PUBLIC_SITE_URL` to the Vercel URL so share links point at the deployment that is actually live.

## Run it locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://127.0.0.1:43123

`/q/demo` works with no database. Use it to approve a sample quote, request a change, and reset the sample. Related states:

- `/q/demo-approved`
- `/q/demo-changes`
- `/q/demo-expired`
- `/q/demo-closed`

## Environment

| Variable | Where it is used |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, the sitemap, and the share link returned to the iOS app. On Vercel, `VERCEL_URL` is a fallback. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project. Defaults to `https://kcyfdaqllqjgeexcqzct.supabase.co` when unset. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Verifies the iOS user’s JWT. Safe to expose. It cannot read quote tables. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only. Loads a quote by token, records a decision, and inserts waitlist rows. Never prefix it with `NEXT_PUBLIC_`. |

The waitlist and live quote links need the service role key. Without it, `/q/demo` still works and the waitlist tells the visitor to email hello@getyeslo.com.

## Database

1. In the Supabase SQL editor, run `supabase/migrations/20261031140646_yeslo_init.sql`.
2. Put the service role key in `.env.local`.
3. Seed a known live token:

```bash
npm run seed
```

That creates `/q/seed-harbor-studio` (Harbor Studio, proposal Q-1048). Running it again is a no-op.

Row level security is on for every table. `anon` has no privileges. `authenticated` owners can manage their own business, clients, quotes, lines, and share tokens. They can read events and insert only `sent`, `invoiced`, `paid`, and `closed` events, with no signer name. Client approvals are written by the service role. The waitlist has no client grants.

If you use the Supabase CLI locally, `supabase test db` runs `supabase/tests/rls_test.sql`.

The iOS app should subscribe to `quote_events` for push handling. The migration adds that table to `supabase_realtime` when the publication exists.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import the GitHub repository `adnanadilalpha/yeslo-web`. Framework preset: Next.js. Node 22. Build command: `npm run build`. Leave the output directory empty.
2. Add these environment variables for Production (and Preview, if you want preview links to work):

```bash
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://kcyfdaqllqjgeexcqzct.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY` is the publishable anon key from Supabase → Project Settings → API. `SUPABASE_SERVICE_ROLE_KEY` is the service role key on that same page. Do not prefix the service role key with `NEXT_PUBLIC_`. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the real Vercel domain (later `https://getyeslo.com`) and redeploy so share links and the sitemap match it.

3. In the Supabase SQL editor, run `supabase/migrations/20261031140646_yeslo_init.sql` before anyone sends a real quote.
4. From a machine that has the service role key in `.env.local`, run `npm run seed`. That creates the live sample at `/q/seed-harbor-studio`. Running it again is a no-op.

## Checks

```bash
npm test
npm run lint
npm run build
```

## App contract

The iOS app creates businesses, clients, quotes, duplicates, share links, and status changes through `/api/v1`. See [docs/api-contract.md](docs/api-contract.md). The phone generates the invoice PDF. The server only records that the quote is invoiced or paid.
