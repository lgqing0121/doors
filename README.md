# DOORS Field Guide

An independent, multilingual fan guide for the Roblox experience DOORS. Built as static HTML for search accessibility and Cloudflare Pages.

## Local preview

- `npm run build` generates the site in `dist/`.
- `npm run preview` serves the generated site at `http://127.0.0.1:4173`.

The build uses Node.js built-in modules only. It defaults to `https://doors-game.wiki`; set `SITE_URL` to another public HTTPS hostname only if the deployment uses a different domain.

## Cloudflare Pages

The GitHub Actions workflow builds every push to `main`. To enable automatic deployment, create a Cloudflare Pages project named `doors-field-guide`, add the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, and set the repository variable `CLOUDFLARE_CONFIGURED` to `true`. Set `SITE_URL` to the final public hostname, including `https://`. The Pages action deploys the `dist/` directory.

## Google Search Console

After the public hostname is live, add its URL-prefix property in Google Search Console and complete the offered HTML-tag verification. Save the verification token as the repository variable `GOOGLE_SITE_VERIFICATION`, then add the `sitemap.xml` URL. This project does not contain a fabricated verification token.

## Content and advertising

Live counts and reported DOORS codes can change. Code rewards in this guide are explicitly labeled as reported and should be checked in-game. No ad scripts are included; advertising can be added after the owner supplies the approved code.

The site is independent and is not affiliated with LSPLASH or Roblox.

