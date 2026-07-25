import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import articlesData from "./articles.json";
import "./styles.css";

const articles = articlesData.filter((article) => article.collection === "智神AI");

function useRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/home");
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return route;
}

function Header({ active }) {
  return <header className="site-header">
    <a className="logo" href="#/home" aria-label="智神 Pallas AI 首页"><span>智神</span><small>PALLAS AI</small></a>
    <nav><a className={active === "home" ? "active" : ""} href="#/home">首页</a><a className={active === "blog" ? "active" : ""} href="#/blog">战略笔记</a></nav>
    <a className="header-cta" href="mailto:mail@finikz.com">预约诊断 <span>↗</span></a>
  </header>;
}

function Footer() {
  return <footer className="footer"><div><strong>智神 Pallas AI</strong><span>AI STRATEGY / BUSINESS JUDGMENT</span></div><p>不教你追工具，先帮你判断哪一段业务值得重写。</p><a href="mailto:mail@finikz.com">mail@finikz.com ↗</a></footer>;
}

function Home() {
  const latest = articles[0];
  return <div className="page"><Header active="home" /><main>
    <section className="hero">
      <div className="hero-stamp">PALLAS<br /><b>AI</b><br />STRATEGY</div>
      <p className="label">企业 AI 战略顾问 / AI 落地筛选器</p>
      <h1>先看你的业务，<br /><em>再谈 AI。</em></h1>
      <p className="hero-lede">智神帮助已经意识到 AI 重要的企业主，找到真正值得开始的那一段业务流程——从销售获客开始，把模糊的焦虑变成可判断、可执行的下一步。</p>
      <div className="hero-bottom"><span>01 — 业务诊断</span><span>02 — 落地筛选</span><span>03 — 战略重构</span></div>
    </section>
    <section className="principles section-grid">
      <div className="section-heading"><span className="index">/ 01</span><h2>不是再教你<br /><em>一个工具。</em></h2></div>
      <div className="principles-copy"><p className="lead">AI 的问题，通常不是“不会用”，而是“不知道从哪里开始”。</p><p>智神不做泛泛的工具教程，也不把每个新模型都包装成增长机会。我们从企业真实的业务流程出发，判断哪里值得被重新设计，哪里只需要被看清楚。</p><p>投融资视角、政企服务经验、十余年商业运营与跨文化实践，构成我们看 AI 的复合坐标。</p></div>
    </section>
    <section className="services">
      <div className="section-heading"><span className="index">/ 02</span><h2>我们从<br /><em>哪里开始。</em></h2></div>
      <div className="service-list">
        {[['01','业务逻辑诊断','先确认项目是否值得做：需求、竞争力、风险与商业闭环。'],['02','销售获客重构','把 AI 放进最靠近现金流的流程，而不是停在展示和试用。'],['03','组织与流程落地','把被验证的方法沉淀为团队能持续使用的知识与技能。'],['04','跨境与品牌增长','把本土业务放进更大的市场语境，处理内容、渠道与文化差异。']].map(([num,title,copy]) => <article className="service" key={num}><span>{num}</span><div><h3>{title}</h3><p>{copy}</p></div><b>↗</b></article>)}
      </div>
    </section>
    <section className="latest section-grid"><div className="section-heading"><span className="index">/ 03</span><h2>最近在<br /><em>判断什么。</em></h2></div><a className="latest-card" href={`#/blog/${latest.slug}`}><div><span className="label">LATEST NOTE · {latest.date}</span><h3>{latest.title}</h3><p>智神战略笔记：从一条产业新闻，拆开它背后的商业结构。</p></div><span className="read">阅读全文 ↗</span></a></section>
    <section className="contact"><p className="label">如果你已经知道 AI 重要</p><h2>下一步，不是<br /><em>再看一个演示。</em></h2><a href="mailto:mail@finikz.com">预约一次业务诊断　↗</a></section>
  </main><Footer /></div>;
}

function Blog() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => articles.filter((article) => article.title.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="page"><Header active="blog" /><main><section className="blog-hero"><p className="label">PALLAS / STRATEGY NOTES / {articles.length}</p><h1>把新闻拆开，<br /><em>看到生意。</em></h1><p>智神关于 AI 商业、产业竞争、企业流程与增长判断的持续记录。</p></section><section className="blog-list"><div className="blog-tools"><span>{visible.length} 篇战略笔记</span><label>⌕ <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索标题" aria-label="搜索文章标题" /></label></div><div className="article-list">{visible.map((article, index) => <a className="article-row" href={`#/blog/${article.slug}`} key={article.slug}><span>{String(index + 1).padStart(2, "0")}</span><time>{article.date}</time><h2>{article.title}</h2><b>↗</b></a>)}</div></section></main><Footer /></div>;
}

function Article({ slug }) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <Blog />;
  return <div className="page"><Header active="blog" /><main><article className="article"><a className="back" href="#/blog">← 返回战略笔记</a><p className="label">智神 AI 战略 · {article.date}</p><h1>{article.title}</h1><div className="article-body"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ img: ({ src, alt }) => <img src={src?.startsWith("/articles/") ? `.${src}` : src} alt={alt || ""} loading="lazy" /> }}>{article.body}</ReactMarkdown></div><div className="article-end">PALLAS AI<br /><span>从业务判断开始。</span></div></article></main><Footer /></div>;
}

function App() {
  const route = useRoute();
  if (route.startsWith("#/blog/")) return <Article slug={route.slice(7)} />;
  if (route === "#/blog") return <Blog />;
  return <Home />;
}

createRoot(document.getElementById("root")).render(<App />);
