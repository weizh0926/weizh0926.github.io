# Wei Zhang Homepage (Vite + React)

This site is redesigned as a modern static React application for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content

- Content lives in `content/blogs` and `content/papers` as Markdown with frontmatter.
- Blog posts can set `domain: …` in frontmatter to group them on **`/blog`** (see `content/README.md`).
- Edit files in Git and run `npm run build` to regenerate the site.

The build copies `index.html` to **`404.html`** so client-side routes like `/blog` and `/blog/post/<id>` work on GitHub Pages.

## GitHub Pages

Deploy the generated `dist` folder (or use a GitHub Actions Pages workflow).
