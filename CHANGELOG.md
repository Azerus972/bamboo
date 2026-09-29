# Changelog

All notable changes follow [Semantic Versioning](https://semver.org).

## [0.1.0] Unreleased

- First version (proof of concept).
- Laravel 13 + Vue 3 (Inertia) starter with sign up, sign in, sign out, password reset, 2FA and teams.
- TikTok content planner: videos per team, status pipeline, hook suggestions, views/likes stats.
- Free plan limited to 5 videos, Pro plan through Stripe Checkout (Laravel Cashier, test mode).
- Admin area protected by an `is_admin` role, granted with `php artisan bamboo:make-admin`.
- Demo seeder and `/up` healthcheck.
