# Mr. Cigar Cartagena

Bilingual Next.js App Router website built by Connect Narrative. Default language Spanish. Seven public pages, plus a privacy page, in both Spanish and English.

## Run

Node 22 or later:

```sh
npm ci
npm run dev
```

Open http://localhost:3000/es. English is at /en. Owner dashboard is at /admin.

```sh
npm run build
npm test
npm run typecheck
```

## Vercel

Import https://github.com/connectnarrative/mr-cigar into Vercel as Next.js. Included vercel.json selects the correct build. No environment variables are required for the hospitality website and WhatsApp inquiry handoff.

The deployment attempted in this session did not succeed: Sites new-site quota was exhausted, and Vercel's connected account returned 403 when creating the new project. The intended source repository is https://github.com/connectnarrative/mr-cigar. No deployed URL is claimed.

Keep the review deployment authenticated using Vercel deployment protection. PUBLIC_LAUNCH=false controls indexing only; it does not restrict access. Confirm owner content and obtain the required legal review before public launch.

## Standalone review

The companion Mr-Cigar-Preview.html is a self-contained visual review copy. Download and open it in a browser. Navigation, language switching, gallery and WhatsApp handoff work without a server. It has no CMS or persistent inquiry storage. It is not the deployable application; deploy this Next.js project.

## Dedicated Supabase configuration

No existing project was modified. The connected Money OS database must not be reused for Mr. Cigar.

1. Create/select the owner's dedicated Mr. Cigar Supabase project.
2. Run supabase/schema.sql once in that project. It is an initial bootstrap script, not an applied migration or a tested live database.
3. Invite/create the owner in Supabase Auth. With an administrative SQL connection, insert their actual Auth UUID into mc_admins. Public signup must remain disabled; clients cannot grant themselves administrator status.
4. Add the variables listed in .env.example to Vercel. SUPABASE_SERVICE_ROLE_KEY is server-only. Do not use NEXT_PUBLIC for it.
5. Log in at /admin. Review/edit text in both languages, menu items and prices, gallery descriptions/categories, hero video, contact data and confirmed hours. Upload JPG, PNG, WebP, MP4 or PDF up to 20 MB. Save edits.
6. Submit an inquiry and confirm it appears in the owner dashboard. Verify non-admin users cannot access inquiries or mutate content/storage. These live checks remain outstanding.

Without Supabase keys, inquiry submissions return NOT_CONFIGURED. The interface explicitly prepares a message for the official WhatsApp channel and does not claim the request has been sent. With keys present, success is displayed only after the database confirms the RPC call. Failed storage is never reported as success.

The SQL uses RLS on every public table, owner authorization through a protected mc_admins table, a service-only inquiry RPC, deduplication and per-contact serialization/rate limiting. The service key never reaches the browser. Session tokens stay in React memory and are discarded on sign-out/reload. No analytics or advertising cookies are included.

## Content that still requires the owner

- Actual complete food-and-drink menu, descriptions and prices in COP; optional menu PDF.
- Confirmed hours (public listings conflict between 09:00 and 09:30 opening).
- Founder's history, milestones and authorized team photographs. No invented founder timeline is included.
- Legal entity, data-controller contact and approved privacy text/retention policy.
- Higher-resolution transparent/vector logo for faithful placement over photography. The black fedora cannot be reliably separated from the flattened black background without damaging the artwork. Current logo versions preserve the black background.
- Approval of photos/footage, logo usage, and regulated tobacco/alcohol content before public release.

## SEO

Set NEXT_PUBLIC_SITE_URL to the final canonical HTTPS origin. Set PUBLIC_LAUNCH=true only after launch approval. The application then enables indexing, canonical/hreflang links, localized page metadata, sitemap and local-business structured data. No unverified opening hours, ratings or awards are emitted.

## Verification limits

Next.js production build passed. 34 application/render/validation checks passed. No browser automation was available, so visual QA, swipe/focus behavior in real browsers, Lighthouse/Core Web Vitals, live RLS/auth/storage and end-to-end database delivery remain unverified. See AUDIT.md.
