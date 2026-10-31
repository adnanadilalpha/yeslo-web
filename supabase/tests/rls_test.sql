begin;

select plan(16);

select ok(
  not has_table_privilege('anon', 'public.businesses', 'select'),
  'anon cannot select businesses'
);
select ok(
  not has_table_privilege('anon', 'public.clients', 'select'),
  'anon cannot select clients'
);
select ok(
  not has_table_privilege('anon', 'public.quotes', 'select'),
  'anon cannot select quotes'
);
select ok(
  not has_table_privilege('anon', 'public.quote_lines', 'select'),
  'anon cannot select quote lines'
);
select ok(
  not has_table_privilege('anon', 'public.share_tokens', 'select'),
  'anon cannot select share tokens'
);
select ok(
  not has_table_privilege('anon', 'public.quote_events', 'select'),
  'anon cannot select quote events'
);
select ok(
  not has_table_privilege('anon', 'public.waitlist', 'select'),
  'anon cannot select the waitlist'
);
select ok(
  not has_table_privilege('anon', 'public.waitlist', 'insert'),
  'anon cannot insert into the waitlist'
);
select ok(
  not has_table_privilege('authenticated', 'public.waitlist', 'select'),
  'authenticated cannot read the waitlist'
);
select ok(
  not has_table_privilege('authenticated', 'public.quote_events', 'update'),
  'authenticated cannot rewrite decision events'
);
select ok(
  not has_table_privilege('authenticated', 'public.quote_events', 'delete'),
  'authenticated cannot delete decision events'
);

select has_table_privilege('authenticated', 'public.quotes', 'select', 'owners can select quotes, filtered by RLS');
select has_table_privilege('authenticated', 'public.quotes', 'insert', 'owners can insert quotes, filtered by RLS');
select has_table_privilege('authenticated', 'public.share_tokens', 'insert', 'owners can create share tokens, filtered by RLS');
select has_table_privilege('authenticated', 'public.quote_events', 'select', 'owners can read their events');
select has_table_privilege('authenticated', 'public.quote_events', 'insert', 'owners can insert non-decision events');

select * from finish();

rollback;
