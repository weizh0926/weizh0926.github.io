const blogModules = import.meta.glob("../content/blogs/*.md", {
  eager: true,
  query: "?raw",
  import: "default"
});
const paperModules = import.meta.glob("../content/papers/*.md", {
  eager: true,
  query: "?raw",
  import: "default"
});

function parseFrontmatter(rawContent) {
  const match = rawContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: rawContent.trim() };
  }

  const [, frontmatterBlock, body] = match;
  const data = frontmatterBlock.split("\n").reduce((acc, line) => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) {
      return acc;
    }
    acc[key.trim()] = rest.join(":").trim().replace(/^"(.*)"$/, "$1");
    return acc;
  }, {});

  return { data, body: body.trim() };
}

function normalizeCollection(modules, type) {
  return Object.entries(modules)
    .map(([path, rawContent]) => {
      const { data, body } = parseFrontmatter(rawContent);
      return {
        id: path.split("/").pop().replace(".md", ""),
        type,
        title: data.title || "Untitled",
        date: data.date || "",
        venue: data.venue || "",
        excerpt: data.excerpt || body.slice(0, 180),
        link: data.link || "",
        authors: data.authors || "",
        tags: (data.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean),
        domain: (data.domain || "").trim(),
        featured:
          data.featured === true ||
          data.featured === "true" ||
          String(data.featured || "").toLowerCase() === "true",
        cta: (data.cta || "").trim(),
        content: body
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogs() {
  return normalizeCollection(blogModules, "blog");
}

export function getBlogById(id) {
  return getBlogs().find((b) => b.id === id) ?? null;
}

export function getPapers() {
  return normalizeCollection(paperModules, "paper");
}
