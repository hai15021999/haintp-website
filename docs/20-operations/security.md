# Security

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

## Threat model (static personal site)

| Threat | Vector | Control |
|---|---|---|
| XSS via content | Markdown case studies | Rendered by `marked`, inserted with `[innerHTML]` through Angular's sanitizer (no `bypassSecurityTrust*`) |
| XSS via icons | `IconComponent` uses `bypassSecurityTrustHtml` | Input is a static constant map (`ICON_PATHS`), never user/data input — keep it that way |
| Contact spam | Bots posting the form | Honeypot field, length limits, EmailJS rate limits; TODO: enable EmailJS reCAPTCHA if spam appears |
| Key abuse | EmailJS public key in bundle | Public by design; restrict allowed origins in EmailJS dashboard (TODO(owner): confirm) |
| Reverse tabnabbing | External links | `rel="noopener noreferrer"` on all `target="_blank"` |
| Supply chain | npm packages | Allow-list in dependency-management.md, `npm ci`, `npm audit` monthly |
| Personal data exposure | Email/phone in source | Owner chose to publish email and phone (2026-11-18, NFR SEC-5). Accepted risk: spam/scraping of both; nothing else personal is published. Mitigation if spam grows: show them only after a click, or remove and keep the form |

## Secrets

| Item | Secret? | Location |
|---|---|---|
| EmailJS service/template id, public key | No (public) | `src/environments/*.ts` |
| EmailJS private key / account password | Yes | Never in repo |
| Host / registrar credentials | Yes | Never in repo |

## Headers (set at host — TODO(owner))

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.emailjs.com; frame-ancestors 'none'; base-uri 'self'
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

`'unsafe-inline'` for scripts is needed by the pre-boot theme script in `index.html`; replace with a hash when CSP is enabled.

## Checklist (per release)

- [ ] `npm audit --omit=dev` reviewed
- [ ] No new `bypassSecurityTrust*` usages (`grep -rn bypassSecurityTrust src`) beyond `icon.component.ts`
- [ ] No secrets (`git grep -i -E "secret|password|private_key"`)
