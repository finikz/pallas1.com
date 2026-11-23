import { englishText } from "./translations.js";

const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const languageSwitch = document.querySelector(".language-switch");
const textNodes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  if (node.data.trim()) textNodes.push({ node, original: node.data });
}

const ariaTranslations = {
  "智神AI 首页": "Pallas AI home",
  "主导航": "Main navigation",
  "智神从行业经验转化为 AI Native 组织能力，并帮助品牌成长的示意图": "How Pallas turns industry experience into AI Native capabilities and brand growth",
  "GEO 服务实施路径": "GEO delivery process",
  "智神历史业务规模": "Pallas project track record",
  "合作品牌与生态伙伴": "Partners and ecosystem",
  "常见问题解答": "Frequently asked questions",
  "智神AI电话、微信与邮箱联系方式": "Contact Pallas AI by phone, WeChat, or email",
  "复制微信号 13751870325": "Copy WeChat ID 13751870325",
  "智神AI 回到顶部": "Pallas AI back to top",
};

const ariaNodes = [...document.querySelectorAll("[aria-label]")].map((element) => ({
  element,
  original: element.getAttribute("aria-label"),
}));

const pageMeta = {
  zh: {
    lang: "zh-CN",
    title: "智神AI｜AI Native · GEO · 品牌出海",
    description: "智神AI依托行业经验，提供 AI Native 组织能力建设、GEO 品牌可见度与获客、品牌出海本地化服务。",
    ogTitle: "智神AI｜AI Native · GEO · 品牌出海",
    ogDescription: "依托行业经验，提供 AI Native 组织能力建设、GEO 品牌可见度与获客、品牌出海本地化服务。",
    url: "https://pallas1.com/",
  },
  en: {
    lang: "en",
    title: "Pallas AI | AI Native · GEO · Brand Globalization",
    description: "Pallas AI builds AI Native organizational capabilities, improves brand visibility in AI search through GEO, and supports localized brand expansion.",
    ogTitle: "Pallas AI | AI Native · GEO · Brand Globalization",
    ogDescription: "Built on industry experience, Pallas AI helps organizations become AI Native, improve brand visibility in AI search, and localize for global markets.",
    url: "https://pallas1.com/?lang=en",
    websiteDescription: "The official Pallas AI website. It leads with GEO customer acquisition and presents AI Native consulting and industry project experience.",
    slogan: "Ideas into action",
    alternateName: ["智神AI", "智神 AI", "Pallas"],
  },
};

const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
const structuredDataZh = structuredDataScript.textContent;
let structuredData = JSON.parse(structuredDataZh);

function graphNode(type) {
  return structuredData["@graph"].find((node) => node["@type"] === type);
}

function applyStructuredData(isEnglish) {
  if (!isEnglish) {
    structuredData = JSON.parse(structuredDataZh);
    structuredDataScript.textContent = structuredDataZh;
    return;
  }

  const metadata = pageMeta.en;
  const organization = graphNode("Organization");
  const website = graphNode("WebSite");
  const page = graphNode("WebPage");
  organization.name = "Pallas AI";
  organization.alternateName = metadata.alternateName;
  organization.description = metadata.description;
  organization.slogan = metadata.slogan;
  if (organization.hasOfferCatalog) {
    organization.hasOfferCatalog.name = "Pallas AI Core Services";
    organization.hasOfferCatalog.itemListElement = [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Native Capability Building",
          "description": "Redesign products, workflows, and organizational structures around AI from strategy to agents."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Generative Engine Optimization (GEO)",
          "description": "Improve brand discoverability and citation frequency in ChatGPT, Perplexity, Gemini and generative AI search."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Brand Globalization & Localization",
          "description": "Adapt brand positioning, multi-language content, and local channels to regional culture and market dynamics."
        }
      }
    ];
  }
  website.name = "Pallas AI";
  website.alternateName = metadata.alternateName;
  website.description = metadata.websiteDescription;
  page.url = metadata.url;
  page.name = metadata.title;
  page.description = metadata.description;
  page.inLanguage = metadata.lang;

  const faq = graphNode("FAQPage");
  if (faq && faq.mainEntity) {
    faq.mainEntity = [
      {
        "@type": "Question",
        "name": "What is the timeline and delivery model for AI Native capabilities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Engagements are phased into three steps: Phase 1 (2–3 weeks) for readiness assessment and blueprint; Phase 2 (4–6 weeks) for knowledge systems and workflow mapping; Phase 3 (4–8 weeks) for agent workflows. Agile, hands-on delivery ensures smooth adoption in real business operations."
        }
      },
      {
        "@type": "Question",
        "name": "How does GEO differ from traditional SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional SEO focuses on search engine keywords and backlinks. GEO (Generative Engine Optimization) ensures generative AI models (ChatGPT, Perplexity, Gemini) understand your brand and cite it as an authoritative source in AI answers, building semantic trust for the AI era."
        }
      },
      {
        "@type": "Question",
        "name": "Which regions and industries are supported for brand globalization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pallas focuses on Southeast Asia (such as Malaysia and Singapore) and Western markets across cross-border business, consumer brands, industrial parks, and creative sectors, delivering cultural adaptation, compliance, and local channel execution."
        }
      },
      {
        "@type": "Question",
        "name": "How do we get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Book a 20-minute diagnostic session with our team. We review current business challenges and AI or market-entry opportunities, delivering tailored recommendations and a practical roadmap within 1 business day."
        }
      }
    ];
  }

  structuredDataScript.textContent = JSON.stringify(structuredData);
}
let activeLanguage = false;

