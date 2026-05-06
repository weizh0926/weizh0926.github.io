import React from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogById } from "../contentLoader";
import { SiteNav } from "../SiteNav";
import { MarkdownArticle } from "../components/MarkdownArticle";

function BlogPostPage() {
  const { postId } = useParams();
  const post = postId ? getBlogById(postId) : null;

  return (
    <div className="page blog-layout blog-post-layout" id="top">
      <header className="blog-masthead">
        <div className="blog-masthead-bar">
          <Link className="wordmark wordmark--light-bg" to="/">
            WZ
          </Link>
          <SiteNav theme="light" />
        </div>
        <nav className="blog-post-crumb" aria-label="Breadcrumb">
          <Link to="/blog">Blog</Link>
          <span className="footer-sep" aria-hidden="true">
            /
          </span>
          <span className="blog-post-crumb-current">{post?.title || "Post"}</span>
        </nav>
      </header>

      {!post ? (
        <main className="blog-main">
          <p className="domain-empty">
            This post could not be found.{" "}
            <Link className="text-link" to="/blog">
              Back to topics
            </Link>
            .
          </p>
        </main>
      ) : (
        <article className="blog-post-article">
          <header className="blog-post-header">
            <h1 className="blog-post-h1">{post.title}</h1>
            <p className="blog-post-meta">
              <span>{post.date}</span>
              {post.tags?.length ? <span>{post.tags.join(" · ")}</span> : null}
            </p>
          </header>
          <MarkdownArticle markdown={post.content} />
          <p className="blog-post-footer-nav">
            <Link className="text-link" to="/blog">
              ← All topics
            </Link>
          </p>
        </article>
      )}

      <footer className="site-footer">
        <p>
          <Link to="/">Home</Link>
          <span className="footer-sep">·</span>
          <Link to="/blog">Blog</Link>
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

export default BlogPostPage;
