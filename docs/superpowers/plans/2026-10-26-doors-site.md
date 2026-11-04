# DOORS Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a multilingual static DOORS guide site with crawlable home and guide pages, publishable to Cloudflare Pages.

**Architecture:** Node's built-in modules render localized JSON content into static HTML. A shared stylesheet and small browser script provide responsive navigation and copy-to-clipboard. GitHub Actions can publish the generated `dist` directory to Cloudflare Pages when required account values are configured.

**Tech Stack:** Node.js built-in modules, HTML, CSS, vanilla JavaScript, GitHub Actions, Cloudflare Pages.

**Spec:** `docs/specs/2026-10-26-doors-site-design.md`

## Global Constraints
- Do not guess production domain, GSC token, Cloudflare account ID, or deployment credentials.
- Do not include advertising code before the owner supplies it.
- Treat current codes and volatile Roblox stats as reported snapshots requiring in-game/source checks.
- Preserve the supplied source-material folders.

## Review Focus
- HTML escaping on all text values to prevent malformed markup.
- Unknown locale/path requests return a real 404 page.
- Canonicals and language alternates remain same-origin and never use a guessed domain.
- Code cards identify the in-game confirmation caveat.
- Every sitemap route corresponds to a generated HTML page.

---

### Task 1: Add the static content and build pipeline

**Files:** Create `package.json`, `src/content.mjs`, `scripts/build.mjs`, `public/robots.txt`, and generated `dist/` output.

- [ ] Add localized route/content records and the static HTML renderer.
- [ ] Add script commands for building and serving the generated output locally.
- [ ] Generate canonical/hreflang tags, sitemap, robots, 404 page, and a copyable reported-code module.

### Task 2: Build the responsive design and source-based guide pages

**Files:** Create `public/styles.css`, `public/site.js`, `public/icons/*`, and update the content records.

- [ ] Add the DOORS-inspired visual system, mobile layout, accessible controls, and eight guide destinations.
- [ ] Write localized homepage and article material from the provided notes, avoiding unsupported claims.
- [ ] Extract the supplied favicon assets into the site's public icon directory.

### Task 3: Configure publishing and verify the artifact

**Files:** Create `.github/workflows/deploy.yml`, `.gitignore`, and `README.md`.

- [ ] Add a Pages deployment workflow that activates only when required Cloudflare secrets are configured.
- [ ] Run the production build and inspect every generated path, metadata tag, sitemap entry, and 404 response locally.
- [ ] Upload the finished source and build configuration to `lgqing0121/doors`.
- [ ] Record the missing Cloudflare/GSC setup values without exposing secrets in the repository.
