# Content Folder

This folder stores homepage content as Markdown files:

- `content/blogs`: blog posts
- `content/papers`: paper showcase cards for the homepage

Each file uses frontmatter. Optional **`domain`** files a post under a topic on the `/blog` page:

`foundation-models`, `enterprise-ai` (shown as **AI agents in enterprises**), `construction-agents`, `ecommerce-agents`, `trading-ai`

Optional **`featured: true`** plus **`cta: "Short button label"`** surfaces a primary button on the topics page linking to the full article at **`/blog/post/<filename-without-.md>`**.

Edit in Git, then rebuild the site.
