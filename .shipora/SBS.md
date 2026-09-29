# Shipora Build Standard: SBS Core 1.2 + SBS Laravel 1.3 + SBS SaaS 1.1

> The contract your product is verified against.
> Draft: this version of the standard is pending final validation and may still change.

- Product: bamboo
- Type: SaaS Starter
- Stack: Laravel 13 · Vue 3 · PostgreSQL · Redis · Stripe · Mail
- Generated: Sep 28, 2026

Severity: **Critical** and **High** issues prevent publication. **Medium** issues must be fixed or justified. **Recommendation** items improve the listing.

## SBS Core 1.2

Requirements every product meets, whatever its stack or type: a healthy archive, no secrets, a licence, documentation, versioning, a reproducible install and a valid shipora.json manifest.

### Critical

- **SBS-CORE-ARC-001: Healthy archive** · checked at intake
  The submission is a single valid ZIP of the project root. It contains no nested archives, no encrypted entries, no path traversal (../) and no symbolic links pointing outside the project.
  Fix: Zip the project root only. Remove nested archives and symlinks, then create the ZIP again.
- **SBS-CORE-INT-001: Release integrity** · checked at intake
  Shipora records the SHA-256 of every archive. Any change to a verified release creates a new release that must be verified again.
  Fix: Never replace files in a verified release. Bump the version, update CHANGELOG.md and submit a new archive.
- **SBS-CORE-SEC-001: No secrets or credentials** · checked at static
  The source contains no API keys, tokens, passwords, private keys, certificates or connection strings with credentials, whether in code, config, fixtures, tests or comments.
  Fix: Remove the value, rotate the exposed credential with its provider, read it from an environment variable and list the variable in .env.example with a placeholder.
- **SBS-CORE-SEC-002: No real environment files** · checked at static
  The archive contains no .env or environment-specific files (.env.local, .env.production…). Only .env.example is allowed, with placeholders.
  Fix: Delete the environment file from the archive and add it to .gitignore. Keep .env.example with placeholder values only.
- **SBS-CORE-MAL-001: No malware** · checked at static
  No known malware signature, backdoor, web shell, cryptominer or data exfiltration code.
  Fix: Remove the flagged file. If it is a false positive, explain its purpose in SHIPORA.md and request a manual review.
- **SBS-CORE-INS-001: Reproducible install** · checked at sandbox
  The product installs and builds from a clean copy of the source with the commands declared in shipora.json, with no manual step and no access outside package registries.
  Fix: Declare the exact install and build commands in shipora.json and run them on a fresh clone before submitting.
- **SBS-CORE-MAN-001: Valid shipora.json** · checked at manifest
  shipora.json exists at the root and validates against the Shipora manifest schema (identity, version, runtime, framework, prerequisites, services, databases, build, tests, healthcheck, env, permissions, external services).
  Fix: Start from the shipora.json in the product template and fill every required field.

### High

- **SBS-CORE-ARC-002: Archive within limits** · checked at intake
  The archive stays within 200 MB compressed, 1 GB uncompressed, 20,000 files and a compression ratio of 100:1. Archives above these limits are rejected before any analysis.
  Fix: Remove build output, media not needed at runtime and dependency folders. Host large assets elsewhere and document them in SHIPORA.md.
- **SBS-CORE-MAL-002: No suspicious execution** · checked at static
  No download-and-execute at install time, no eval of remote content, no post-install script fetching binaries, no hidden network calls.
  Fix: Remove the remote execution. Ship the dependency through the package manager and declare any external service in shipora.json.
- **SBS-CORE-OBF-001: No unjustified obfuscation** · checked at static
  Source code is readable. Minified or compiled output is allowed only when its source is included and the build is declared.
  Fix: Include the original source and the build command. Justify any remaining obfuscated file in SHIPORA.md.
- **SBS-CORE-LIC-001: Licence** · checked at static
  A LICENSE file at the root states the licence granted to buyers.
  Fix: Add a LICENSE file at the project root. The product template includes a placeholder to complete.
- **SBS-CORE-DOC-001: SHIPORA.md documentation** · checked at static
  SHIPORA.md at the root documents architecture, stack, installation, environment, database, queues, cron, storage, build, tests, known issues and a customization guide.
  Fix: Complete every section of SHIPORA.md. Write "Not used" for sections that do not apply.
- **SBS-CORE-VER-001: Semantic versioning** · checked at manifest
  The version in shipora.json follows SemVer (MAJOR.MINOR.PATCH) and matches the submitted release.
  Fix: Set "version" in shipora.json to the release version, e.g. 1.0.0.
- **SBS-CORE-ENV-001: Documented environment** · checked at manifest
  Every environment variable the product reads is listed in .env.example and in the "env" section of shipora.json, with a description and whether it is required.
  Fix: List each missing variable in .env.example (placeholder value) and in shipora.json "env".
- **SBS-CORE-TST-001: Automated tests** · checked at sandbox
  The test command declared in shipora.json runs without manual setup and passes.
  Fix: Declare "tests.command" in shipora.json and make the suite pass against the declared services.
- **SBS-CORE-HLT-001: Healthcheck** · checked at sandbox
  Products that run a server declare a healthcheck (HTTP path or command) that succeeds once the product is started.
  Fix: Add a lightweight health endpoint or command and declare it in shipora.json "healthcheck".
- **SBS-CORE-DEP-001: No bundled dependencies or caches** · checked at static
  The archive excludes vendor/, node_modules/, build caches, logs, OS files (.DS_Store) and editor folders.
  Fix: Delete these folders before zipping. The product template ships a .gitignore that excludes them.
