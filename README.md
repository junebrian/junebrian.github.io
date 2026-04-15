# junebrian.github.io

Personal portfolio and photography gallery, built as a static site for [GitHub Pages](https://pages.github.com/).

## Tech stack

- Plain HTML (`index.html`)
- CSS (`styles.css`)
- React 18 and JSX via CDN ([`react`](https://react.dev/), [`react-dom`](https://react.dev/), [`@babel/standalone`](https://babeljs.io/docs/babel-standalone)) — **no build step**

## Project layout

| File / folder | Purpose |
|---------------|---------|
| `index.html` | Entry page; loads styles and `app.js` |
| `app.js` | Portfolio UI, routing (`#/`, `#/photos`), photo gallery |
| `styles.css` | Layout and styling |
| `photos/` | Image files plus the catalogue manifest |
| `photos/photos.json` | List of photos (paths, titles, dates, tags) |

## Local preview

Because the app fetches `photos/photos.json`, use a local server (browser `file://` can block fetches):

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Open `http://localhost:8080` (or the URL your tool prints).

## Adding photos

1. Add image files under `photos/` (e.g. `photos/my-shot.jpg`). Use simple, URL-safe names (lowercase, hyphens; avoid spaces).
2. Edit `photos/photos.json`: add an object per image with a `src` that matches the file path from the site root.

Example:

```json
[
  {
    "src": "./photos/my-shot.jpg",
    "title": "Evening light",
    "date": "2026-04-15",
    "tags": ["city", "golden hour"]
  }
]
```

The Photos page reads this file and shows thumbnails; clicking opens a modal. Search filters by title, date, tags, or part of the `src` string.

More detail: see `photos/README.txt`.

## Deploying (GitHub Pages)

Push this repo to GitHub. For a **username** site (`username.github.io`), publish from the default branch root (or the branch/folder your Pages settings use). After a push, the live site updates within a few minutes.

**Live URL:** [https://junebrian.github.io](https://junebrian.github.io) — portfolio at `/`, gallery at `#/photos` (e.g. `https://junebrian.github.io/#/photos`).

## Troubleshooting

- **Gallery shows “Setup needed”** — `photos/photos.json` is missing, unreachable, or not valid JSON.
- **Broken images** — `src` must match the real filename and path (GitHub Pages paths are case-sensitive).
- **Old images after deploy** — Hard refresh or wait for CDN cache; `loadPhotos()` uses `cache: "no-store"` to reduce stale JSON.
