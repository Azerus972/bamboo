# Changelog

All notable changes to this project are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and the project uses [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-09-29

### Added

- Laravel 13 + Vue 3 (Inertia) starter with sign up, sign in, sign out, password reset, 2FA and teams.
- TikTok content planner: videos per team, status pipeline, hook suggestions, views/likes stats.
- Free plan limited to 5 videos, Pro plan through Stripe Checkout (Laravel Cashier, test mode).
- Admin area protected by an `is_admin` role, granted with `php artisan bamboo:make-admin`.
- Demo seeder and `/up` healthcheck.
