# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
```

There are no lint or test scripts.

## Architecture

**Next.js 14 App Router** — all pages live in `src/app/`. Every page/component that uses hooks or browser APIs needs `'use client'` at the top.

**Routing:** File-based. Pages: `/` `(page.jsx)`, `/car`, `/team`, `/sponsors`, `/contact`, `/news`, `/news/[slug]`. API routes: `src/app/api/contact/route.js`, `api/news/route.js`, `api/news/[slug]/route.js`, `api/sponsors/route.js`, `api/team/route.js`.

**Providers:** `src/app/Providers.jsx` wraps the app in `LanguageProvider` (+ Navbar, Footer, ScrollToTop, LangSync). Imported in `src/app/layout.jsx`.

## Internationalisation

All UI text lives in `src/i18n/translations.js` as `{ en: {...}, tr: {...} }`. Components consume it via:

```jsx
const { lang, t } = useLanguage()  // from src/context/LanguageContext.jsx
```

`lang` is `'en'` or `'tr'`. For Sanity fields: `post[`title_${lang}`]`.

**Turkish uppercase CSS bug:** `text-transform: uppercase` maps `i → I` in Chrome regardless of `lang` attr. Fix: pre-uppercase strings using correct `İ` in `translations.js`, or use `style={{ textTransform: 'none' }}` on elements that must not be uppercased.

`LangSync.jsx` sets `document.documentElement.lang` dynamically to support any CSS rules that rely on the lang attribute.

## Data Sources

- **CMS:** Sanity — manages news, team members, and sponsors. Client: `src/lib/sanity.js`. Studio: `bogaziciracing.sanity.studio`. Schemas: `sanity/schemas/` (root-level `sanity/` dir, separate from `src/`). API routes: `api/news/`, `api/team/`, `api/sponsors/`.
- **Static data fallback:** `src/data/team.js` — team roster by season (used if Sanity is unavailable). Edit to update team members without CMS.
- **Sponsors static fallback:** hardcoded in `src/components/Sponsors.jsx`; overridden by `/api/sponsors` at runtime.

## Images & Performance

Do **not** use `next/image` — it caused TBT regressions on desktop (ResizeObserver forced reflows). Use plain `<img>` with:
- `loading="lazy" decoding="async"` for below-fold images
- `decoding="async"` only for above-fold / LCP images

Do **not** use `next/font` — it adds a hydration blocking script that hurt TBT. Google Fonts is loaded via CDN `<link>` tags in `src/app/layout.jsx`.

## Key Components

- **`ShaderBackground.jsx`** — WebGL race track animation + 2D canvas car overlay. Resize handler ignores height-only changes (prevents mobile address bar reflow). Do not add height-based resize logic.
- **`Hero.jsx`** — Titles `BOĞAZİÇİ` / `RACING` are hardcoded (not from translations). `RACING` has `style={{ textTransform: 'none' }}` to prevent TR locale uppercasing.
- **`Car.jsx`** — Dual layout: `md:hidden` mobile (video at natural `aspect-video` ratio, eyebrow+title overlaid top; badge/desc/CTA in separate navy strip below) / `hidden md:block` desktop (full-screen video with all content overlaid).

## Styling

Tailwind with custom tokens (see `tailwind.config.js`):
- Navy: `#0D1B2A` (`navy`, `navy-light`, `navy-dark`)
- Gold: `#C9A84C` (`gold`, `gold-light`, `gold-dark`)
- Custom tracking: `tracking-widest2` = `0.25em`
- Font: Inter (Google Fonts CDN)

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=4swxhit6
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=...          # server-only, no NEXT_PUBLIC_ prefix
NEXT_PUBLIC_SITE_URL=https://bogaziciracing.vercel.app
```

## Contact Form Email

`src/app/api/contact/route.js` sends to `info.buracing@gmail.com` via Resend. Do not change this address.
