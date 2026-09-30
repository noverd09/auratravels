# Adding Supabase later

Supabase is **not connected**. The app runs on mock data behind repository interfaces, so the move is a swap of implementations, not a rewrite.

## How the layers fit

```text
Page / component
      ↓  (only imports lib/<entity>/service)
Service           lib/<entity>/service.ts        business logic, filtering, validation
      ↓
Repository        lib/<entity>/repository.ts     the interface (the contract)
      ↓
Implementation    mock-repository.ts  →  supabase-repository.ts
```

`lib/repositories.ts` is the only file that chooses an implementation. ESLint blocks `app/` and `components/` from importing `@/data/*`, `@/lib/repositories` or any `mock-repository`, so the UI cannot bypass the service layer.

Domain types in `types/index.ts` use snake_case names that match the planned columns, so rows can be returned as they are.

## Phase 1: current

Next.js, mock data in `data/`, mock repositories, in-memory inquiry store (`lib/inquiries/mock-repository.ts`, with simulated latency).

## Phase 2: Supabase PostgreSQL

1. Create a project and add `NEXT_PUBLIC_SUPABASE_URL` and a **server only** key to the environment (use `vercel env`).
2. Create the tables below. Enable Row Level Security on all of them.
3. Add `lib/<entity>/supabase-repository.ts` for each entity, implementing the existing interface.
4. In `lib/repositories.ts`, replace `new MockXRepository()` with `new SupabaseXRepository(client)`.
5. Seed the tables from `data/*.ts` (a one time script), then delete the mock data or keep it for tests.

Proposed schema (reference only, not applied):

```sql
create table destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null, country text not null, region text not null,
  slug text unique not null, description text not null, long_description text not null,
  hero_image text not null, gallery text[] not null default '{}',
  best_time_to_visit text not null, travel_styles text[] not null default '{}',
  featured boolean not null default false, created_at timestamptz not null default now(),
  tags text[] not null default '{}', themes text[] not null default '{}',
  coordinates text, hero_place text, aura text, experiences jsonb not null default '[]',
  planner_option text not null
);

create table trips (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references destinations(id),
  title text not null, slug text unique not null,
  duration int not null, price_from int not null,
  description text not null, long_description text not null, hero_image text not null,
  travel_styles text[] not null default '{}', featured boolean not null default false,
  locations text[] not null default '{}', highlights text[] not null default '{}',
  included text[] not null default '{}', not_included text[] not null default '{}',
  gallery text[] not null default '{}', created_at timestamptz not null default now()
);

create table itinerary_days (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  day_number int not null, title text not null, description text not null,
  location text not null, activities text[] not null default '{}', image text,
  unique (trip_id, day_number)
);

create table trip_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, phone text,
  destination text[] not null, trip_id uuid references trips(id),
  travel_date date, return_date date, flexible_dates boolean not null default false,
  travelers int not null, travelers_type text not null,
  travel_style text[] not null default '{}', budget text not null,
  interests text[] not null default '{}', message text,
  contact_method text not null default 'email',
  status text not null default 'new'
    check (status in ('new','reviewing','contacted','planning','converted','closed')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table journal_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null, slug text unique not null, excerpt text not null, content text not null,
  hero_image text not null, category text not null, published_at timestamptz not null,
  featured boolean not null default false, reading_minutes int not null default 4,
  destination_slug text
);
```

Notes for the inquiry table:

- Public read on `destinations`, `trips`, `itinerary_days` and published `journal_posts`.
- `trip_inquiries`: **insert only** for the anonymous role, no select. Reads happen in the admin area with an authenticated staff role.
- The server action (`app/plan-your-trip/actions.ts`) already validates with the same Zod schema, so keep inserts going through it and not from the browser.
- Add rate limiting (Vercel Firewall or a Supabase edge check) and a honeypot field before launch.

## Phase 3: Supabase Storage

Move `public/images/*` to a public bucket. Update `hero_image`, `gallery` and `image` columns to bucket URLs, add the storage host to `images.remotePatterns` in `next.config.ts`, and keep alt text and credits in a small `images` table (today in `data/images.ts`, read through `lib/images.ts`).

## Phase 4: admin dashboard (not built)

Potential routes: `/admin`, `/admin/inquiries`, `/admin/destinations`, `/admin/trips`, `/admin/journal`. Staff could view inquiries and customer details, change inquiry status (`new → reviewing → contacted → planning → converted | closed`), manage destinations, trips and itineraries, and publish journal posts. Protect with Supabase Auth plus RLS policies for a `staff` role. `robots.ts` already disallows `/admin`.
