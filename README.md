# CampusHub — Enhanced (MDX + RBAC + Visibility)

## Quick start

1. **Install deps**
   ```bash
   pnpm install
   ```
2. **Configure env**
   - Copy `.env.example` → `.env` and fill values.
3. **Database**
   ```bash
   pnpm dlx prisma migrate dev --name init
   ```
4. **Run**
   ```bash
   pnpm dev
   ```

## What's new in this enhancement
- **MDX rendering** with `next-mdx-remote` (RSC), `remark-gfm`, and `rehype-pretty-code` (Shiki) for **syntax-highlighted code blocks**.
- **RBAC** helpers (Admin/Mod) and enforcement for “Official” posts.
- **Granular visibility** via `VisibilityRule`:
  - PUBLIC, SCHOOL (signed-in), CLASSROOM, SEMESTER, SUBJECT, SERIES, CUSTOM, LINK.
  - **Link-only** sharing with secure `token` (query param) that unlocks access to a single item.
- **Private doc downloads** proxied through Next route, gated by visibility checks.

## Shareable links
When you create a Post/Doc and choose `LINK` visibility, a token is generated. Anyone with the URL containing `?token=...` can view/download that item.

- Post URL example:
  `/c/cse/s/2025-spring/dsa/post/intro-to-dsa?token=TOKEN_HERE`
- Doc download is linked automatically from the Doc page and preserves `?token=`.

## Scopes that require `scopeId`
- **CLASSROOM**: pass classroom `id`.
- **SEMESTER**: pass semester `id`.
- **SUBJECT**: pass subject `id`.
- **SERIES**: pass series `id`.
- **CUSTOM**: pass custom list `id` (and ensure the viewer is a list member).

> Tip: Use Prisma Studio to grab IDs during early setup: `pnpm dlx prisma studio`

## Seeding
Use the optional seed to create a demo classroom/semester/subject:
```bash
pnpm dlx tsx scripts/seed.ts
```

## Deploy
- Push to GitHub -> Import on Vercel.
- Add env vars: `DATABASE_URL`, `NEXTAUTH_SECRET`, `AUTH_GOOGLE_ID`/`SECRET` (optional), `BLOB_READ_WRITE_TOKEN`.
- Set Postgres (Neon/Vercel) and Vercel Blob.

## Notes
- `SCHOOL` scope is interpreted as “any signed-in user” by default.
- You can extend RBAC and add approval workflows per subject as needed.
