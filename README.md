e-commerce project example

# TechWear Shop

![main page](cover.png)

https://techwear-shop-nextjs.vercel.app/

Design:
https://www.figma.com/community/file/1273571982885059508/e-commerce-website-template-freebie

This project demonstrates my skills as a full-stack dev.


## Technology Stack

| Technology | Purpose | Benefits |
| --- | --- | --- |
| **Next.js** | React framework | Server components, fast page loads, SEO optimization |
| **TypeScript** | Programming language | Type safety, better developer experience, fewer runtime errors |
| **PostgreSQL** | Database | Data integrity, relational model, powerful querying with NeonDB |
| **Redis** | Session store | High-performance caching, reduced database load |
| **TailwindCSS** | Styling | Utility-first approach, responsive design, minimal CSS |
| **Stripe** | Payment processing | Secure transactions, comprehensive payment options |
| **Jest & Testing Library** | Testing | Comprehensive test coverage, behavior-driven testing |



## Setup

### Prerequisites
- Node.js 18+ and pnpm
- Docker (for local database development)
- PostgreSQL and Redis (or their Docker containers)

```bash
# clone project
git clone https://github.com/hex22a/techwear-shop-nextjs.git && cd techwear-shop-nextjs
```

```bash
# install dependencies
pnpm install
```

## Development Workflow

### Code Quality Tools

```bash
# run css linters
pnpm run lint:css

# run eslint
pnpm run lint
```

### Unit tests

Unit tests are fast tests so i have the most of them

```bash
# run unit tests
pnpm test
```
### Platform tests

Platform tests a.k.a. Integration tests setup their own local postgres database and use that for database testing.

```bash
# this will setup postgres container for you
./platform_tests/test.sh
```

Alternatively, you can start postgresql manually and run `pnpm test:platform`:

```bash
 docker run --rm \
  --name techwear_platform_tests_local \
  -e POSTGRES_DB=public \
  -e POSTGRES_USER=pg \
  -e POSTGRES_PASSWORD=pg \
  -p 5432:5432 \
  -v ./schema.sql:/docker-entrypoint-initdb.d/schema.sql \
  postgres:latest
```

## Run

```bash
pnpn dev
```

## Deployment
The application is automatically deployed to Vercel through GitHub Actions CI/CD pipeline:
1. Push to `main` branch triggers tests, linting, and production deployment
2. Pull requests trigger preview deployments for easy testing and review

## Acknowledgements
- [Figma Community Template](https://www.figma.com/community/file/1273571982885059508/e-commerce-website-template-freebie) for design inspiration
- [Vercel](https://vercel.com) for hosting
- [NeonDB](https://neon.tech) for PostgreSQL database
