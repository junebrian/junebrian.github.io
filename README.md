# Brian Lee — Portfolio & Photo Gallery

Source for my personal site: a **fast, static portfolio** with a **client-side photo catalogue**, deployed on **GitHub Pages** with no separate hosting bill or build pipeline to maintain.

**Live site:** [junebrian.github.io](https://junebrian.github.io) · **Gallery:** [junebrian.github.io/#/photos](https://junebrian.github.io/#/photos)

---

### What this repo shows

- **Modern UI in plain static files** — React 18 used intentionally without a bundler: the same component model I use in larger apps, kept lean for Pages.
- **Thoughtful UX** — hash-based routing between portfolio and gallery, keyboard-friendly photo modal (Escape to close), search across titles, dates, and tags.
- **Easy content updates** — photos are data-driven: add files under `photos/` and entries to `photos/photos.json` so the gallery stays maintainable as the set grows.

### Tech stack

| Layer | Choices |
|--------|--------|
| **Front end** | Semantic HTML, CSS, **React 18** (UMD from CDN), **Babel Standalone** for JSX in the browser |
| **Data** | Static JSON manifest + image assets (no database) |
| **Deploy** | **GitHub Pages** — commit and push; the published site updates from your repo settings |

No `npm install`, no CI job required for deploy: the trade-off is explicit (simplicity and transparency over a compiled bundle).

### Photos

Add images to `photos/`, list them in `photos/photos.json`, commit, and push. Format and examples: `photos/README.txt`.

### Connect

**[LinkedIn](https://www.linkedin.com/in/june-brian-lee/)** · **[GitHub](https://github.com/junebrian)**
