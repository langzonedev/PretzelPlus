# Pretzel Plus website

Five static pages: Home (index.html), Menu, Enquiries, About and Events. Shared CSS and JS. Preview with `python -m http.server 8000`. GitHub Pages deploys main from the repository root.

Before launch: confirm menu and allergens; supply approved ABN, phone, email and annual event schedule; connect and test an approved enquiry service before enabling the form; add approved real product photography when available. Do not invent dates, contact details or prices. Keep the landing page minimal and retain original brand artwork.

Design: South Australia based, enquiries Australia-wide subject to feasibility; no unconfirmed interstate events. Keep original logo. Compact fluid layouts, collapsible menu categories, shared animated navigation, reduced-motion and keyboard support. Allow vertical scrolling for content, small screens and zoom; never clip content to force a viewport fit. Verify 320px through desktop, landscape, 200% zoom, keyboard and reduced motion before release.

Menu categories start collapsed at every screen size. Native details/summary preserves keyboard and no-JavaScript operation; compatible browsers animate open and close. No automatic resets on resize. Browser regression suite: `npm install` then `npx playwright install chromium` then `npm test` (requires Node and network for first install). The GitHub workflow runs the same checks.
