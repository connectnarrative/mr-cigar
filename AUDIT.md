# Mr. Cigar audit — 9 October 2026

| Area | Result | Evidence / remaining work |
|---|---|---|
| Production compilation | PASS | Next.js 16.3.4 webpack build; TypeScript checks passed |
| Application checks | PASS | 34 checks passed, 0 failed; npm test |
| Bilingual pages | PASS | All 16 localized public/privacy page renders passed; translated key parity |
| Original logo | PASS | Original JPEG preserved byte-for-byte; web logo cropped/optimized without reconstruction |
| Transparency/vector logo | BLOCKED | Flattened black background and black fedora require an original transparent/vector file |
| Genuine media | PASS | Four venue stills and a muted 15-second excerpt from the uploaded footage; no stock/AI venue imagery |
| Gallery | IMPLEMENTED / PARTIAL QA | Filter, native dialog, keyboard navigation, swipe handlers; real browser validation pending |
| Mobile layout | IMPLEMENTED / UNVERIFIED | Responsive CSS, safe-area contact action, readable typography; device/browser QA pending |
| Inquiry validation | PASS | Consent, dates, contact, bounds, language, oversized details, honeypot and origin tested |
| Inquiry fallback | PASS | Returns 503 NOT_CONFIGURED; UI prepares message and prompts user to send it on WhatsApp |
| Persistence failures | PASS | Mocked storage failure returns 502, never acknowledges success; successful mocked RPC returns 201 |
| Live inquiry storage | BLOCKED | Dedicated Supabase project/environment configuration absent |
| Owner CMS | IMPLEMENTED / UNVERIFIED | Login/role check, text/menu/media/settings editors, inquiry statuses; live configuration and RLS tests pending |
| Menu | BLOCKED CONTENT | Actual full menu and COP prices unavailable; menu request CTA used |
| History/team | BLOCKED CONTENT | No confirmed founder/history/team assets; published page contains hospitality philosophy only |
| Hours | BLOCKED CONTENT | Listings disagree; public UI asks visitor to confirm with the team |
| Contact | PASS RESEARCH | WhatsApp link copied from official bio page; address/phone corroborated by public listings |
| SEO | IMPLEMENTED | Localized metadata, sitemap, robots, canonical/hreflang when final origin configured; noindex by default |
| Accessibility | PARTIAL | Labels, skip link, focus outlines, alt text, reduced-motion handling; browser/screen-reader review pending |
| Performance | PARTIAL | Compressed media, lazy images, self-hosted fonts, mobile static hero; field metrics not measured |
| Privacy/legal | BLOCKED APPROVAL | Basic privacy page exists; owner details, Colombian legal review and regulated visuals review needed |
| Sites deployment | BLOCKED | New Site Hosting usage limit reached |
| Vercel deployment | BLOCKED | Connected account denied project creation (403); CLI unavailable |
| GitHub sync | PASS | All application source, assets and setup files uploaded to connectnarrative/mr-cigar main |
| Public launch | NOT READY | Content, live CMS verification, legal approval, browser QA and hosting remain outstanding |

## Research provenance

- Official bio page: https://bio.site/Mrcigarcartagena — the WhatsApp and Reserve links both target https://wa.me/message/UEP3NURACXYAA1.
- Tripadvisor public business description: https://www.tripadvisor.co/Restaurant_Review-g297476-d23605150-Reviews-Mr_Cigar-Cartagena_Cartagena_District_Bolivar_Department.html — gastrobar, food/drinks and listed phone. No third-party photos copied.
- Waze: https://www.waze.com/es/live-map/directions/co/bolivar/cartagena-de-indias/mr.-cigar-habano-or-tabaco-or-puros-or-cigarshop?to=place.ChIJEYntr-ov9o4R3uBziGXGYtY — corroborates address/phone and lists 09:30 opening, while Tripadvisor lists 09:00. Neither treated as owner-approved hours.
- Instagram, Facebook and TikTok were inaccessible during research. Their photographs, founder biographies and menu data were not pretended to be retrieved.
- Supabase Auth/REST documentation and changelog reviewed. SQL not applied to any live project.

## Uploaded media provenance

- PHOTO-2026-10-09-17-21-30.jpg → original logo plus cropped optimized logo and favicon. Original retained unchanged.
- VIDEO-2026-10-09-16-42-23.mp4 → lounge-red/lounge-detail frames and 48–63 second muted excerpt.
- VIDEO-2026-10-09-16-42-23(1).mp4 → bar/interior frames.
- Photographs are extracted video frames, not high-resolution photography. Real venue photography will improve large-screen sharpness.

The standalone review copy is functional for viewing and WhatsApp handoff. It is not proof of browser QA or live persistence.

## Brand content refresh (draft)

The user selected DchX5qPNtO- as the replacement hero, DZNgwh5nJzZ and DZSfxgeic9x as editorial features, and Dcl9gEQCu8d / DUq46B6kq6t as native gallery sources. Instagram returned error pages through both public post and embed endpoints. None of these assets has been retrieved or misrepresented as integrated. See media-plan.json.

Draft changes add a full-brand page and homepage sections covering identity, craft, gastronomy, people and Cartagena. Native gallery video and additional categories are supported without Instagram embeds or profile cards. The prior media is retained in the draft until original files arrive; the requested visual replacement is still incomplete.
