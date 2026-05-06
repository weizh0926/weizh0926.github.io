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
        <div className="blog-masthead-intro">
          <h1 className="blog-page-title">Blog</h1>
          <p className="blog-page-lede">
            Short notes across areas I work in and watch closely. Posts are Markdown in{" "}
            <code className="inline-code">content/blogs</code>; assign a{" "}
            <code className="inline-code">domain</code> in frontmatter to file a piece under a topic
            below.
          </p>
          <nav className="blog-toc" aria-label="Topics on this page">
            {BLOG_DOMAINS.map((d) => (
              <a key={d.id} href={`#${d.id}`}>
                {d.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="blog-main">
        {BLOG_DOMAINS.map((domain) => {
          const posts = blogs.filter((p) => p.domain === domain.id);
          return (
            <section key={domain.id} id={domain.id} className="section domain-section">
              <header className="section-head">
                <h2 className="section-title">{domain.title}</h2>
                <p className="section-deck">{domain.blurb}</p>
              </header>
              {posts.length === 0 ? (
                <p className="domain-empty">
                  No posts filed under this topic yet. Add one with{" "}
                  <code className="inline-code">domain: {domain.id}</code> in the frontmatter.
                </p>
              ) : (
                <>
                  {posts.length > 0 ? (
                    <div className="card-grid card-grid-blogs">
                      {posts.map((post) => (
                        <article className="blog-card" key={post.id}>
                          <p className="meta">
                            <span>{post.date}</span>
                            {post.tags?.length ? <span>{post.tags.join(" · ")}</span> : null}
                          </p>
                          <h3 className="blog-title">{post.title}</h3>
                          <p className="excerpt">{post.excerpt}</p>
                          <Link className="text-link blog-card-more" to={`/blog/post/${post.id}`}>
                            Read
                          </Link>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </>
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
