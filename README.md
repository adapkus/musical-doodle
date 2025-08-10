# Neighborhood Jobs

A simple community jobs platform: local grandparents post small jobs and students apply.

## Quickstart
1. **Requirements**: Node 18+
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open <http://localhost:3000>

## Environment setup
Create `.env.local` with your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase dashboard steps
1. Auth → **Providers** → Email: enable
2. Auth → **URL Configuration**: add `http://localhost:3000` and your Vercel domain
3. In the SQL editor, apply `supabase.sql` (includes `create extension if not exists pgcrypto;`).
4. RLS overview:
   - **profiles**: users manage only their row
   - **jobs**: anyone can read; owners can insert/update/delete
   - **applications**: applicant or job owner can read; only applicant may write

## Deploy to Vercel
1. Push this repo to GitHub
2. Import project in Vercel
3. Set the environment variables above
4. Deploy

## Tailwind v4 notes
- `postcss.config.mjs` must use `@tailwindcss/postcss`
- Global CSS imports `@import "tailwindcss";` and `theme.css`
- To verify styling, add a test class like `bg-red-500`

## Troubleshooting
- The `/debug` page shows env, Supabase ping, and session info
- Common Supabase errors relate to missing URL configuration or RLS
