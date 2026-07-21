# Smooth Operator

> On-demand AI-augmented technical firefighting for SMBs and startups.

This repository is a **bootstrap example** for future IT Rockstars prototypes:
- Nuxt 4 + Tailwind CSS frontend
- AWS CDK TypeScript infrastructure
- Fully scripted deployment — no manual AWS console steps
- Serverless edge hosting via S3 + CloudFront + CloudFront Functions

---

## Quick Start

```bash
# Local development
make dev

# Build static site
make build

# Deploy everything (AWS CDK + S3 sync + CloudFront invalidation)
make deploy
```

---

## Project Structure

```
.
├── app/              # Nuxt 4 landing page
├── infra/            # AWS CDK infrastructure
├── scripts/          # Deployment helpers
├── bootstrap/        # Reusable bootstrap documentation
├── Makefile          # Common commands
└── .github/workflows/# CI/CD
```

---

## Stack

- **Frontend:** Nuxt 4, Tailwind CSS, Vue 3
- **I18n:** German (primary), English, Dutch
- **Hosting:** Amazon S3 + CloudFront (OAC) + Route53
- **Edge:** CloudFront Function for basic-auth preview protection
- **SSL:** AWS Certificate Manager (us-east-1)
- **Payments:** Stripe Checkout
- **CI/CD:** GitHub Actions

---

## AWS

- **Account:** `030760499811`
- **Region:** `eu-central-1` (dedicated / empty zone for Smooth Operator)
- **Profile:** Uses `rainer` profile with explicit `--region eu-central-1`
- **Domain:** `smooth-operator.io`

---

## Legal

IT-Rockstars Services S.L.  
NIF: B98537681  
Calle Conde de Salvatierra 21  
E-46004 Valencia

---

## License

Proprietary — IT-Rockstars Services S.L.
