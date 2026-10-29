Warning: truncated output (original token count: 4141)
Total output lines: 95

import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { locales, moduleCards, guideCards, external } from "../src/content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const siteUrl = (process.env.SITE_URL || "https://doors-game.wiki").replace(/\/$/, "");
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION || "";
const e = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const href = (locale, slug = "") => `${locale.prefix}${slug ? `/${slug}/` : "/"}`;
const link = (locale, slug, label, className = "") => `<a class="${className}" href="${href(locale, slug)}">${e(label)}</a>`;
const pageTitle = (locale, slug) => locale.articles[slug] ? `${locale.articles[slug].title} — DOORS Guide` : slug === "privacy" ? `Privacy — DOORS Field Guide` : slug === "terms" ? `Terms — DOORS Field Guide` : locale.homeTitle;
const pageDescription = (locale, slug) => locale.articles[slug]?.description ?? locale.homeDescription;

function head(locale, slug, basePath) {
  const canonical = href(locale, slug);
  const alternates = Object.entries(locales).map(([key, alt]) => `<link rel="alternate" hreflang="${key === "pt-BR" ? "pt-BR" : key}" href="${href(alt, slug)}">`).join("");
  const canonicalAbsolute = siteUrl ? `${siteUrl}${canonical}` : canonical;
  const alternatesAbsolute = siteUrl ? Object.entries(locales).map(([key, alt]) => `<link rel="alternate" hreflang="${key === "pt-BR" ? "pt-BR" : key}" href="${siteUrl}${href(alt, slug)}">`).join("") : alternates;
  return `<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(pageTitle(locale, slug))}</title><meta name="description" content="${e(pageDescription(locale, slug))}">
  <meta name="theme-color" content="#0d0c0a"><meta name="robots" content="index,follow,max-image-preview:large">${googleVerification ? `<meta name="google-site-verification" content="${e(googleVerification)}">` : ""}
  <link rel="canonical" href="${e(canonicalAbsolute)}">${alternatesAbsolute}<link rel="alternate" hreflang="x-default" href="${siteUrl ? `${siteUrl}${href(locales.en, slug)}` : href(locales.en, slug)}">
  <meta property="og:type" content="website"><meta property="og:title" content="${e(pageTitle(locale, slug))}"><meta property="og:description" content="${e(pageDescription(locale, slug))}"><meta property="og:url" content="${e(canonicalAbsolute)}">
  <link rel="icon" type="image/svg+xml" href="${basePath}icons/door.svg"><link rel="icon" type="image/png" sizes="32x32" href="${basePath}icons/favicon-32x32.png">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${basePath}styles.css"><script defer src="${basePath}site.js"></script>
</head>`;
}

function localePicker(locale, slug) {
  return `<label class="locale-picker"><span class="sr-only">Language</span><select aria-label="Language" onchange="location.href=this.value">${Object.entries(locales).map(([key, item]) => `<option value="${href(item, slug)}" ${key === locale.label || key === (locale.name === "Português (Brasil)" ? "pt-BR" : locale.name === "Español" ? "es" : locale.name === "日本語" ? "ja" : "en") ? "selected" : ""}>${e(item.label)}</option>`).join("")}</select></label>`;
}

