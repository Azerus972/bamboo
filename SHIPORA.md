# bamboo

> Built to SBS Core 1.2 + SBS Laravel 1.3 + SBS SaaS 1.1. Complete every section. Write "Not used" when a section does not apply.

TikTok content planner SaaS starter (proof of concept): teams plan their TikTok videos (idea → scripted → filmed → posted), get hook suggestions and see basic stats. Free plan: 5 videos. Pro plan: unlimited, billed with Stripe (test mode).

## Architecture

- Laravel 13 backend, Vue 3 frontend rendered through Inertia (`resources/js/pages`).
- Authentication: Laravel Fortify (sign up, sign in, sign out, password reset, email verification, 2FA, passkeys).
- **Tenant model: teams.** Every user gets a personal team on sign up and can create or join other teams. Team URLs are prefixed with the team slug (`/{team}/videos`). The `EnsureTeamMembership` middleware returns 403 when the user is not a member of that team, and `VideoController` only queries through `$currentTeam->videos()`, so a video id from another team returns 404. Covered by `tests/Feature/VideoTest.php`.
- Billing: official `stripe/stripe-php` SDK (no Laravel Cashier, so no `ext-bcmath` requirement). `GET /{team}/billing/checkout` opens Stripe Checkout for `STRIPE_PRICE`; `GET /{team}/billing/portal` opens the customer portal. `POST /stripe/webhook` (`StripeWebhookController`) verifies the signature with `STRIPE_WEBHOOK_SECRET` and stores the subscription status on the user (`checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`).
- Admin: `/admin` requires `users.is_admin = true` (`EnsureUserIsAdmin` middleware). No admin account or password is shipped.
- Main files: `app/Http/Controllers/VideoController.php`, `BillingController.php`, `Admin/AdminController.php`, `app/Models/Video.php`, `routes/web.php`, `resources/js/pages/videos/Index.vue`.

## Stack

- Laravel 13
- Vue 3
- PostgreSQL
- Redis
- Stripe
- Mail

## Installation

Requires PHP 8.4 with the `pdo_pgsql` extension (plus the extensions bundled with the official PHP image: curl, mbstring, openssl, dom, xml…), Composer 2.7+, Node.js 20.19+ and npm 10+.

```sh
composer install --no-interaction --prefer-dist
cp .env.example .env
php artisan key:generate
php artisan migrate --force
npm ci
```

Optional demo data: `php artisan db:seed` creates `demo@example.test` with 4 videos. Its password is `DEMO_PASSWORD`, or a random one printed by the seeder when empty.

First admin: register normally, then run `php artisan bamboo:make-admin you@example.test`.

## Environment

Every variable is listed in `.env.example` and in `shipora.json` → `env`. Use Stripe **test mode** keys only. `STRIPE_PRICE` is the ID of a recurring test price created in the Stripe dashboard.

## Database

PostgreSQL. Migrations create the full schema (users with Stripe subscription columns, teams, team members/invitations, videos). Tests run on in-memory SQLite (see `phpunit.xml`) so they need no external database.

## Queues

Not used. `QUEUE_CONNECTION=sync`: mail and webhooks run inside the request.

## Cron

The scheduler deletes expired team invitations daily (`routes/console.php`). Add this cron entry:

```
* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
```

The app works without it; expired invitations are then simply not purged.

## Storage

Not used. The app writes no user files; only Laravel's own `storage/` (logs, compiled views) and `bootstrap/cache/`, which must be writable. `storage/framework/cache/` is not shipped: Laravel creates it on demand if the file cache store is used.

## Build

```sh
npm run build
```

The build needs only Node.js: no PHP and no network access beyond `npm ci`. The Wayfinder route helpers (`resources/js/actions`, `resources/js/routes`, `resources/js/wayfinder`) are generated TypeScript committed with the source, and the Instrument Sans font comes from the `@fontsource/instrument-sans` npm package.

## Tests

`php artisan test`

## Known issues

- Proof of concept: no real TikTok API connection. Views and likes are entered manually; hook suggestions come from local templates.
- Upgrading returns 503 until `STRIPE_SECRET` and `STRIPE_PRICE` are set, and the Pro status only updates once a Stripe test webhook points to `/stripe/webhook` with its secret in `STRIPE_WEBHOOK_SECRET`.
- The free-plan limit is checked per user subscription, not per team.

## Customization guide

- Free plan limit: `Video::FREE_LIMIT` in `app/Models/Video.php`.
- Video statuses: `Video::STATUSES`.
- Hook templates: `hookTemplates` in `resources/js/pages/videos/Index.vue`.
- Plan price: change `STRIPE_PRICE`.
- Navigation: `resources/js/components/AppSidebar.vue`.
- After adding or changing Laravel routes or controllers, regenerate the frontend route helpers with `php artisan wayfinder:generate --with-form` (done automatically by `npm run dev`) and commit them.
- UI components: shadcn-vue in `resources/js/components/ui`.
