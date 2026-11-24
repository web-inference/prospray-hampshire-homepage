# Pro Spray Hampshire – Homepage build notes (Elementor Pro)

Preview: open `index.html` through a local server (`python -m http.server 5173` inside this folder).

## Global settings (Site Settings)
| Token | Value |
|---|---|
| Primary (gold, buttons on dark) | #E0B13A |
| Brand gold (live site) | #B58A1F |
| Gold text on white | #86610F |
| Ink / text dark | #121212 |
| Graphite (dark sections) | #1C1D20 |
| Slate (dark cards) | #2B2D31 |
| Paper (light sections) | #F4F4F1 |
| Body text | #4A4A4A |
| Headings font | Poppins 600/700/800 |
| Body font | Open Sans 400/600 |
| Container width | 1240px, gap 24px |
| Breakpoints | Tablet ≤1024, Mobile ≤767 (Elementor defaults) |
| Radius | 8 / 14 / 22px |

Buttons: gold = #E0B13A bg, #121212 text, 52px high, 8px radius (dark text on gold passes contrast; the old white-on-gold did not).

## Section → native widget map
| # | Section | Widgets |
|---|---|---|
| – | Header (Theme Builder). Top bar removed | Container, Icon List, Image (logo), Nav Menu (mega menu: Pro "Mega Menu" or Nav Menu dropdown), Button, sticky |
| 1 | Hero | Container (2 col), Heading H1 (3 lines), Text Editor, Button ×2, Icon List (pills), Image ×2, Icon Box (floating chip) |
| 2 | Trust bar | Container (4 col, gold bg), Icon Box ×4 |
| 3 | Services tiles | Container grid 3×2, Container with bg image + overlay gradient + Heading + Text + Button, link whole container |
| 4 | Vehicles | Container (2 col), Heading, Text, **Price List** widget, Button, Image ×2 (Before/After), Icon List (3 col) |
| 5 | Household | Icon Box ×4, Heading, Text, Button, Inner Containers (or Price List) for comparison rows |
| 6 | Process + videos | Container ×4 with numbered Heading, **Video** widget ×3 (self-hosted MP4 + Image Overlay) |
| 7 | Gallery | **Gallery** widget (Multiple, Masonry, Filter by tags, Lightbox) |
| 8 | Areas | Heading, Text, Icon List (inline pills), Container card (Optional: Google Maps) |
| 9 | Reviews | **Reviews** / Testimonial Carousel (replace with Google reviews) |
| 10 | FAQ | **Accordion** widget with FAQ schema on |
| 11 | CTA band | Container (dark + gradient), Heading, Text, Button, Icon List |
| 12 | Contact | **Form** widget (name, phone, email, postcode, service, message) + Icon List |
| – | Footer (Theme Builder) | Container 4 col, Image, Nav Menu ×2, Icon List, Social Icons, Form (newsletter) |
| – | Mobile call bar | Sticky container, mobile only, 2 Buttons |

Custom CSS needed (Site Settings → Custom CSS): tape corners (`.tape`), tile overlay gradient, price-list dotted leader, hero mist gradients. Everything else is native styling.

## Assets
`assets/img/` – 61 resized photos (max 1400px, JPG q80) + logo. `assets/video/` – 3 MP4s + poster frames.
Upload to the Media Library and convert to WebP (e.g. via ShortPixel/Imagify) before launch.

## Items to confirm with the client (placed in the design, not verified)
1. **Guarantee** – the mockup said "10 Year Guarantee" but the live site makes no guarantee claim, so it was removed from the page. Add it back (hero pill, trust bar, process step 4, FAQ) only after the client confirms the terms in writing.
2. **Front door price** – mockup says £300, live site says "from £250". Page uses £250.
3. **Mockup list item "Full Gates £300"** – unclear (probably "Tail gates"). Left out.
4. **Bi-fold doors £150 per section** – from the mockup; added.
5. **Fascias & soffits price** – no price anywhere. Shown in menu only.
6. **"Open 7 days a week"** – from mockup notes.
7. **"Full wraps" and "Plastic welding"** – in the mockup's service list; confirm they are offered.
8. **Alloy wheel and kitchen photos** – none supplied, so those tiles use other images.
9. **Reviews** – the 4 testimonials come from the live site and are about kitchens. Replace with Google reviews and a rating badge.
10. **Before/after** – only one clean pair (red Kia) in the photos. Ask for matched pairs per service.
11. **WhatsApp and Instagram links** – set to `#`.

