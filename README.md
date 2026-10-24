# MobileCare Hub — responsive mobile repair & product enquiry website

## Included
- `index.html`: semantic HTML, SEO title/description, Open Graph metadata, canonical URL placeholder and Schema.org Store structured data
- `style.css`: responsive layout for desktop, tablet and mobile
- `script.js`: sample catalogue, product search, category/condition filters, price sorting, interest enquiry form, repair enquiry form and item listing enquiry

## Run locally
Extract the ZIP and open `index.html` in a browser. No build tools are required.

## Required setup before launch
1. In `index.html`, replace `https://example.com/` in the canonical link and JSON-LD with your real domain.
2. In `script.js`, replace `WHATSAPP_NUMBER = "91XXXXXXXXXX"` with your business WhatsApp number using digits only, including country code (India numbers usually start with 91).
3. Replace the sample products, example prices and service details with real listings and accurate information.
4. Add your actual business name, location, opening hours, contact information, privacy policy, terms, returns/refunds policy and repair warranty policy.
5. Test the enquiry forms on a phone and desktop before publishing.
6. Add a sitemap and robots.txt, then verify the domain in Google Search Console after launch.

## Behaviour and limitations
- This is a catalogue and enquiry website, not a full e-commerce checkout.
- No card payments, UPI payment collection, order management or stock sync are implemented.
- In demo mode, if the WhatsApp number is not configured, form submissions download a text file rather than send a message.
- Listings added through the form are sent as an enquiry; they are not published to a shared database.
- For a production site with public seller listings, add a backend/database, admin moderation, authentication, spam protection and server-side validation.
- Use real product photos and original descriptions for stronger trust and SEO. Avoid misleading used/refurbished condition claims. Confirm IMEI status, device ownership, repair quality, compatibility, warranty and price before a transaction.
