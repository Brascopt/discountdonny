# Discount Donny — Site Guide

## What you have
A simple 4-file website — no build tools, no framework, nothing to install.

```
discountdonny/
├── index.html        (page structure — rarely needs edits)
├── css/styles.css     (all visual styling)
├── js/script.js       (loads deals.json and renders cards — you won't need to touch this)
└── data/deals.json    (your deals — THIS is the file you edit)
```

## Adding or editing a deal
Open `data/deals.json` in any text editor (Notepad, TextEdit, VS Code, or even
GitHub's web editor). Copy one block and change the values:

```json
{
  "id": "7",
  "title": "Product name",
  "store": "Where it's sold",
  "category": "Electronics",
  "price": "$19.99",
  "wasPrice": "$39.99",
  "discount": "50% off",
  "description": "One or two sentences about why it's a good deal.",
  "link": "https://your-affiliate-link.com/",
  "featured": false,
  "dateAdded": "2026-08-02"
}
```

Notes:
- `id` just needs to be unique — bump it up by one each time.
- `category` can be anything; new categories automatically get their own filter button.
- Set `featured: true` to give a deal the gold "Donny's Pick" stamp and bump it to the top.
- Delete a deal by deleting its whole `{ ... }` block. Don't forget commas between blocks.
- Save the file, redeploy (see below), and it's live.

## Deploying to Cloudflare Pages (no coding required)

You said you want this on Cloudflare, and your domain is already there — here's the
easiest path: **Direct Upload**, no GitHub required.

### First-time setup
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In the left sidebar, click **Workers & Pages**.
3. Click **Create application** → **Pages** → **Upload assets** (this is Cloudflare's Direct Upload option).
4. Name the project — e.g. `discountdonny`. Click **Create project**.
5. Drag the whole `discountdonny` folder (or a zipped version of it) onto the upload
   area. Cloudflare needs `index.html` at the top level of what you upload — don't
   upload a parent folder that contains the site folder inside it.
6. Click **Deploy site**. You'll get a live test URL like `discountdonny.pages.dev`.

### Connect your domain
1. Inside your new Pages project, go to **Custom domains**.
2. Click **Set up a domain**, type `discountdonny.com` (and `www.discountdonny.com`
   if you want both), and follow the prompts. Since the domain's DNS is already on
   Cloudflare, this is usually a one-click confirmation — no manual DNS records needed.
2. Give it a few minutes to propagate, then visit discountdonny.com.

### Making updates after launch (e.g. adding new deals)
Since you used Direct Upload rather than connecting a GitHub repo, updating means
re-uploading the folder each time:
1. Edit `data/deals.json` locally.
2. Go back to your Pages project → **Create a new deployment**.
3. Drag the updated folder in again, deploy.

This takes under a minute once you're used to it. If down the road you want deals to
go live the instant you save the file (no manual re-upload), the next step up is
connecting the project to a GitHub repository instead of Direct Upload — happy to
walk you through that later if you want it, but it's not necessary to get started.

## Editing the look
- Colors, fonts, and spacing all live in `css/styles.css` — the `:root` block at the
  top holds every color as one named variable, so changing `--deal-red` for example
  updates it everywhere at once.
- The site pulls two Google Fonts (Archivo Black for headlines, Inter for body text,
  IBM Plex Mono for prices) via a `<link>` in `index.html`.

## Affiliate links
Each deal's `link` field is where your affiliate URL goes. The footer already
includes an FTC-style affiliate disclosure — keep that in place; it's required
when you earn commissions from links you share.