function shell(locale, slug, content) {
  const basePath = "/";
  const primaryLinks = ["beginner-guide", "entities", "items", "codes"];
  const navigation = primaryLinks.map((key, index) => link(locale, key, locale.nav[index], key === slug ? "active" : "")).join("");
  return `<!doctype html><html lang="${locale.label === "PT" ? "pt-BR" : locale.label === "JA" ? "ja" : locale.label.toLowerCase()}">${head(locale, slug, basePath)}<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="header-inner"><a class="brand" href="${href(locale)}" aria-label="DOORS Field Guide home"><span class="brand-mark" aria-hidden="true"><span></span></span><span>DOORS<span class="brand-sub">FIELD GUIDE</span></span></a><nav class="primary-nav" aria-label="Primary navigation">${navigation}</nav><div class="header-actions">${localePicker(locale, slug)}<a class="header-play" href="${external.roblox}" target="_blank" rel="noreferrer">${e(locale.play)} <span aria-hidden="true">↗</span></a><button class="menu-toggle" aria-expanded="false" aria-label="Open navigation"><span></span><span></span></button></div></div></header>
  <main id="main">${content}</main>
  <footer class="site-footer"><div class="footer-main"><a class="brand" href="${href(locale)}"><span class="brand-mark" aria-hidden="true"><span></span></span><span>DOORS<span class="brand-sub">FIELD GUIDE</span></span></a><p>${e(locale.footer)}</p><div class="footer-links"><a href="${external.roblox}" target="_blank" rel="noreferrer">Official Roblox ↗</a><a href="${external.discord}" target="_blank" rel="noreferrer">Discord ↗</a><a href="${external.reddit}" target="_blank" rel="noreferrer">Reddit ↗</a><a href="${external.trailer}" target="_blank" rel="noreferrer">Trailer ↗</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} DOORS Field Guide</span><span>Independent fan-made resource</span><a href="${href(locale, "privacy")}">Privacy</a><a href="${href(locale, "terms")}">Terms</a></div></footer>
</body></html>`;
}

function home(locale) {
  const hero = `<section class="hero"><div class="hero-scrim"></div><div class="hero-grid"><div class="hero-copy"><div class="eyebrow"><span class="eyebrow-line"></span>${e(locale.eyebrow)}</div><h1>${e(locale.heroTitle).replace("\n", "<br>")}</h1><p class="hero-description">${e(locale.heroText)}</p><div class="hero-buttons"><a class="button button-gold" href="${external.roblox}" target="_blank" rel="noreferrer">${e(locale.play)} <span>↗</span></a>${link(locale, "beginner-guide", locale.explore, "button button-glass")}</div><div class="hero-footnote"><span class="pulse-dot"></span> ROBLOX HORROR · COMMUNITY FIELD NOTES</div></div><div class="hero-art" aria-hidden="true"><div class="art-halo"></div><div class="hallway"><div class="hall-wall left"></div><div class="hall-wall right"></div><div class="hall-floor"></div><div class="hero-door"><span class="door-number">0013</span><span class="door-knob"></span><span class="door-light"></span></div><div class="door-frame"></div><div class="hall-glow"></div></div><div class="art-caption"><span>ROOM 0013</span><span>KEEP MOVING</span></div></div></div><div class="hero-bottom"><span>AN INDEPENDENT PLAYER RESOURCE</span><span>FIELD GUIDE / VOL. 01</span></div></section>
  <section class="stat-strip" aria-label="${e(locale.snapshot)}"><div class="stat-label">${e(locale.snapshot)}<span> / 01</span></div>${[0, 2, 4].map((index) => `<div class="stat-item"><strong>${e(locale.stats[index])}</strong><span>${e(locale.stats[index + 1])}</span></div>`).join("")}<div class="stat-update"><span class="live-indicator"></span><span>${e(locale.statsDate)}</span></div></section>
  <section class="section start-section"><div class="section-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span>${e(locale.startEyebrow)}</div><h2>${e(locale.startTitle)}</h2></div><p>${e(locale.startText)}</p></div><div class="start-grid">${guideCards.map((guide) => { const card = moduleCards.find((item) => item.slug === guide.slug); return `<a class="start-card" href="${href(locale, guide.slug)}"><span class="start-number">${guide.number}</span><span class="start-icon">${card.icon}</span><span class="start-card-body"…141 tokens truncated…ocale.modulesTitle)}</h2></div><p>${e(locale.modulesText)}</p></div><div class="module-grid">${moduleCards.map((card, index) => `<a class="module-card ${card.type || ""}" href="${href(locale, card.slug)}"><span class="module-index">${String(index + 1).padStart(2, "0")} <span> / FIELD NOTE</span></span><span class="module-icon">${e(card.icon)}</span><h3>${e(card.title[locale.name === "Português (Brasil)" ? "pt-BR" : locale.name === "Español" ? "es" : locale.name === "日本語" ? "ja" : "en"])}</h3><p>${e(card.subtitle[locale.name === "Português (Brasil)" ? "pt-BR" : locale.name === "Español" ? "es" : locale.name === "日本語" ? "ja" : "en"])}</p><span class="module-link">${e(locale.explore)} <span>↗</span></span></a>`).join("")}</div></section>
  <section class="source-band"><div class="source-mark">✳</div><div><div class="eyebrow"><span class="eyebrow-line"></span>INDEPENDENT · SOURCE-LED</div><h2>${e(locale.sourcesTitle)}</h2><p>${e(locale.sourcesText)}</p></div><a class="text-link" href="${external.roblox}" target="_blank" rel="noreferrer">${e(locale.sourceLink)} <span>↗</span></a></section>
  <section class="section faq-section"><div class="section-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span>02 — QUICK REFERENCE</div><h2>${e(locale.faqTitle)}</h2></div></div><div class="faq-list">${locale.faq.map((item, i) => `<details class="faq-item"><summary><span>${String(i + 1).padStart(2, "0")}</span>${e(item[0])}<b aria-hidden="true">+</b></summary><p>${e(item[1])}</p></details>`).join("")}</div></section>
  <section class="final-cta"><div><div class="eyebrow"><span class="eyebrow-line"></span>YOUR NEXT RUN STARTS HERE</div><h2>${e(locale.homeCta)}</h2></div>${link(locale, "beginner-guide", locale.explore, "button button-gold")}</section>`;
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "DOORS Field Guide", description: locale.homeDescription, inLanguage: locale.label === "PT" ? "pt-BR" : locale.label === "JA" ? "ja" : locale.label.toLowerCase() }).replace(/</g, "\\u003c")}</script>`;
  return `${jsonLd}${hero}`;
}

