-- Run once in Supabase Dashboard → SQL Editor.
-- Required when SUPABASE_SERVICE_ROLE_KEY is not set on the server.
-- Also safe to run if you use the service role key (policies are additive).

alter table public.suggestions enable row level security;

drop policy if exists "Allow anon insert suggestions" on public.suggestions;
create policy "Allow anon insert suggestions"
  on public.suggestions
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anon select suggestions" on public.suggestions;
create policy "Allow anon select suggestions"
  on public.suggestions
  for select
  to anon
  using (true);
