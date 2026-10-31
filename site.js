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
  "智神AI电话与微信联系方式": "Contact Pallas AI by phone or WeChat",
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
  },
};

const structuredData = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
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

  structuredData.name = isEnglish ? "Pallas AI" : "智神AI";
  structuredData.alternateName = isEnglish ? "智神AI" : "Pallas AI";
  structuredData.description = metadata.description;
  structuredData.url = metadata.url;
  document.querySelector('script[type="application/ld+json"]').textContent = JSON.stringify(structuredData);
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

applyLanguage(new URLSearchParams(window.location.search).get("lang") === "en");
