# Vastraa Royale — Founder-Mode Launch Pack (Enquiry-Only)
Brand: **Vastraa Royale** | Alts: Riwaaz Luxe, The Saree Set Co. | Domain: vastraaroyale.com (+ .in)
Model: ONLINE ONLY, ENQUIRY-ONLY. No payment gateway. No shipping. No returns yet.

## 1. Brand Strategy & Naming
- 20 names considered (shortlist): Vastraa Royale, Riwaaz Luxe, The Saree Set Co., Rajvastra, Vastraa House, Saree Darbar, Rani Set Co., Heritage Drape Co., Vastraa & Co., Royale Drape, Saree Rajwada, Vastraa Muse, Rivaaz Royale, Saree Ensemble, Drape Royale, Vastraa Tales, Royal Pallu Co., Saree Trousseau Co., Vastraa Atelier, Rajsi Drape.
- Final: **Vastraa Royale** — easy to spell, premium, no religious/regional claim.
- 10 taglines (top 3): 1. "A complete royal look, honestly priced." 2. "Saree. Blouse. Footwear. Sorted." 3. "Heritage look, without the guessing."
- Colours: Maroon #4A0E18, Gold #C9A227, Ivory #FFF8F0, Cream #FAF3E8, Ink #1A1A1A.
- Fonts: Playfair Display (headings) + Inter (body). Logo direction: wordmark, gold on maroon, no copied motifs. Check ipindia.gov.in before printing.
- Voice DO: modern, elegant, honest, "enquiry-only", "indicative price". DON'T: "pure silk", "handwoven", "guaranteed delivery", fake urgency, fake reviews.
- Personas: (a) Bride 26-32, wants complete set, fears tailor delays. (b) Giftee buyer any gender 28-45, wants safe premium gift. (c) Festive self-buyer 30-50, wants no-hassle ensemble.
- USP vs Ekaya/Tilfi/Raw Mango/Kankatala: they sell sarees; we validate a 3-piece *set* with consultation before inventory.
- Pricing (validation): indicative ₹8,000–₹12,000/set. No checkout until stock + GST + policies live.

## 2. Sitemap & Copy (all pages built in /app)
Home, About, Collection (direction only), FAQ, Shipping ("enquiry-only, details after consultation"), Returns ("no orders yet, policy before first sale"), Privacy (DPDP/GDPR), Terms (no order created), Contact, Community, Thank-You.
- SEO titles: "Vastraa Royale — Premium Saree Sets | Enquiry-Only Launch" etc. (see app/page.tsx metadata).
- Keywords: premium saree set, saree with blouse and footwear, royal saree look, enquiry saree boutique, festive saree set India.
- CTA everywhere: "Enquire Now — No Payment".

## 3. Lead Form Spec (implemented: components/LeadForm.tsx)
- Required: Name (2–80), WhatsApp (10-digit, +91 tolerated), Consent checkbox.
- Optional: City (≤60), Occasion (Wedding/Festive/Gifting/Daily Elegance/Other), Budget (4 bands).
- Honeypot field `website` (hidden). Client rate-limit 15s + server 5/min/IP.
- Consent text: "I agree to be contacted by Vastraa Royale on WhatsApp/SMS/email about this enquiry, and I accept the Privacy Policy. I understand this is an enquiry-only list — no order or payment is taken."
- Error states inline; success → /thank-you + WhatsApp CTA.

## 4. Airtable Schema
Base: `Vastraa Royale`. Table: `Leads`.
| Field | Type |
| Name | Single line text |
| WhatsApp | Phone |
| City | Single line text |
| Occasion | Single select (Wedding, Festive, Gifting, Daily Elegance, Other) |
| Budget | Single select (₹8-10k, ₹10-12k, ₹12k+, Exploring) |
| Consent | Checkbox |
| Source | Single line text (default "Website") |
| CreatedAt | Date (ISO) |
Views: All, Hot (Budget≠Exploring + Occasion filled), Today (CreatedAt=today), By City (group City), By Occasion (group Occasion).
Table `Daily Metrics`: Date, LeadCount, TopCity, TopOccasion, Notes. Formula conversion: `Converted/Total` added post-sale only.
Automations (see airtable-automations.json): new-lead email/WhatsApp alert, daily 9PM digest, thank-you message hook.

## 5. Live Interest Counter (implemented)
- GET /api/interest-count → counts Airtable records (pageSize 100, up to 500, revalidate 60s, Cache-Control s-maxage=60).
- Frontend InterestCounter.tsx: shows "{count}+ people are interested…" or honest fallback "Be among the first…" when count=null. Never invents numbers.

