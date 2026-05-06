---
title: "PageIndex, Mantle, and what enterprise agentic ingestion still owes us"
date: "2026-05-06"
excerpt: "Reasoning-based, vectorless RAG versus multimodal reality—and why chunking may need to become a managed service."
tags: "agents,enterprise,RAG,PageIndex,Mantle,ingestion"
domain: enterprise-ai
featured: true
cta: "PageIndex, Mantle & enterprise ingestion →"
---

[VectifyAI/PageIndex on GitHub](https://github.com/VectifyAI/PageIndex) is an instructive datapoint for anyone shipping **agentic document workflows** inside enterprises. The framing is deliberately orthogonal to dense-vector retrieval: build a **hierarchical tree index** over long documents, then let an LLM **reason over that structure**—closer to how experts skim tables of contents and branch search—rather than relying on embedding similarity alone. Similarity is cheap but brittle on domain-heavy prose; **relevance often wants sequential judgement**.

In practice this lands near **agentic document ingestion** and **slow, deliberate indexing/search**: the model spends cycles traversing structure instead of answering from top‑k chunks. The upside is meaningful—you tend to **miss fewer logically buried passages**, because retrieval is grounded in explicit organizational cues rather than an approximate nearest-neighbour gamble in embedding space. The downside is equally real: **higher latency and higher token cost** every time you traverse or summarise intermediate nodes.

What PageIndex does **not** hand-wave away is the **index construction pipeline upstream**. Once corpora are **multimodal**—CAD-derived sheets, scan-heavy submissions, mixed-resolution drawings—that ingestion stack stops being “nice PDF plumbing” and becomes the project. PageIndex helps answer **where to read** inside material already normalized into something tractable; it doesn’t magically dissolve messy captures into trustworthy representation.

Separately I built **[Mantle](https://askmantle.pelleon.com)** on public data as an experimentation scaffold—a place to wire hierarchical traversal, retrieval choices, and cost knobs together explicitly rather than hiding them behind a single mega-call.

Design tensions surfaced quickly:

- **Fan-out caps.** Limit **maximum branching width per layer**: how many child folders or index branches may expand before pruning or deferring work. Without caps you cheerfully burn the budget on wide exploratory hops.

- **Model stratification.** Use **lighter LLMs for simple branching choices** when fan-out is small or stereotyped, and reserve heavier reasoning—or literal reading steps—for ambiguous forks or passages requiring verbatim ingestion decisions.

Concrete gaps remain:

- **Document-reading policies.** Decide **when** to open bodies versus trusting summaries alone; eventually route among multiple **PDF / OCR ingestion backends** depending on layout severity—engineering notebooks versus flattened scans versus layered CAD prints each punish naive parsers differently.

- **Construction drawing sets.** Large PDFs (easily **100+ pages**) mixing raster drawings with marginal annotation punish naive segmentation; generic uniform chunking will shred semantics unless tuned per artefact class.

Chunking therefore swings back toward centre stage—not “embedding-length partitioning”, but **custom chunk strategies driven by layout cues**. That belongs in a **tool**, likely surfaced API-first.

Hosting **chunking + ingestion QA as a fully managed service** is directionally compelling: enterprises replicate brittle parsers endlessly while correctness regress silently after upstream vendor template tweaks. Centralizing hardened ingestion—with audited versioning—beats scattering notebooks plus brittle YAML scattered across teams.

Net: reasoning-centric retrieval complements—not replaces—the ingestion battlefield enterprises actually bleed on.
