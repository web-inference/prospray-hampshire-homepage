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
| – | Top bar + Header (Theme Builder) | Container, Icon List, Image (logo), Nav Menu (mega menu: Pro "Mega Menu" or Nav Menu dropdown), Button, sticky |
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
| 12 | Contact | **Form** widget (File Upload field) + Icon List |
| – | Footer (Theme Builder) | Container 4 col, Image, Nav Menu ×2, Icon List, Social Icons, Form (newsletter) |
| – | Mobile call bar | Sticky container, mobile only, 2 Buttons |

Custom CSS needed (Site Settings → Custom CSS): tape corners (`.tape`), tile overlay gradient, price-list dotted leader, hero mist gradients. Everything else is native styling.

## Assets
`assets/img/` – 61 resized photos (max 1400px, JPG q80) + logo. `assets/video/` – 3 MP4s + poster frames.
Upload to the Media Library and convert to WebP (e.g. via ShortPixel/Imagify) before launch.

## Items to confirm with the client (placed in the design, not verified)
1. **10-year guarantee** – from the mockup; the live site makes no guarantee claim. Get written terms.
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
