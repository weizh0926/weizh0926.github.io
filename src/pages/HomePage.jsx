import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getBlogs, getPapers } from "../contentLoader";
import { SiteNav } from "../SiteNav";
import {
  socialLinks,
  researchInterests,
  newsItems,
  experience,
  education,
  talks,
  honors
} from "../siteData";

const papers = getPapers();
const blogs = getBlogs();

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location]);

  return (
    <div className="page" id="top">
      <header className="hero">
        <div className="hero-bar">
          <Link className="wordmark" to="/">
            WZ
          </Link>
          <SiteNav theme="dark" />
        </div>

        <div className="hero-stage">
          <div className="hero-visual">
            <figure className="hero-figure">
              <img
                className="hero-photo"
                src="/portrait.jpg"
                alt="Wei Zhang (张巍)"
                width={320}
                height={296}
              />
              <figcaption className="hero-caption">Boston, MA</figcaption>
            </figure>
          </div>
          <div className="hero-intro">
            <h1 className="hero-name">Wei Zhang</h1>
            <p className="hero-name-zh" lang="zh-Hans">
              张巍
            </p>
            <p className="hero-tagline">AI/ML research and engineering leader</p>
            <p className="hero-copy">
              I build large-scale transformer and LLM systems, production retrieval and ranking, and
              end-to-end ML infrastructure—from data pipelines and training to distributed inference
              on AWS. Former IBM Research; led AI at Material Bank; co-founder at Paladio AI.
            </p>
            <ul className="social-row" aria-label="Contact and profiles">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noreferrer" })}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hero-actions">
              <a className="button button-primary" href="#papers">
                Publications
              </a>
              <a
                className="button button-secondary"
                href="/wei_zhang___CV_research.pdf"
                target="_blank"
                rel="noreferrer"
              >
                CV
              </a>
              <Link className="button button-text" to="/blog">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section id="about" className="section">
          <header className="section-head">
            <h2 className="section-title">Research focus</h2>
            <p className="section-deck">
              Language model pre-training, scaling, efficiency, and alignment—paired with systems that
              ship: semantic search, agents, and interpretable NLP.
            </p>
          </header>
          <div className="section-grid section-grid-about">
            <ul className="tag-list" aria-label="Research interests">
              {researchInterests.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p className="prose">
              I publish and serve on program committees across NLP, ML, and HCI venues. This page
              highlights selected papers and short technical notes; full lists are on{" "}
              <a href="https://scholar.google.com/citations?user=_b4LTZ8AAAAJ&hl=en" target="_blank" rel="noreferrer">
                Google Scholar
              </a>{" "}
              and in my CV.
            </p>
          </div>
        </section>

        <section id="news" className="section">
          <header className="section-head">
            <h2 className="section-title">News</h2>
            <p className="section-deck">Recent highlights.</p>
          </header>
          <ul className="news-list">
            {newsItems.map((item) => (
              <li key={item.date + item.text.slice(0, 24)}>
                <span className="news-date">{item.date}</span>
                <span className="news-body">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="experience" className="section">
          <header className="section-head">
            <h2 className="section-title">Experience</h2>
            <p className="section-deck">Research labs and industry.</p>
          </header>
          <div className="section-split">
            <ol className="timeline">
              {experience.map((job) => (
                <li key={job.org + job.period} className="timeline-item">
                  <div className="timeline-meta">
                    <span className="timeline-period">{job.period}</span>
                    <span className="timeline-location">{job.location}</span>
                  </div>
                  <h3 className="timeline-title">
                    {job.role} — <span className="timeline-org">{job.org}</span>
                  </h3>
                  <ul className="timeline-bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <aside className="education-aside">
              <h3 className="aside-title">Education</h3>
              <ul className="education-list">
                {education.map((e) => (
                  <li key={e.school}>
                    <span className="edu-degree">{e.degree}</span>
                    <span className="edu-meta">
                      {e.school} · {e.year}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section id="papers" className="section">
          <header className="section-head">
            <h2 className="section-title">Selected papers</h2>
            <p className="section-deck">Representative work; links when available.</p>
          </header>
          <div className="card-grid card-grid-papers">
            {papers.map((paper) => (
              <article className="paper-card" key={paper.id}>
                <div className="paper-card-top">
                  <p className="meta">
                    <span>{paper.date}</span>
                    {paper.venue ? <span className="venue-pill">{paper.venue}</span> : null}
                  </p>
                  <h3 className="paper-title">{paper.title}</h3>
                  {paper.authors ? <p className="authors">{paper.authors}</p> : null}
                </div>
                <p className="excerpt">{paper.excerpt}</p>
                {paper.link ? (
                  <a className="text-link" href={paper.link} target="_blank" rel="noreferrer">
                    Paper
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="blogs" className="section">
          <header className="section-head">
            <h2 className="section-title">Blog</h2>
            <p className="section-deck">
              Recent notes.{" "}
              <Link className="text-link" to="/blog">
                Full blog by topic →
              </Link>
            </p>
          </header>
          <div className="card-grid card-grid-blogs">
            {blogs.length === 0 ? (
              <p className="empty-hint">
                No posts yet—add Markdown under <code className="inline-code">content/blogs</code>.
              </p>
            ) : (
              <>
                {blogs
                  .filter((post) => !post.featured)
                  .slice(0, 6)
                  .map((post) => (
                  <article className="blog-card" key={post.id}>
                    <p className="meta">
                      <span>{post.date}</span>
                      {post.tags?.length ? <span>{post.tags.join(" · ")}</span> : null}
                    </p>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="excerpt">{post.excerpt}</p>
                  </article>
                ))}
              </>
            )}
          </div>
        </section>

        <section id="talks" className="section">
          <header className="section-head">
            <h2 className="section-title">Talks &amp; honors</h2>
            <p className="section-deck">Selected talks and awards.</p>
          </header>
          <div className="section-split section-split-talks">
            <ul className="talks-list">
              {talks.map((t) => (
                <li key={t.title}>
                  <a href={t.href} target="_blank" rel="noreferrer">
                    {t.title}
                  </a>
                  <span className="talk-venue">{t.venue}</span>
                </li>
              ))}
            </ul>
            <ul className="honors-list">
              {honors.map((h) => (
                <li key={h.title}>
                  <strong>{h.title}</strong> <span className="honor-year">({h.year})</span> — {h.context}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="site-footer">
          <p>
            <span className="footer-name">Wei Zhang</span>
            <span className="footer-name-zh" lang="zh-Hans">
              张巍
            </span>
            <span className="footer-sep">·</span>
            Boston
            <span className="footer-sep">·</span>
            <a href="mailto:wynnzh@gmail.com">wynnzh@gmail.com</a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
