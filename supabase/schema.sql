-- Bootstrap in a dedicated Mr. Cigar Supabase project, never Money OS.
-- Add the owner AFTER inviting/creating their Supabase Auth user.
create table public.mc_admins(id uuid primary key references auth.users(id) on delete cascade);
alter table public.mc_admins enable row level security;
grant select on public.mc_admins to authenticated;
create policy admin_read_self on public.mc_admins for select to authenticated using(id=(select auth.uid()));
create table public.mc_content(id text primary key check(id='main'),content jsonb not null);
alter table public.mc_content enable row level security;
grant select on public.mc_content to anon,authenticated;
grant insert,update,delete on public.mc_content to authenticated;
create policy content_public_read on public.mc_content for select to anon,authenticated using(true);
create policy content_admin_write on public.mc_content for all to authenticated using(exists(select 1 from public.mc_admins where id=(select auth.uid()))) with check(exists(select 1 from public.mc_admins where id=(select auth.uid())));
create table public.mc_inquiries(id uuid primary key default gen_random_uuid(),created_at timestamptz not null default now(),name text not null,contact text not null,date date not null,guests integer not null check(guests between 1 and 200),occasion text not null,details text not null default '',lang text not null check(lang in ('es','en')),consent boolean not null check(consent),status text not null default 'new' check(status in ('new','contacted','accepted','closed')),submission_key text not null unique);
create index mc_inquiries_contact_created on public.mc_inquiries(contact,created_at desc);
alter table public.mc_inquiries enable row level security;
revoke all on public.mc_inquiries from anon;
grant select,update on public.mc_inquiries to authenticated;
grant all on public.mc_inquiries to service_role;
create policy inquiries_admin_read on public.mc_inquiries for select to authenticated using(exists(select 1 from public.mc_admins where id=(select auth.uid())));
create policy inquiries_admin_update on public.mc_inquiries for update to authenticated using(exists(select 1 from public.mc_admins where id=(select auth.uid()))) with check(exists(select 1 from public.mc_admins where id=(select auth.uid())));
-- Service role only. Invoker security; serialized per contact prevents request races.
create function public.mc_submit_inquiry(payload jsonb) returns uuid language plpgsql security invoker set search_path=public as $$
declare existing_id uuid; result_id uuid; dedupe text;
begin
 perform pg_advisory_xact_lock(hashtext(lower(payload->>'contact')));
 dedupe := md5(payload::text);
 select id into existing_id from public.mc_inquiries where submission_key=dedupe;
 if existing_id is not null then return existing_id; end if;
 if (select count(*) from public.mc_inquiries where lower(contact)=lower(payload->>'contact') and created_at>now()-interval '1 hour') >= 5 then raise exception 'Too many requests'; end if;
 insert into public.mc_inquiries(name,contact,date,guests,occasion,details,lang,consent,submission_key) values(payload->>'name',payload->>'contact',(payload->>'date')::date,(payload->>'guests')::integer,payload->>'occasion',coalesce(payload->>'details',''),payload->>'lang',(payload->>'consent')::boolean,dedupe) returning id into result_id;
 return result_id;
end $$;
revoke execute on function public.mc_submit_inquiry(jsonb) from public,anon,authenticated;
grant execute on function public.mc_submit_inquiry(jsonb) to service_role;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('mr-cigar-media','mr-cigar-media',true,20971520,array['image/jpeg','image/png','image/webp','video/mp4','application/pdf']);
create policy media_admin_insert on storage.objects for insert to authenticated with check(bucket_id='mr-cigar-media' and exists(select 1 from public.mc_admins where id=(select auth.uid())));
create policy media_admin_read on storage.objects for select to authenticated using(bucket_id='mr-cigar-media' and exists(select 1 from public.mc_admins where id=(select auth.uid())));
create policy media_admin_update on storage.objects for update to authenticated using(bucket_id='mr-cigar-media' and exists(select 1 from public.mc_admins where id=(select auth.uid()))) with check(bucket_id='mr-cigar-media' and exists(select 1 from public.mc_admins where id=(select auth.uid())));
create policy media_admin_delete on storage.objects for delete to authenticated using(bucket_id='mr-cigar-media' and exists(select 1 from public.mc_admins where id=(select auth.uid())));
-- Run manually with the real Auth user UUID: insert into public.mc_admins(id) values('...');