- **SBS-CORE-MAN-002: Declarations match reality** · checked at manifest
  Runtime, framework, databases and services declared in shipora.json match what Shipora detects in the source and observes in the sandbox.
  Fix: Update shipora.json so it describes the product as it is, or remove unused declarations.
- **SBS-CORE-PRM-001: Declared permissions and external services** · checked at manifest
  File system writes, outbound network access and every external service (payments, mail, storage, APIs) are declared in shipora.json.
  Fix: Add the missing entries to "permissions" and "external_services" in shipora.json.

### Medium

- **SBS-CORE-LIC-002: Compatible third-party licences** · checked at static
  Bundled and declared dependencies allow commercial redistribution under the product licence.
  Fix: Replace dependencies whose licence forbids commercial redistribution, or document the constraint in SHIPORA.md.
- **SBS-CORE-CHG-001: Changelog** · checked at static
  CHANGELOG.md lists the changes of each version, including the submitted one.
  Fix: Add an entry for the submitted version at the top of CHANGELOG.md.
- **SBS-CORE-PTH-001: No personal paths** · checked at static
  No absolute or personal paths (/Users/…, /home/…, C:\Users\…) in code or configuration.
  Fix: Replace absolute paths with paths relative to the project root or environment variables.
- **SBS-CORE-PKG-001: .shipora metadata** · checked at static
  The .shipora/ folder holds listing metadata: real screenshots of this release and optional smoke checks. It never contains secrets.
  Fix: Add the .shipora/ folder from the product template and put real screenshots in .shipora/screenshots/.

## SBS Laravel 1.3

Laravel and PHP products: supported versions, Composer lockfile, migrations, tests, queues, scheduler and storage.

### Critical

- **SBS-LAR-003: No committed APP_KEY** · checked at static
  No APP_KEY value is committed. The install runs php artisan key:generate.
  Fix: Remove the key from all files and add php artisan key:generate to the install commands.
- **SBS-LAR-004: Migrations** · checked at sandbox
  php artisan migrate --force creates the full schema on an empty database of each declared engine.
  Fix: Add the missing migrations and test them on an empty database.

### High

- **SBS-LAR-001: Supported versions** · checked at manifest
  Laravel 12 or 13 on PHP 8.3 or later, declared in composer.json and in shipora.json "runtime" and "framework".
  Fix: Upgrade to a supported version and declare it in composer.json and shipora.json.
- **SBS-LAR-002: Composer lockfile** · checked at static
  composer.lock is included and consistent with composer.json. vendor/ is not included.
  Fix: Run composer install, commit composer.lock and delete vendor/ from the archive.
- **SBS-LAR-006: Tests** · checked at sandbox
  php artisan test passes against the declared database and services.
  Fix: Fix the failing tests or the test configuration (phpunit.xml) for the declared services.
- **SBS-LAR-010: Debug disabled by default** · checked at static
  .env.example sets APP_DEBUG=false and APP_ENV=production.
  Fix: Set APP_DEBUG=false and APP_ENV=production in .env.example.

### Medium

- **SBS-LAR-005: Seeders without external calls** · checked at sandbox
  Seeders run with php artisan db:seed and make no external network calls.
  Fix: Replace external calls in seeders with local fixtures.
- **SBS-LAR-007: Queues declared** · checked at manifest
  If the product dispatches jobs, the queue connection and the worker command are declared in shipora.json "services".
  Fix: Declare the queue driver and the worker command (php artisan queue:work) in shipora.json.
- **SBS-LAR-008: Scheduler declared** · checked at manifest
  If the product schedules tasks, the scheduler is declared in shipora.json and documented in SHIPORA.md (cron).
  Fix: Declare the scheduler (php artisan schedule:run every minute) and document it under "Cron".
- **SBS-LAR-009: Storage** · checked at sandbox
  Files are written through Storage disks. Public files require php artisan storage:link in the install commands.
  Fix: Use Storage disks and add storage:link to the install commands when public files are served.

### Recommendation

- **SBS-LAR-011: Frontend build from source** · checked at static
  Frontend assets are built with the declared build command. public/build is not included.
  Fix: Delete public/build from the archive and declare npm ci && npm run build.

## SBS SaaS 1.1

SaaS starters: authentication, billing in test mode, tenant isolation, protected admin and a healthcheck.

### High

- **SBS-SAAS-001: Authentication** · checked at sandbox
  Sign up, sign in, sign out and password reset work out of the box.
  Fix: Implement the missing flow and cover it with a test.
- **SBS-SAAS-002: Billing in test mode** · checked at manifest
  The billing provider is declared in shipora.json "external_services" and runs in test mode with keys from the environment.
  Fix: Declare the provider and read its keys from environment variables. Never ship live keys.
- **SBS-SAAS-003: Tenant isolation** · checked at manual
  Data of one team or account is never readable by another. The model is documented in SHIPORA.md.
  Fix: Scope every query to the current tenant and document the model under "Architecture".
- **SBS-SAAS-004: Protected admin** · checked at manual
  The admin area requires an admin role. No default admin password is shipped.
  Fix: Create the first admin through a documented command or seeder with a password read from the environment.
- **SBS-SAAS-005: Healthcheck** · checked at sandbox
  An HTTP healthcheck is declared and responds once the app is started.
  Fix: Expose /up (or equivalent) and declare it in shipora.json "healthcheck".

### Medium

- **SBS-SAAS-006: Configurable mail** · checked at manifest
  Transactional mail uses a mailer configured from the environment.
  Fix: Read mail settings from the environment and list them in .env.example.

### Recommendation

- **SBS-SAAS-007: Demo data** · checked at sandbox
  A demo seeder creates sample data. Demo credentials in SHIPORA.md are placeholders.
  Fix: Add a demo seeder and document how to create the demo account.

