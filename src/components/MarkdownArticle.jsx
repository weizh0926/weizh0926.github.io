import React from "react";

/** Minimal Markdown → React for trusted repo-authored posts (headings, lists, bold, links). */
function parseInline(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]*\]\([^)]*\))/g).filter((x) => x !== "");
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]*)\]\(([^)]*)\)$/);
    if (link) {
      const href = link[2];
      const external = /^https?:\/\//i.test(href);
      return (
        <a key={i} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          {link[1]}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function renderBlock(block, idx) {
  const trimmed = block.trim();
  const lines = trimmed.split("\n");
  const first = lines[0];

  if (first.startsWith("### ")) {
    return (
      <h3 key={idx} id={`section-${idx}`}>
        {parseInline(first.slice(4).trim())}
      </h3>
    );
  }
  if (first.startsWith("## ")) {
    return <h2 key={idx}>{parseInline(first.slice(3).trim())}</h2>;
  }
  if (lines.every((l) => !l.trim() || l.trimStart().startsWith("- "))) {
    const items = lines
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => (l.startsWith("- ") ? l.slice(2) : null))
      .filter(Boolean);
    if (items.length) {
      return (
        <ul key={idx}>
          {items.map((item, j) => (
            <li key={j}>{parseInline(item)}</li>
          ))}
        </ul>
      );
    }
  }

  return (
    <p key={idx}>
      {lines.map((line, j) => (
        <React.Fragment key={j}>
          {j > 0 ? <br /> : null}
          {parseInline(line)}
        </React.Fragment>
      ))}
    </p>
  );
}

export function MarkdownArticle({ markdown }) {
  const blocks = markdown.split(/\n\n+/).filter((b) => b.trim());
  return (
    <div className="markdown-post">{blocks.map((block, i) => renderBlock(block, i))}</div>
  );
}
