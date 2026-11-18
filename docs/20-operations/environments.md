# Environments

> Status: Active · Last updated: 2026-11-18 · Owner: Hai Nguyen

| Env | URL | Build | Config file | Purpose |
|---|---|---|---|---|
| Local | `http://localhost:4200` | `npm start` (`development`) | `environment.ts` | Development, source maps, HMR |
| Production | TODO(owner): domain | `npm run build` (`production`) | `environment.prod.ts` | Public site |

No staging environment. Use the host's preview deployments if available (TODO).

## Configuration keys

Both files must have the same keys (prod replaces dev at build time).

| Key | Dev | Prod | Notes |
|---|---|---|---|
| `production` | `false` | `true` | — |
| `version` | `2.0.0` | `2.0.0` | Sidenav footer; bump on release |
| `siteUrl` | `http://localhost:4200` | TODO | For future canonical/OG URLs |
| `emailjs.serviceId` | `service_casber` | same | Public identifier |
| `emailjs.templateId` | `template_contact` | same | Must match `api-contracts.md § EmailJS` params |
| `emailjs.publicKey` | public key | same | Public by design; restrict allowed origins in EmailJS dashboard |

## Local setup

```bash
node -v        # 18.19+ or 20+
npm ci
npm start      # http://localhost:4200
```

Claude desktop preview: `.claude/launch.json` → `haintp-dev`.
