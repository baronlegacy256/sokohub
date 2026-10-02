# SokoHub — Uganda Classifieds Marketplace

A Next.js marketplace inspired by Jiji's marketplace model (original branding, UI, copy).

## Stack
- Next.js 16 (App Router, React 19, TypeScript)
- Tailwind CSS 4
- Seed data in `src/lib/seed/*` (~140 realistic Ugandan listings, sellers, UGX pricing)
- Client-side demo auth/favorites/messaging/notifications (localStorage) via `src/context/AppContext.tsx`
- Production database design in `supabase/schema.sql` (relational, RLS policies, indexes)

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

Demo tips:
- Search `/ads?q=Toyota&location=Kampala`
- Post an ad: `/sell`
- Log in with any email (start it with `admin` to label the account as admin and visit `/admin`)

## Core flows
- POST AD → category → subcategory → details (dynamic category attributes) → photos (cover reorder) → price/location → preview → submit (goes to pending review)
- DISCOVER → `/`, `/ads`, `/ads/[category]`
- SEARCH/FILTER → keyword + URL-param filters incl. category-specific attributes
- VIEW LISTING → `/ad/[slug]` with gallery, specs, seller, WhatsApp/call/chat actions
- CONTACT SELLER → internal chat, WhatsApp deep link, phone reveal

## Structure
- `src/app/*` routes (see plan for the full route map)
- `src/components/*` reusable UI (ListingCard, Filters, Header, MobileNav, …)
- `src/lib/*` types, catalog search, category field schema, utils
- `supabase/schema.sql` full relational schema + RLS for Supabase
