AI Toxicologist — iOS‑native web app (Next.js + Tailwind)

### Getting Started

1) Install dependencies (already installed if created via script):
```bash
npm install
```

2) Run the dev server:
```bash
npm run dev
```
Then open `http://localhost:3000`.

### Project Structure

- `src/app` — App Router pages and layout
- `src/components` — Reusable UI (StatsCard, SearchBar, Chip, BottomNav)

### Design Notes

- Mobile-first layout sized to `max-w-md` to feel like iOS
- Soft shadows, rounded corners, and gradients for a native look
- Sticky bottom navigation across routes

### Deploy

Vercel (recommended)

1. Push this folder to GitHub (public or private).
2. Go to Vercel → New Project → Import the repo.
3. Framework auto-detects as Next.js; accept defaults and Deploy.
   - Build Command: `next build`
   - Install Command: `npm install`
   - Output: auto (no change needed)
4. Vercel gives you a preview URL per commit and a production URL after you Promote.

Vercel CLI (one-command preview)

```bash
npm i -g vercel
vercel --yes --prod
```

Notes
- No environment variables are required for this project.
- Custom domains can be added in Vercel → Project Settings → Domains.