## 6. Next.js + Vercel Code (this repo)
Structure:
```
app/page.tsx, layout.tsx, globals.css
app/about|collection|faq|shipping|returns|privacy|terms|contact|community|thank-you/page.tsx
app/api/lead/route.ts, app/api/interest-count/route.ts
components/LeadForm.tsx, InterestCounter.tsx
.env.example, .env.local, next.config.js, tsconfig.json, package.json
```
Security: AIRTABLE_TOKEN/BASE_ID server-only (no NEXT_PUBLIC). Only NEXT_PUBLIC_WHATSAPP_LINK + SITE_URL exposed. Validation on client + server. Logging via console (wire Sentry later).
Deploy: push to GitHub → Vercel → add 4 env vars → add domain.

## 7. QA & Bug Plan
Manual: mobile (360px), tablet (768px), desktop (1280px) × Chrome/Safari/Firefox/Edge. Test: empty submit, bad phone, no consent, honeypot, 6 rapid submits (429), Airtable write, counter refresh after 60s, WhatsApp link target=_blank.
Lighthouse targets: Perf >90, A11y >90, SEO >90 (static pages, no heavy JS, system fonts + 1 display font).
Playwright: see qa/form.spec.ts (create before launch).
Sentry: add @sentry/nextjs only after first deploy if errors occur.
Rollback: Vercel Deployments → Promote previous production deployment.

## 8. Risk Register & Compliance
| # | Risk | L/I | Mitigation |
| 1 | Taking money early | M/H | No gateway; no-payment disclaimer on hero, form, footer |
| 2 | Fake fabric claims | M/H | Ban "pure/handwoven" without cert; Collection page wording fixed |
| 3 | Copyright photos | H/H | Own phone photos or licensed + proof file |
| 4 | Delivery promises | M/H | "No dates promised" on Shipping/FAQ/Terms |
| 5 | Fake address/name | L/H | Use real proprietor name/city; placeholders clearly marked [Your…] |
| 6 | No consent | M/H | Required checkbox + Privacy page + STOP opt-out |
| 7 | Trademark clash | L/M | Search ipindia.gov.in before logo print |
| 8 | GST confusion | L/M | Register only at ₹20L threshold (goods, most states); CA consult before first sale |
| 9 | Influencer non-disclosure | L/M | #ad/#gifted if ever used |
| 10 | Chargeback/fraud | L/H | Impossible — no payments taken |
DPDP/GDPR wording in Privacy + form. Copyright checklist: EXIF/proof folder, license PDFs, no Google/Pinterest saves.

## 9. Launch Checklist (Tomorrow)
Morning (build 3h): claim domain, create Airtable base+PAT, create WhatsApp group, replace 4 env values, replace [Your Real Name/City] in layout+privacy+contact, add own/licensed hero image (optional).
Afternoon (test 2h): npm run dev → submit test lead → check Airtable → test counter → Lighthouse → 4 browsers quick pass.
Evening (deploy 1h): git push → Vercel import → env vars → vercel --prod → add domain → test prod form once.
Must-have: form writes, consent, disclaimers, WhatsApp link works. Nice-have: custom images, Sentry, Pinterest pins.

## 10. Marketing & WhatsApp Plan
IG (5): 1. "We're validating, not selling (yet)." 2. Set direction flat-lay. 3. "What should we stock first? Vote." 4. Founder note: why enquiry-only. 5. FAQ carousel. All CTAs → link in bio (site #enquire). No price promises, no "sale".
Pinterest (10 pins): "maroon saree set styling", "ivory gold saree look", etc. — link to /collection. Use only own/licensed images.
WhatsApp welcome (paste in group desc): "Welcome to Vastraa Royale (enquiry-only) 👑 Saree+blouse+footwear. No orders/payments yet. Reply STOP to opt out."
14-day calendar: Wk1 validation polls; Wk2 styling tips + city-wise demand updates. Meta/Google ads objective: Leads/Traffic to #enquire — never Purchase.

## 11. Ops SOP (ONLY after demand proven, e.g. 200+ real enquiries)
Sourcing → blouse stitching partner → footwear sizing → QC checklist (stain, fall, pico, blouse fit) → packaging (trademark-cleared box) → shipper contract → publish Shipping/Returns → GST invoice flow → support scripts ("Where is my order?" only valid post-sale). Do not order inventory before this gate.

## 12. Daily Report & Bug Tracker
Daily report: Date, New leads, Total, Top city, Top occasion, Top budget, WhatsApp joins, Site errors, Notes. Source: Airtable "Daily Metrics" + 9PM automation.
Bug tracker fields: ID, Date, Page, Browser/Device, Steps, Expected, Actual, Severity (P0-blocked launch / P1-form broken / P2-visual / P3-copy), Status, Fix deploy URL.

---
Placeholders YOU must replace: AIRTABLE_TOKEN, AIRTABLE_BASE_ID, NEXT_PUBLIC_WHATSAPP_LINK, [Your Real Name], [City, State], domain DNS. Nothing else is fake.
