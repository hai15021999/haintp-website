# Deployment

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## Build

```bash
npm ci
npm run build          # = ng build, production configuration
```

| Output | Value |
|---|---|
| Folder | `dist/` (flat: `index.html`, hashed `*.js`/`*.css`, `assets/`, `favicon.ico`) |
| Config | `production` (`environment.prod.ts` via `fileReplacements`, output hashing, budgets) |
| Base href | `/` — the site must be served at the domain root. For a sub-path use `ng build --base-href /<path>/` |

## Host requirements

| Requirement | Why |
|---|---|
| SPA fallback: unknown paths → `/index.html` (HTTP 200) | Deep links like `/portfolio/valuation-platform` |
| HTTPS | Required for EmailJS and good practice |
| Cache: `index.html` no-cache; hashed files `max-age=31536000, immutable` | Safe updates |
| Gzip/Brotli | Transfer size |

Host: **TODO(owner): confirm provider** (GitHub Pages / Netlify / Vercel / Nginx). Examples:

```nginx
# Nginx
location / { try_files $uri $uri/ /index.html; }
location ~* \.(js|css|svg|webp|jpg|png|woff2)$ { expires 1y; add_header Cache-Control "public, immutable"; }
```

```toml
# Netlify (netlify.toml)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

GitHub Pages has no rewrite: copy `dist/index.html` to `dist/404.html` after build.

## Release checklist

- [ ] `master` is green: `npx ng build` without errors
- [ ] Bump `version` in both `src/environments/environment*.ts` (shown in the sidenav footer)
- [ ] Manual smoke on the build output (`npx serve -s dist` — `-s` enables the SPA fallback — or the host preview)
- [ ] Deploy `dist/`
- [ ] Post-deploy smoke (runbook.md § Smoke test)
- [ ] Add a row to the deployment log

## Deployment log

| Date | Version | Commit | Notes |
|---|---|---|---|
| TODO | 2.0.0 | TODO | Restructure: UI kit, content layer, resume, new projects |
