# Marwan — Portfolio

Next.js + Tailwind CSS portfolio site.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What to edit first

1. **Projects** — `components/Work.tsx`. Replace the `projects` array with your real
   work: name, role, tags, and an image (drop real screenshots into `/public` and
   point `image` at them instead of the picsum.photos placeholders).
2. **Bio & skills** — `components/About.tsx`.
3. **Contact info** — `components/Contact.tsx` (email + social links).
4. **Hero copy** — `components/Hero.tsx`.
5. **Colors** — `tailwind.config.ts` (`ink` = background, `paper` = text).
   Currently `#111111` / `#F8F7F3` as you specified.
6. **Fonts** — `app/layout.tsx`. Currently Bricolage Grotesque (display) + Inter (body),
   both loaded from Google Fonts via `next/font`.

## Push to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Deploy on Vercel

1. Go to vercel.com → **Add New Project**.
2. Import the GitHub repo you just pushed.
3. Framework preset auto-detects as **Next.js** — no config needed.
4. Click **Deploy**. You'll get a live `.vercel.app` URL immediately; add a custom
   domain later from the project's Settings → Domains.

Every push to `main` auto-redeploys.
