# Bootstrap

This project is designed as a **reusable bootstrap** for future IT Rockstars prototypes.

## How to clone this bootstrap for a new idea

1. Copy the repository structure.
2. Replace `smooth-operator` with your project name in:
   - `infra/package.json`
   - `infra/cdk.json`
   - `infra/bin/*.ts`
   - `app/package.json`
   - `README.md`
   - `Makefile`
3. Update the domain in `infra/lib/*-stack.ts`.
4. Update the legal entity in `app/pages/legal.vue` (or equivalent).
5. Run `make deploy`.

## Conventions

- All infrastructure is code (AWS CDK).
- All deployment is scripted (`Makefile` + `scripts/`).
- No manual AWS console steps.
- Preview deployments are password-protected.
- Search engines are blocked during preview (`robots.txt` + meta tags).

## Future improvements

- Extract reusable CDK constructs into a separate `@itrockstars/cdk` package.
- Add OpenNext / Cloudflare Workers preset as alternative hosting backend.
- Add Playwright E2E tests for critical flows.
