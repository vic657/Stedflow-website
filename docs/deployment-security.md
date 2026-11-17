# Stedflo release and security status

## Published release

- Pages: https://stedflo.pages.dev
- Deployment: https://4a1b8afc.stedflo.pages.dev
- APK: https://stedflo.pages.dev/downloads/stedflo-1.0.0-4c9f975ac05d.apk
- Intended custom domain: stedflo.com; associated with Pages, awaiting the website DNS CNAME.
- Package: com.stedflo.app, version 1.0.0, version code 1.
- Size: 40,054,269 bytes.
- SHA-256: 4c9f975ac05d8ae510b71b3f08f0b7c6473bc2a5afcabf81bd1d6a9ed90fbe02.
- Signing certificate SHA-256: ea3764a3265f339dd26f98ceaa24dcd417290e4d3db6b1906d010433241aa970.

The APK signature verifies, and all 26 comparable native-code, JavaScript-bundle, and asset entries match the freshly built AAB. The AAB, keystore, and signing passwords were not uploaded.

Every published APK byte was downloaded using resumable ranges and compared with the original. The complete reconstructed APK has the expected size and SHA-256. Remote HEAD, partial-content responses, unknown-file rejection (404), unsupported-method rejection (405), and security headers passed.

## Hosting controls

The React site is hosted by Cloudflare Pages. Only /downloads/* invokes a Function. RELEASES binds private R2 storage, and the handler reads only the pinned APK object. There is no public upload, delete, bucket-listing, or arbitrary-object endpoint.

Production bucket: stedflo-releases. Preview bucket: stedflo-releases-preview. The production bucket’s direct r2.dev access is disabled. Pages production and preview are configured fail-closed.

Static responses use CSP, HSTS without includeSubDomains, anti-framing, nosniff, restrictive permissions, and referrer policy. APK responses add attachment disposition, an immutable versioned URL, checksum, HEAD, conditional requests, and resumable ranges. Missing or changed artifacts produce a generic non-cacheable error.

The browser receives only the public APK URL. Automatic Vite environment exposure is disabled. Credentials are held in the Windows keychain or process memory, never in frontend code. Local artifacts, verification downloads, provider responses, and staging files remain in ignored .release/. No real waitlist signup is presented.

## Domain step

Cloudflare Pages custom-domain association has been created for stedflo.com. The Wrangler OAuth login can manage Pages/R2 but cannot read or edit DNS records. The owner must add or update only the website CNAME: @ -> stedflo.pages.dev, Proxied, TTL Auto.

Preserve every Railway, Brevo, API/backend, MX, SPF, DKIM, DMARC, and verification record. Do not change nameservers or bulk-replace DNS records. A limited public API/mail DNS snapshot is saved in ignored .release/public-dns-before.json; a full zone export was unavailable through this OAuth scope.

After the CNAME is present, check the Pages domain status/certificate, HTTPS homepage, APK response and checksum, and the unchanged public mail/API records.

## Backend status

The Laravel source uses Sanctum authentication, per-user ownership checks, and rate limits for login, verification, password reset, writes, and sensitive actions. Existing tests passed (49 tests, 176 assertions). Live read-only checks confirmed representative private endpoints return 401, and /.env returns 404.

A scoped response-header fix is applied locally in C:/Users/vicmass/payflow: SecurityResponseHeaders, global registration, exception-response headers, and regression tests. The updated suite passed (52 tests, 193 assertions). The additional authorization matrix passed (77 assertions) for all 38 nonpublic API routes. API responses receive private/no-store caching; error and health responses retain security headers; HTTPS receives HSTS without includeSubDomains.

The backend fix is NOT deployed. The user confirms account verification/login; nevertheless the linked Railway CLI project returns Unauthorized. Diagnose the existing session/project access without deploying to an unrelated accessible project. Preserve the backend repository’s unrelated local changes.

Authenticated cross-account production testing, production variable inspection, and live validation of the backend header fix remain pending authorized Railway project access. The tests and hosting changes are not a guarantee that every possible application vulnerability has been eliminated.

## Future release procedure

1. Build a new signed APK, verify its certificate and package metadata, and increment the app version/code as appropriate.
2. Stage the APK under ignored .release/, update the pinned release metadata and versioned URL, and never reuse an immutable URL for different bytes.
3. Upload the exact artifact to private R2 before making its download link available.
4. Run npm test, npm run typecheck, and npm run build; deploy the source and Function with pinned Wrangler 4.163.0.
5. Verify the complete remote file with ops/Verify-Release-Ranges.ps1 and review response security behavior before connecting or advertising a new release.

## Pricing checked 2026-11-16

R2 Standard includes 10 GB-month storage, 1 million Class A operations, and 10 million Class B operations monthly, with free Internet egress. Pages static requests are free; Pages Functions share the Workers Free allowance of 100,000 requests daily. Normal launch usage for this 40 MB APK is expected to remain within free allowances, but R2 usage beyond those allowances is billed. No paid Workers plan was enabled by this task.

References: https://developers.cloudflare.com/r2/pricing/ ; https://developers.cloudflare.com/pages/functions/pricing/ ; https://developers.cloudflare.com/pages/platform/limits/ ; https://developer.android.com/tools/apksigner
