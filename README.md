# tunde-site

Personal site for Tunde Yakub. Plain static HTML, CSS and a little JavaScript. No build step.

## Files

- `index.html` — all the copy lives here
- `styles.css` — design tokens at the top (`:root`), then sections, then responsive rules
- `script.js` — Porto clock, mobile menu, reveal-on-scroll
- `favicon.svg`

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Deploy

Any static host works: GitHub Pages (push to a `tyak99.github.io` repo or enable Pages on this one), Cloudflare Pages (point it at the repo, no build command, output dir `/`), Netlify, Vercel.

## Design source

Design canvas: https://claude.ai/artifact/TPiYQXKQd1f8GeYTWu4hxP (direction A, Editorial dark).
