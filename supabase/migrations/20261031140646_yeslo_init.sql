-- Yeslo: businesses, clients, quotes, share links, decision events, and the marketing waitlist.
-- Anonymous clients cannot read these tables. The public quote page uses the service role
-- after it checks the token. Owners use their Supabase JWT, and row level security limits
-- them to rows on their own business.

create extension if not exists pgcrypto;

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users (id) on delete cascade,
  name text not null,
  email text,
  phone text,
  address text,
  mode text not null default 'freelancer' check (mode in ('freelancer', 'trades')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index businesses_one_owner_idx
  on public.businesses (owner_user_id)
  where owner_user_id is not null;

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  name text not null,
  email text,
  company text,
  created_at timestamptz not null default now()
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  client_id uuid references public.clients (id) on delete set null,
  number text not null,
  title text not null,
  kind text not null default 'proposal' check (kind in ('proposal', 'estimate')),
  status text not null default 'draft' check (
    status in ('draft', 'sent', 'approved', 'changes_requested', 'invoiced', 'paid', 'expired', 'closed')
  ),
  currency text not null default 'USD',
  tax_rate numeric(6, 4) not null default 0 check (tax_rate >= 0 and tax_rate <= 1),
  notes text,
  valid_until date,
  signer_name text,
  decision_comment text,
  decided_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, number)
);

create table public.quote_lines (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes (id) on delete cascade,
  position integer not null default 0,
  name text not null,
  description text,
  quantity numeric(12, 2) not null check (quantity >= 0),
  unit text not null default 'ea',
  unit_price_cents integer not null check (unit_price_cents >= 0),
  created_at timestamptz not null default now()
);

create table public.share_tokens (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes (id) on delete cascade,
  token text not null unique,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.quote_events (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes (id) on delete cascade,
  share_token_id uuid references public.share_tokens (id) on delete set null,
  event_type text not null check (
    event_type in ('sent', 'viewed', 'approved', 'changes_requested', 'invoiced', 'paid', 'closed', 'expired')
  ),
  signer_name text,
  comment text,
  ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  route text not null default 'freelancer' check (route in ('freelancer', 'trades', 'both')),
  source text,
  created_at timestamptz not null default now()
);

create index clients_business_id_idx on public.clients (business_id);
create index quotes_business_id_idx on public.quotes (business_id, created_at desc);
create index quotes_client_id_idx on public.quotes (client_id);
create index quote_lines_quote_id_idx on public.quote_lines (quote_id, position);
create index share_tokens_quote_id_idx on public.share_tokens (quote_id);
create index quote_events_quote_id_idx on public.quote_events (quote_id, created_at desc);
create index quote_events_share_token_id_idx on public.quote_events (share_token_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

create trigger businesses_set_updated_at
before update on public.businesses
for each row execute function public.set_updated_at();

create trigger quotes_set_updated_at
before update on public.quotes
for each row execute function public.set_updated_at();

alter table public.businesses enable row level security;
alter table public.clients enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_lines enable row level security;
alter table public.share_tokens enable row level security;
alter table public.quote_events enable row level security;
alter table public.waitlist enable row level security;

revoke all on table public.businesses from anon, authenticated;
revoke all on table public.clients from anon, authenticated;
revoke all on table public.quotes from anon, authenticated;
revoke all on table public.quote_lines from anon, authenticated;
revoke all on table public.share_tokens from anon, authenticated;
revoke all on table public.quote_events from anon, authenticated;
revoke all on table public.waitlist from anon, authenticated;

grant select, insert, update, delete on table public.businesses to authenticated;
grant select, insert, update, delete on table public.clients to authenticated;
grant select, insert, update, delete on table public.quotes to authenticated;
grant select, insert, update, delete on table public.quote_lines to authenticated;
grant select, insert, update, delete on table public.share_tokens to authenticated;
grant select, insert on table public.quote_events to authenticated;

create policy businesses_select_own
on public.businesses
for select
to authenticated
using (owner_user_id = (select auth.uid()));

create policy businesses_insert_own
on public.businesses
for insert
to authenticated
with check (owner_user_id = (select auth.uid()));

create policy businesses_update_own
on public.businesses
for update
to authenticated
using (owner_user_id = (select auth.uid()))
with check (owner_user_id = (select auth.uid()));

create policy businesses_delete_own
on public.businesses
for delete
to authenticated
using (owner_user_id = (select auth.uid()));

create policy clients_select_own
on public.clients
for select
to authenticated
using (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
);

create policy clients_insert_own
on public.clients
for insert
to authenticated
with check (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
);

create policy clients_update_own
on public.clients
for update
to authenticated
using (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
);

create policy clients_delete_own
on public.clients
for delete
to authenticated
using (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quotes_select_own
on public.quotes
for select
to authenticated
using (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quotes_insert_own
on public.quotes
for insert
to authenticated
with check (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quotes_update_own
on public.quotes
for update
to authenticated
using (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quotes_delete_own
on public.quotes
for delete
to authenticated
using (
  exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quote_lines_select_own
on public.quote_lines
for select
to authenticated
using (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quote_lines_insert_own
on public.quote_lines
for insert
to authenticated
with check (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quote_lines_update_own
on public.quote_lines
for update
to authenticated
using (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quote_lines_delete_own
on public.quote_lines
for delete
to authenticated
using (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

create policy share_tokens_select_own
on public.share_tokens
for select
to authenticated
using (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

create policy share_tokens_insert_own
on public.share_tokens
for insert
to authenticated
with check (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

create policy share_tokens_update_own
on public.share_tokens
for update
to authenticated
using (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

create policy share_tokens_delete_own
on public.share_tokens
for delete
to authenticated
using (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quote_events_select_own
on public.quote_events
for select
to authenticated
using (
  exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

create policy quote_events_insert_own
on public.quote_events
for insert
to authenticated
with check (
  event_type in ('sent', 'invoiced', 'paid', 'closed')
  and signer_name is null
  and comment is null
  and ip is null
  and exists (
    select 1
    from public.quotes q
    join public.businesses b on b.id = q.business_id
    where q.id = quote_id and b.owner_user_id = (select auth.uid())
  )
);

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin
      alter publication supabase_realtime add table public.quote_events;
    exception
      when duplicate_object then null;
    end;
  end if;
end $$;

comment on table public.quotes is 'A proposal or estimate. Client decisions are written by the server, not by the anon key.';
comment on table public.share_tokens is 'Unguessable tokens for /q/[token]. Anonymous roles cannot select this table.';
comment on table public.waitlist is 'Marketing beta list. Inserts go through the server using the service role.';
