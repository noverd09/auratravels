---
paths:
  - "**/*"
---

# Security

- **Never** log secrets, tokens, passwords, full request bodies, or PII (email, phone, address, passport, payment info).
- Secrets come from env / a secrets manager. Never commit a `.env`, never paste a secret in code, never put one in a test fixture.
- Validate and **escape** all user input that crosses a boundary (DB, shell, HTML, regex, file path).
- SQL: parameterized queries via the ORM. No string concatenation.
- Authorization is **per-resource**, not per-route. Check that the caller can access *this specific record* (e.g. this booking), not just that they're logged in.
- CSRF protection on state-changing routes from browser sessions. Bearer-token APIs are exempt.
- Don't disable framework security defaults (CORS, CSP, HSTS, helmet) without surfacing it explicitly.
- File uploads: validate MIME by magic bytes, cap size, store with a generated key, never trust the filename.
- Crypto: use vetted library primitives. Don't hand-roll JWT, hashing, or signing.
- Payments: never handle raw card data; use the payment provider's hosted fields/checkout.
- Dependencies: prefer adding nothing. If you must add one, check it's maintained, has no known CVEs, and fits the license policy.
