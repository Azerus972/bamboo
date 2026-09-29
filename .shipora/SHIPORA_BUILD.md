# Build a SaaS Starter for distribution on Shipora

You are building a Laravel 13 + Vue 3 + PostgreSQL SaaS Starter.
Your project MUST comply with the Shipora Build Standard:
SBS Core 1.2 + SBS Laravel 1.3 + SBS SaaS 1.1

## Requirements
- shipora.json manifest at the project root (identity, version, runtime,
  services, database, build, tests, healthcheck, environment)
- SHIPORA.md: architecture, installation, env, database, queues,
  cron, storage, build, tests, known issues, customization guide
- LICENSE and CHANGELOG.md (semantic versioning)
- .env.example listing every variable, placeholders only
- Database migrations and demo seeders for PostgreSQL
- Automated tests that pass with `php artisan test`
- Declared services: Redis, Stripe, Mail
- Clean install from source: `composer install && npm ci && npm run build`

## Never include
- Secrets, credentials, API keys or real .env files
- vendor/, node_modules/, build caches or logs
- Absolute or personal paths, obfuscated code

## Deliverable
One ZIP of the project root. Shipora installs, builds and tests it
in an isolated environment before it reaches buyers.

## Working with your agent
- Keep this file at the project root as SHIPORA_BUILD.md.
- Give it to your agent at the start of each session.
