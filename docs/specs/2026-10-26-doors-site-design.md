# DOORS Fan Guide Site — Design

## Intent
Create a fast, search-friendly DOORS Roblox guide site based on the information architecture of the supplied Anime Dice reference: clear hero, quick task navigation, useful guides, source transparency, and FAQ.

## Goals
- Build a responsive dark editorial site with warm brass accents.
- Ship English, Brazilian Portuguese, Spanish, and Japanese routes.
- Render the homepage and eight topical pages as static HTML with unique titles, descriptions, canonicals, hreflang, breadcrumbs, and structured data where appropriate.
- Include sitemap, robots, accessible navigation, and copyable reported codes.

## Non-goals
- No ad network code until the owner supplies it.
- No invented domain, analytics account, GSC property, or Cloudflare credentials.
- No unverified tier rankings or claims that reported codes were redeemed in-game.

## Constraints and calls
- The supplied workspace contains source notes and a favicon archive but no application or Git checkout.
- An empty public GitHub repository `lgqing0121/doors` is available to receive the site.
- The supplied exact reference hostname did not open in the research tool; the related Anime Dice site search result supports its high-level information architecture. Reproduce the structure, not its branding or artwork.
- Use dependency-free Node static generation and HTML/CSS/JS to keep deployment simple on Cloudflare Pages.
- The public hostname is not known. Canonical URLs stay same-origin relative; production sitemap can be rebuilt with `SITE_URL` after a hostname is assigned.
- Cloudflare deployment and GSC ownership verification require account/property access that is not present in the workspace.

## Approaches
1. **Static site generator with no runtime dependencies (chosen):** fast, crawlable HTML and direct Cloudflare Pages compatibility; modest custom build code.
2. Client-rendered SPA: less markup generation but weaker first-response SEO and requires extra routing configuration.
3. Server framework: useful for frequently changing live data, but this brief is a guide site with no authorized data API or server requirement.

## Experience
Homepage: slim sticky navigation, cinematic DOORS hero, player-facing stats, eight SEO entry cards, start-here route cards, independent-source note, FAQ, and footer. Each route is a complete article page with localized shell and content, breadcrumbs, jump links, related guides, and clear source/uncertainty labels. Codes are marked for in-game confirmation.

## Launch requirements
Build and inspect the generated site, publish to the existing GitHub repository, then deploy on Cloudflare Pages when account credentials/project access are available. Add a GSC verification token or property-specific HTML verification file only after authorized property access is available. Keep advertising slots empty until code is supplied.
