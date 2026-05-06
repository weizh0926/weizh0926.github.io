import React from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../contentLoader";
import { BLOG_DOMAINS } from "../blogDomains";
import { SiteNav } from "../SiteNav";

const blogs = getBlogs();

function BlogPage() {
  return (
    <div className="page blog-layout" id="top">
      <header className="blog-masthead">
        <div className="blog-masthead-bar">
          <Link className="wordmark wordmark--light-bg" to="/">
            WZ
          </Link>
          <SiteNav theme="light" />
        </div>
        <div className="blog-masthead-grid">
          <div className="blog-masthead-intro">
            <h1 className="blog-page-title">Blog</h1>
            <p className="blog-page-lede">
              Notes on research and applied AI, grouped by topic. New posts live as Markdown under{" "}
              <code className="inline-code">content/blogs</code>.
            </p>
          </div>
          <nav className="blog-toc" aria-label="Topics on this page">
            <span className="blog-toc-heading">On this page</span>
            <ul className="blog-toc-list">
              {BLOG_DOMAINS.map((d) => (
                <li key={d.id}>
                  <a href={`#${d.id}`}>{d.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="blog-main">
        {BLOG_DOMAINS.map((domain) => {
          const posts = blogs.filter((p) => p.domain === domain.id);
          return (
            <section key={domain.id} id={domain.id} className="blog-topic">
              <header className="blog-topic-head">
                <h2 className="blog-topic-title">{domain.title}</h2>
                <p className="blog-topic-deck">{domain.blurb}</p>
              </header>
              {posts.length === 0 ? (
                <p className="domain-empty">
                  Nothing here yet. Use{" "}
                  <code className="inline-code">domain: {domain.id}</code> in the post frontmatter.
                </p>
              ) : (
                <div className="card-grid card-grid-blogs card-grid-blogs--blog-page">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      className="blog-card blog-card--tile"
                      to={`/blog/post/${post.id}`}
                    >
                      <div className="blog-card-body">
                        <p className="meta">
                          <span>{post.date}</span>
                          {post.tags?.length ? <span>{post.tags.join(" · ")}</span> : null}
                        </p>
                        <h3 className="blog-title">{post.title}</h3>
                        <p className="excerpt">{post.excerpt}</p>
                      </div>
                      <div className="blog-card-hover" aria-hidden="true">
                        <span className="blog-card-hover-text">Read more</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </main>

      <footer className="site-footer">
        <p>
          <Link to="/">Home</Link>
          <span className="footer-sep">·</span>
          <span className="footer-name">Wei Zhang</span>
          <span className="footer-name-zh" lang="zh-Hans">
            张巍
          </span>
        </p>
      </footer>
    </div>
  );
}

export default BlogPage;