function keepWhitespace(original, replacement) {
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${replacement}${trailing}`;
}

function updateMenuLabel() {
  if (!menuButton) return;
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  const label = activeLanguage
    ? { open: "Open navigation", close: "Close navigation" }
    : { open: "打开导航", close: "关闭导航" };
  menuButton.setAttribute("aria-label", isOpen ? label.close : label.open);
}

function applyLanguage(isEnglish) {
  activeLanguage = isEnglish;
  const metadata = isEnglish ? pageMeta.en : pageMeta.zh;

  document.documentElement.lang = metadata.lang;
  document.title = metadata.title;
  document.querySelector('meta[name="description"]').content = metadata.description;
  document.querySelector('meta[property="og:title"]').content = metadata.ogTitle;
  document.querySelector('meta[property="og:description"]').content = metadata.ogDescription;
  document.querySelector('meta[property="og:url"]').content = metadata.url;
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.content = metadata.ogTitle;
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.content = metadata.ogDescription;
  document.querySelector('link[rel="canonical"]').href = metadata.url;

  for (const { node, original } of textNodes) {
    const translation = isEnglish ? englishText[original.trim()] : null;
    node.data = translation === undefined || translation === null
      ? original
      : keepWhitespace(original, translation);
  }

  for (const { element, original } of ariaNodes) {
    element.setAttribute(
      "aria-label",
      isEnglish ? (ariaTranslations[original] ?? original) : original,
    );
  }

  if (languageSwitch) {
    languageSwitch.href = isEnglish ? "?lang=zh-CN" : "?lang=en";
    languageSwitch.lang = isEnglish ? "zh-CN" : "en";
    languageSwitch.setAttribute("aria-label", isEnglish ? "View the Chinese site" : "切换到英文");
  }

  applyStructuredData(isEnglish);
  updateMenuLabel();
}

if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    primaryNav.classList.toggle("is-open", !isOpen);
    updateMenuLabel();
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
      updateMenuLabel();
    }
  });
}

if (languageSwitch) {
  languageSwitch.addEventListener("click", (event) => {
    event.preventDefault();
    const nextLanguage = activeLanguage ? "zh-CN" : "en";
    const nextUrl = new URL(window.location.href);
    if (nextLanguage === "en") nextUrl.searchParams.set("lang", "en");
    else nextUrl.searchParams.delete("lang");
    window.history.pushState({ language: nextLanguage }, "", nextUrl);
    applyLanguage(nextLanguage === "en");
  });
}

window.addEventListener("popstate", () => {
  applyLanguage(new URLSearchParams(window.location.search).get("lang") === "en");
});

const copyButtons = document.querySelectorAll(".contact-btn-copy");
copyButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const textToCopy = btn.getAttribute("data-copy");
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      const originalText = btn.textContent;
      btn.textContent = activeLanguage ? "Copied!" : "已复制微信号!";
      btn.classList.add("is-copied");
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove("is-copied");
      }, 2000);
    } catch {
      window.prompt("请复制微信号：", textToCopy);
    }
  });
});

applyLanguage(new URLSearchParams(window.location.search).get("lang") === "en");
