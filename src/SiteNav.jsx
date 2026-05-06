import React from "react";
import { Link } from "react-router-dom";

const ITEMS = [
  { to: "/#about", label: "Research" },
  { to: "/#news", label: "News" },
  { to: "/#experience", label: "Experience" },
  { to: "/#papers", label: "Papers" },
  { to: "/blog", label: "Blog" },
  { to: "/#talks", label: "Talks" }
];

export function SiteNav({ theme = "dark" }) {
  return (
    <nav
      className={`top-nav${theme === "light" ? " top-nav--light" : ""}`}
      aria-label="Primary"
    >
      {ITEMS.map((item) => (
        <Link key={item.label} to={item.to}>
          {item.label}
        </Link>
      ))}
      <a href="/wei_zhang___CV_research.pdf" target="_blank" rel="noreferrer">
        CV
      </a>
    </nav>
  );
}