## Soft scroll animations (all native Elementor Pro settings)
The preview uses the same animation names Elementor has, so nothing extra is needed beyond one small CSS paste.

**1. Paste once in Site Settings → Custom CSS.** Elementor's default Fade In Up slides a long way; this makes it a short, soft 24px move, and sets calmer speeds:
```css
@keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 24px, 0); } to { opacity: 1; transform: none; } }
@keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
.animated        { animation-duration: .8s; animation-timing-function: cubic-bezier(.22,.7,.2,1); }
.animated-slow   { animation-duration: 1s; }
.animated-fast   { animation-duration: .5s; }
@media (prefers-reduced-motion: reduce) { .animated { animation: none !important; } .elementor-invisible { visibility: visible !important; } }
```

**2. On each element:** Advanced → Motion Effects → Entrance Animation, then pick the type below. Leave Animation Duration on Normal (the CSS above sets it).

| Where | Entrance Animation | Animation Delay |
|---|---|---|
| Section heading blocks (kicker + H2 + text) | Fade In Up | 0 |
| Service tiles (6) | Fade In Up | 0, 90, 180, 0, 90, 180 ms |
| Trust bar items (4) | Fade In | 0, 90, 180, 270 ms |
| Household cards (4), process steps (4), reviews (4) | Fade In Up | 0, 90, 180, 270 ms |
| Videos (3) | Fade In Up | 0, 90, 180 ms |
| Vehicles text, then price list / before-after column | Fade In Up | 0, then 120 ms |
| Pricing intro, then price table | Fade In Up | 0, then 100 ms |
| Door before/after pair | Fade In Up | 150 ms |
| Areas copy, then dark card | Fade In Up | 0, then 120 ms |
| FAQ intro, then accordion | Fade In Up | 0, then 100 ms |
| Contact list, then form | Fade In Up | 0, then 100 ms |
| Gallery filters | Fade In | 0 |
| Hero (badge, H1 lines, text, buttons, image, cards) | Fade In Up | 80 ms steps from 0 to 640 ms |

Don't animate the header, footer or the mobile call bar.

**3. Sticky header (Elementor Pro):** Header container → Advanced → Motion Effects → Sticky: Top. Turn on Sticky Effects → Effects Offset 40px. Set the container Min Height to 84px (normal) and 70px (Sticky Effects), logo height 60px and 50px, and a soft box shadow on scroll: `0 10px 28px -14px rgba(0,0,0,.55)`.

Keep it this light. Do not add Scrolling Effects (parallax), rotate or scale effects.

## Service dropdown (custom select)
Browsers draw the open list of a normal `<select>` themselves, so neither CSS nor Elementor can restyle it. The preview keeps a real `<select>` for the form and shows a styled list on top.
- **Closed field:** style it natively in Form → Style → Fields (background #F4F4F1, radius 8px, height 52px, focus border #B58A1F).
- **Open list:** Elementor Pro → Custom Code, add the "Custom select" block from `assets/js/main.js` (the code that starts with `select[data-custom]`) in the footer, change its selector to `.elementor-field-type-select select`, and paste the `.cselect…` rules from the end of `assets/css/style.css` into Site Settings → Custom CSS.
- If you skip this, the Form widget still works; only the open list looks like the browser default.

## Legal pages and footer (UK)
Footer bottom bar links to three pages, to be written once the client confirms details:
1. **Privacy Policy** (UK GDPR). Needed because the form collects name, phone, email and address, and the footer has an email sign-up. Both now carry a consent line linking to it.
2. **Terms & Conditions** (quotes, deposits and payment, cancellations, access to the property, colour matching, aftercare, complaints). Whatever guarantee the client offers belongs here once confirmed in writing.
3. **Cookie Policy**, plus a cookie banner plugin, if analytics, ads, Google Maps embeds or reviews widgets are added.

Also required by UK law on a company website: the registered company name, **company number**, **registered office address**, and a VAT number if registered. Add these to the footer as a short line once the client supplies them. (The old site's "Pro Spray" copyright line gave none of this.)

Optional, low priority: an Accessibility statement.
Slogan "Because quality matters" removed (it came from the mockup, not the live site).