function article(locale, slug) {
  const page = locale.articles[slug];
  const index = moduleCards.findIndex((card) => card.slug === slug);
  const anchors = page.sections.map(([heading], i) => `<a href="#section-${i + 1}"><span>${String(i + 1).padStart(2, "0")}</span>${e(heading)}</a>`).join("");
  const contents = `<section class="article-hero"><div class="article-hero-inner"><div class="eyebrow"><span class="eyebrow-line"></span>FIELD GUIDE / ${String(index + 1).padStart(2, "0")}</div><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${href(locale)}">Home</a><span>/</span><span>${e(page.title)}</span></nav><h1>${e(page.title)}</h1><p>${e(page.description)}</p><div class="article-meta"><span>${e(locale.updated)}</span><span>·</span><span>INDEPENDENT GUIDE</span></div></div><div class="article-door" aria-hidden="true"><span>${slug === "hotel" ? "0100" : slug === "the-mines" ? "0200" : "0013"}</span></div></section><div class="article-layout"><aside class="article-sidebar"><div class="sidebar-label">${e(locale.contents)}</div>${anchors}<div class="sidebar-note"><span class="note-star">✳</span><p>${slug === "codes" ? e(locale.codesNote) : e(locale.footer)}</p></div></aside><article class="article-content"><p class="article-lede">${e(page.intro)}</p>${page.sections.map(([heading, body], i) => `<section class="guide-section" id="section-${i + 1}"><div class="section-kicker">FIELD NOTE ${String(i + 1).padStart(2, "0")}</div><h2>${e(heading)}</h2><p>${e(body)}</p></section>`).join("")}${slug === "codes" ? `<div class="code-list"><div class="code-card"><div><span class="code-state">REPORTED · VERIFY IN GAME</span><strong>ACCESS GRANTED</strong><span>150 Knobs reported</span></div><button type="button" class="copy-code" data-copy="ACCESS GRANTED" aria-label="Copy ACCESS GRANTED">COPY</button></div><div class="code-card"><div><span class="code-state">REPORTED · VERIFY IN GAME</span><strong>PROTOCOL</strong><span>20 Stardust reported</span></div><button type="button" class="copy-code" data-copy="PROTOCOL" aria-label="Copy PROTOCOL">COPY</button></div><p class="code-disclaimer">${e(locale.codesNote)}</p></div>` : ""}<div class="official-reference"><span class="reference-icon">↗</span><div><strong>Check the official experience</strong><span>Use the live Roblox page for current game details and updates.</span></div><a href="${external.roblox}" target="_blank" rel="noreferrer">ROBLOX</a></div></article></div><section class="related-section"><div class="eyebrow"><span class="eyebrow-line"></span>${e(locale.related)}</div><div class="related-grid">${moduleCards.filter((card) => card.slug !== slug).slice(0, 3).map((card) => `<a href="${href(locale, card.slug)}"><span>${e(card.icon)}</span><strong>${e(card.title[locale.name === "Português (Brasil)" ? "pt-BR" : locale.name === "Español" ? "es" : locale.name === "日本語" ? "ja" : "en"])}</strong><b>↗</b></a>`).join("")}</div></section>`;
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, inLanguage: locale.label === "PT" ? "pt-BR" : locale.label === "JA" ? "ja" : locale.label.toLowerCase(), isPartOf: { "@type": "WebSite", name: "DOORS Field Guide" } }).replace(/</g, "\\u003c")}</script>`;
  return `${jsonLd}${contents}`;
}

function notFound(locale) {
  return `<section class="not-found"><div class="eyebrow"><span class="eyebrow-line"></span>404 / ROOM NOT FOUND</div><h1>This room<br>doesn't exist.</h1><p>Head back to the field guide and choose another door.</p>${link(locale, "", "Back to the field guide", "button button-gold")}</section>`;
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, "public"), dist, { recursive: true });
const routeRecords = [];
for (const locale of Object.values(locales)) {
  const slugs = ["", ...Object.keys(locale.articles), "404", "privacy", "terms"];
  for (const slug of slugs) {
    const relative = slug ? `${locale.prefix.slice(1)}/${slug}/index.html`.replace(/^\//, "") : locale.prefix ? `${locale.prefix.slice(1)}/index.html` : "index.html";
    const target = path.join(dist, relative);
    await mkdir(path.dirname(target), { recursive: true });
    const content = slug === "404" ? notFound(locale) : slug === "privacy" || slug === "terms" ? `<section class="not-found"><div class="eyebrow"><span class="eyebrow-line"></span>INDEPENDENT RESOURCE</div><h1>${slug === "privacy" ? "Privacy" : "Terms"}</h1><p>This fan guide does not ask you to create an account. External services such as Roblox, Discord, and Reddit have their own privacy policies and terms.</p>${link(locale, "", "Back to the field guide", "button button-gold")}</section>` : slug ? article(locale, slug) : home(locale);
    await writeFile(target, shell(locale, slug, content), "utf8");
    if (slug !== "404" && slug !== "privacy" && slug !== "terms") routeRecords.push(href(locale, slug));
  }
}
const default404 = await readFile(path.join(dist, "404/index.html"), "utf8");
await writeFile(path.join(dist, "404.html"), default404, "utf8");
const sitemapEntries = routeRecords.map((route) => `<url><loc>${e(siteUrl ? `${siteUrl}${route}` : route)}</loc><changefreq>weekly</changefreq><priority>${/^\/(?:pt-br\/|es\/|ja\/)?$/.test(route) ? "1.0" : "0.7"}</priority></url>`).join("");
await writeFile(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</urlset>\n`, "utf8");
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl ? `${siteUrl}/sitemap.xml` : "/sitemap.xml"}\n`, "utf8");
console.log(`Built ${routeRecords.length} localized pages and sitemap in dist/.`);

