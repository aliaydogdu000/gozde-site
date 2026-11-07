# gozde-site

Link-in-bio site for [@gozdeoztuuurk](https://instagram.com/gozdeoztuuurk): link page, media kit, place map and collaboration form.
Plain static HTML/CSS/JS, no build step. All content lives in `data/*.json`.

| Page | Path | Data |
|---|---|---|
| Link page | `/` | `data/site.json` |
| Media kit | `/media-kit/` | `data/stats.json` |
| Place map | `/harita/` | `data/places.json` |
| Collaboration form | `/is-birligi/` | `data/site.json` (`email`, `formEndpoint`) |

## Run locally

```bash
python3 -m http.server 8765
```

Open http://localhost:8765. (Opening the HTML files directly with `file://` will not work because pages `fetch` the JSON.)

## Updating content

- **Profile photo:** save a square image as `assets/avatar.jpg`. Until then the initials are shown.
- **Stats (monthly):** copy numbers from Instagram → Professional dashboard → Insights into `data/stats.json`.
  Set `"sample": false` once the numbers are real; while it is `true` the page shows a "sample data" banner.
  Values are raw numbers (`8400`, not `8,4B`); add `"type": "pct"` for percentages and `"type": "number"` to show the full number.
  Append a new `{ "month": "YYYY-MM", "value": followers }` to `followerHistory` each month.
- **Places:** add objects to `places` in `data/places.json`. `series` must match a series `id`; `categories` should come from the
  `categories` list. To get `lat`/`lng`, right-click the place in Google Maps and click the coordinates to copy them.
  `video` is the Reel URL. Remove the entries whose names start with `ÖRNEK`; the sample banner disappears with them.
- **Google Maps list button:** create a shared list in Google Maps and put its link in `site.json` → `googleMapsList`.
- **Other platforms:** add `{ "type": "tiktok" | "youtube", "label": "...", "url": "..." }` to `site.json` → `socials`
  and a matching block to `stats.json` → `platforms`.

## Collaboration form

With `formEndpoint` empty, "Gönder" opens the visitor's mail app with the message pre-filled to `email`.
To receive submissions without relying on the visitor's mail app, create a free form at a JSON-accepting form service
(e.g. Formspree) and put its endpoint URL in `formEndpoint`.

## Deploy (GitHub Pages)

1. Create a GitHub repo and push this folder.
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
3. Optional custom domain: add a `CNAME` file with the domain and point DNS to GitHub Pages.

All links are relative, so the site also works under `username.github.io/repo/`.
