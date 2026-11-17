# Stedflo landing page

React, TypeScript, Vite, and Tailwind CSS. The existing forest and lime design, typography, illustrations, phone mockup, and responsive sections are retained.

## Local development

Use the Node version in `.node-version` (Node 22.14.0) or a compatible newer version.

```sh
npm ci
npm run dev
```

For a fresh setup before a lockfile exists, use `npm install`. Development runs at http://localhost:3000.

```sh
npm run typecheck
npm run build
npm run preview
```

Preview serves the production output at http://127.0.0.1:4173. The legacy `npm run lint` command is an alias for the TypeScript check.

## Android release and download

The verified Android APK is version 1.0.0, package `com.stedflo.app`, version code 1. Its signature identifies Stedflo rather than an Android debug certificate.

`lib/android-release.js` pins the SHA-256, byte length, MD5 object identity, signer fingerprint, and versioned download path. The APK is staged in ignored `.release/`; it is not committed or copied into Pages static assets.

All Android buttons default to the managed `/downloads/` endpoint. `VITE_APK_DOWNLOAD_URL` can override it with a public HTTPS URL; an explicit empty value disables downloads. This variable is public and must never contain credentials.

The Pages Function reads only the pinned object from the private `RELEASES` R2 binding. Unknown filenames and write methods are denied. Missing or changed objects return a generic, non-cacheable error. APK responses include attachment headers, checksum, HEAD, conditional requests, and byte ranges for resuming.

The public `/downloads/release.json` describes the release. Append `.sha256` to its `downloadPath` for the checksum file. Possessing this public APK does not grant API access.

The APK exceeds Pages' 25 MiB static-asset limit. Keep the R2 bucket private. Never publish the AAB, keystore, signing passwords, or service-account credentials.

Run `npm test`, `npm run typecheck`, and `npm run build`. After seeding the local R2 preview bucket, use `npm run preview:cloudflare` at http://127.0.0.1:4174. Ordinary Vite preview cannot run the download Function.

See [deployment and security status](docs/deployment-security.md) for the upload, binding, domain, and verification procedure.
## Content and signup status

The overview strip describes income, bills, savings, and runway without fabricated adoption statistics or store ratings. Financial amounts in product previews are illustrative examples, not customer results.

An iOS release date is not announced. The iOS controls open an availability notice. There is **no signup form, waitlist submission, browser storage of email addresses, or automatic email notification**. Contact links open the visitor’s email application; the visitor chooses whether to send.

Website privacy information describes this static page and its external fonts. Mobile app encryption, device keystores, biometric support, data sales, deletion, and store review status are not verified by this repository and must not be claimed here.

## Cloudflare Pages setup (after local review)

The landing page is static React. Only `/downloads/*` invokes a Pages Function, which streams the pinned APK from private R2 storage. The financial API remains on Railway.

| Setting | Value |
| --- | --- |
| Framework preset | React (Vite) |
| Root directory | Repository root |
| Build command | `npm run typecheck && npm run build` |
| Build output directory | `dist` |
| Node version | Read `.node-version`, or set `NODE_VERSION=22.14.0` |
| Public build variable | `VITE_APK_DOWNLOAD_URL` (optional; set separately for Preview and Production) |

The npm lockfile is tracked for reproducible installs. Vite copies `public/_headers` and `public/_routes.json` into `dist`. `wrangler.jsonc` declares private production and preview R2 bindings.

Verify the initial Pages deployment and complete APK download before connecting `stedflo.com`. The user has authorized that connection; preserve existing Railway and Brevo DNS records.

References: [Cloudflare React guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/), [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [Vite static deployment](https://vite.dev/guide/static-deploy).

## Secrets and future signup integration

No API keys are needed to build or run this landing page. `vite.config.ts` disables Vite’s automatic public environment prefix and explicitly exposes only `VITE_APK_DOWNLOAD_URL`. Never add `process.env` replacements, expose whole environment objects, or place credentials in source, public assets, URLs, or build output.

Keep local environment files ignored. Any future real signup integration must call a server endpoint (for example a Pages Function or the existing backend), with Brevo credentials held only as server-side secrets. Show success only after the server confirms the signup. Add accurate consent and privacy copy for that implementation.

## Domain and DNS boundary

Connect `stedflo.com` after deployment verification. Export the DNS zone first, and change only the website hostname record(s).

Before a future domain connection, record the existing zone and plan only the website hostname changes. Preserve every Railway and Brevo record, including API/backend subdomains, MX, SPF, DKIM, DMARC, and verification records. If a website record conflicts with an existing service record, resolve that explicitly before changing it. Do not bulk replace records or change nameservers as part of this task.
