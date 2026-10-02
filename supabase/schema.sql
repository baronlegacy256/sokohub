-- SokoHub classifieds marketplace — Supabase/PostgreSQL schema
-- Run in the Supabase SQL editor. Enables RLS on every table.

create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user','seller','moderator','admin')),
  location text,
  phone text,
  whatsapp text,
  business boolean default false,
  created_at timestamptz default now()
);

create table public.categories (
  id text primary key,
  slug text unique not null,
  name text not null,
  icon text,
  moderated boolean default false,
  sort_order int default 0
);

create table public.subcategories (
  id text primary key,
  category_id text references public.categories(id) on delete cascade,
  slug text not null,
  name text not null
);

create table public.category_attributes (
  id bigint generated always as identity primary key,
  category_id text references public.categories(id) on delete cascade,
  key text not null,
  label text not null,
  options jsonb
);

create table public.locations (
  id bigint generated always as identity primary key,
  country text default 'Uganda',
  region text,
  district text,
  city text,
  area text
);

create table public.ads (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  description text,
  price bigint not null,
  negotiable boolean default false,
  category_id text references public.categories(id),
  subcategory_id text references public.subcategories(id),
  location text,
  district text,
  condition text,
  seller_id uuid references public.profiles(id),
  status text default 'pending' check (status in ('draft','pending','active','rejected','expired','sold','archived')),
  featured boolean default false,
  urgent boolean default false,
  views int default 0,
  created_at timestamptz default now(),
  expires_at timestamptz
);
create index ads_category_idx on public.ads(category_id);
create index ads_subcategory_idx on public.ads(subcategory_id);
create index ads_location_idx on public.ads(location);
create index ads_price_idx on public.ads(price);
create index ads_created_idx on public.ads(created_at desc);
create index ads_status_idx on public.ads(status);
create index ads_seller_idx on public.ads(seller_id);

create table public.ad_images (
  id bigint generated always as identity primary key,
  ad_id bigint references public.ads(id) on delete cascade,
  url text not null,
  sort_order int default 0
);

create table public.ad_attributes (
  id bigint generated always as identity primary key,
  ad_id bigint references public.ads(id) on delete cascade,
  key text not null,
  value text not null
);
create index ad_attributes_ad_idx on public.ad_attributes(ad_id);

create table public.favorites (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  ad_id bigint references public.ads(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, ad_id)
);

create table public.conversations (
  id bigint generated always as identity primary key,
  ad_id bigint references public.ads(id),
  buyer_id uuid references public.profiles(id),
  seller_id uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table public.messages (
  id bigint generated always as identity primary key,
  conversation_id bigint references public.conversations(id) on delete cascade,
  sender_id uuid references public.profiles(id),
  body text,
  image_url text,
  read boolean default false,
  created_at timestamptz default now()
);

create table public.reports (
  id bigint generated always as identity primary key,
  ad_id bigint references public.ads(id),
  reporter_id uuid references public.profiles(id),
  reason text not null,
  status text default 'pending' check (status in ('pending','reviewed','resolved','dismissed')),
  created_at timestamptz default now()
);

create table public.reviews (
  id bigint generated always as identity primary key,
  seller_id uuid references public.profiles(id),
  reviewer_id uuid references public.profiles(id),
  rating int check (rating between 1 and 5),
  body text,
  created_at timestamptz default now()
);

create table public.notifications (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  text text not null,
  read boolean default false,
  created_at timestamptz default now()
);

create table public.payments (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id),
  amount bigint not null,
  currency text default 'UGX',
  provider text,          -- e.g. 'mobile_money', 'card' (provider-agnostic)
  reference text,
  status text default 'pending' check (status in ('pending','paid','failed','refunded')),
  created_at timestamptz default now()
);

create table public.promotions (
  id bigint generated always as identity primary key,
  ad_id bigint references public.ads(id),
  type text check (type in ('featured','top','urgent','homepage')),
  starts_at timestamptz,
  ends_at timestamptz,
  price bigint,
  payment_id bigint references public.payments(id)
);

create table public.subscriptions (
  id bigint generated always as identity primary key,
  seller_id uuid references public.profiles(id),
  plan text,
  starts_at timestamptz,
  ends_at timestamptz,
  payment_id bigint references public.payments(id)
);

create table public.seller_verifications (
  id bigint generated always as identity primary key,
  seller_id uuid references public.profiles(id),
  level text check (level in ('phone','identity','business')),
  status text default 'pending',
  reviewed_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table public.admin_actions (
  id bigint generated always as identity primary key,
  admin_id uuid references public.profiles(id),
  action text,
  target_type text,
  target_id bigint,
  note text,
  created_at timestamptz default now()
);

-- Row Level Security ---------------------------------------------------------
alter table public.ads enable row level security;
alter table public.profiles enable row level security;
alter table public.messages enable row level security;
alter table public.conversations enable row level security;
alter table public.favorites enable row level security;
alter table public.payments enable row level security;
alter table public.notifications enable row level security;
alter table public.reports enable row level security;

-- Public can read active ads
create policy "ads are public" on public.ads for select using (status = 'active' or seller_id = auth.uid());
create policy "owners insert ads" on public.ads for insert with check (seller_id = auth.uid());
create policy "owners update ads" on public.ads for update using (seller_id = auth.uid());
create policy "owners delete ads" on public.ads for delete using (seller_id = auth.uid());

create policy "profiles public read" on public.profiles for select using (true);
create policy "profiles owner update" on public.profiles for update using (id = auth.uid());

create policy "conversations for participants" on public.conversations for select using (buyer_id = auth.uid() or seller_id = auth.uid());
create policy "messages for participants" on public.messages for select using (
  exists (select 1 from public.conversations c where c.id = conversation_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid()))
);
create policy "messages send as self" on public.messages for insert with check (sender_id = auth.uid());

create policy "favorites owner" on public.favorites for all using (user_id = auth.uid());
create policy "payments owner read" on public.payments for select using (user_id = auth.uid());
create policy "notifications owner" on public.notifications for select using (user_id = auth.uid());
create policy "reports insert as self" on public.reports for insert with check (reporter_id = auth.uid());
