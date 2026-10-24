# Delivery Sathi

Landing site and seller onboarding for Delivery Sathi — an AI agent that talks to COD buyers in Hindi, Hinglish, and English so more parcels get delivered.

Product truth lives in `PRODUCT.md`. The site deploys on Vercel. Supabase helpers are provisioned and unused until a project is connected.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Seller onboarding is at `/onboard`.

## Deploy on Vercel

Import this repository in Vercel. Framework preset: Next.js. No environment variables are required for the current site. Onboarding submissions validate on the server and log the payload until Supabase is wired.

## Supabase, later

1. Create a project in Supabase.
2. Copy `.env.example` into `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same on Vercel).
3. Insert from `parseOnboardingForm` / `submitOnboarding` once a `sellers` table exists.
4. Call `createClient` from `lib/supabase/client.ts` or `server.ts` as needed.
5. For auth, mount `updateSession` from `lib/supabase/update-session.ts` in a root `proxy.ts`.
