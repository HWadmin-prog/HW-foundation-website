# OpenBMS — Eleventy + Decap CMS setup

Your site is now data-driven. Every article lives as its own file in
`src/articles/*.md`. Add or delete a file (or use the `/admin` screen once
it's set up) and the site rebuilds itself — no more editing raw HTML.

This README is the one-time setup. After this, day-to-day = open `/admin`,
write, publish.

---

## Part 0 — What's in this folder

```
src/
  _includes/head-open.njk   shared <head>, nav, controls (edit once, changes everywhere)
  _includes/footer.njk      shared footer + all page scripts
  styles.css                the one stylesheet, used by every page
  articles/*.md              <- YOUR ARTICLES LIVE HERE. One file each.
  articles.njk               the template that turns each .md into a page
  blog.njk                   the "all articles" listing page (auto-generated)
  index.njk, about.njk, equipment.njk, explorer.njk, shop.njk
  admin/                     the Decap CMS admin screen + its config
.github/workflows/deploy.yml  builds the site & FTP-uploads it to LCN/IONOS
```

---

## Part 1 — Push this to GitHub

```bash
cd openbms
git init
git add .
git commit -m "Initial Eleventy conversion"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/openbms-site.git
git push -u origin main
```

## Part 2 — Set up the login helper (Vercel, free)

Decap CMS needs somewhere to safely exchange a GitHub login for a token. This
is a *separate*, tiny project — it does not host your website, it only
powers the "log in with GitHub" button on `/admin`.

1. **Create a GitHub OAuth App**: GitHub → Settings → Developer settings →
   OAuth Apps → New OAuth App.
   - Homepage URL: `https://YOUR-SITE-DOMAIN`
   - Authorization callback URL: `https://openbms-cms-auth.vercel.app/api/callback`
     (use your actual Vercel URL once you have it — see next step)
   - Save it, note the **Client ID**, generate and note the **Client Secret**.

2. **Deploy the auth helper** (the `openbms-cms-auth` folder provided alongside
   this project):
   ```bash
   cd openbms-cms-auth
   git init && git add . && git commit -m "CMS auth helper"
   git remote add origin https://github.com/YOUR_USERNAME/openbms-cms-auth.git
   git push -u origin main
   ```
   Then on [vercel.com](https://vercel.com) → New Project → import
   `openbms-cms-auth` → in **Environment Variables** add:
   - `GITHUB_CLIENT_ID` = (from step 1)
   - `GITHUB_CLIENT_SECRET` = (from step 1)

   Deploy. Vercel gives you a URL like `https://openbms-cms-auth.vercel.app`.
   Go back to your GitHub OAuth App and make sure the callback URL matches
   that exactly, ending in `/api/callback`.

3. **Point the CMS config at it**: in `src/admin/config.yml`, set:
   ```yaml
   repo: YOUR_USERNAME/openbms-site
   base_url: https://openbms-cms-auth.vercel.app
   ```
   Commit and push.

## Part 3 — Auto-deploy to LCN/IONOS

In your GitHub repo → Settings → Secrets and variables → Actions, add:

- `FTP_SERVER` — your LCN/IONOS FTP hostname
- `FTP_USERNAME` — your FTP username
- `FTP_PASSWORD` — your FTP password

That's it. From now on, every push to `main` (including ones made by the CMS
when you click "Publish") triggers `.github/workflows/deploy.yml`, which
builds the site and uploads the result straight into your LCN/IONOS web root.

## Part 4 — Using it day to day

Visit `yoursite.com/admin`, log in with GitHub, click **New Article**, fill
in the form (title, excerpt, category, tags, body), hit **Publish**. About a
minute later it's live on your real domain. Deleting an article works the
same way from the article list in the admin screen.

---

## Notes

- The 6 shorter articles I migrated (Niagara & JACE, Sedona Framework, etc.)
  currently only carry their excerpt as body text — open each one in
  `src/articles/` (or in `/admin` once it's live) and paste in the full
  article text whenever you have it.
- The "Obsolescence" article was migrated in full.
- `about.html`, `equipment.html`, `explorer.html`, `shop.html` are converted
  to the new template system too (shared nav/footer/stylesheet) but their
  *content* is still one block per page — same idea as before, just cleaner
  and no longer duplicating 500 lines of CSS seven times over. These can be
  turned into their own CMS-editable collections later the same way articles
  were, if useful.
"# HW-foundation-website" 
