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
  "AI 与出海智能就绪度自测": "AI and globalization readiness assessment",
  "就绪度评估问卷": "Readiness assessment questionnaire",
  "所属行业与业务形态": "Industry and business model",
  "当前最迫切的增长挑战": "Primary growth challenge",
  "现有数字化与AI沉淀现状": "Current digital and AI foundation",
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

  const webApp = graphNode("WebApplication");
  if (webApp) {
    webApp.name = isEnglish ? "Pallas AI Readiness Diagnostic Tool" : "智神AI 智能就绪度自测工具";
    webApp.description = isEnglish
      ? "3-step interactive assessment to generate tailored AI Native, GEO, and globalization strategies."
      : "3步快速评估业务场景，获取定制化 AI Native、GEO 与出海本地化诊断建议与实施优先级。";
  }

  structuredDataScript.textContent = JSON.stringify(structuredData);
}
let activeLanguage = false;

const diagnosticProfiles = {
  geo: {
    physical: {
      zh: {
        title: "实体资产语义化 + GEO 品牌权威占位",
        match: "96%",
        focus: "将线下沉淀的运营指标与租客口碑，转化为大语言模型易于检索的行业权威结构化事实与第三方信源证明。",
        roadmap: [
          "<strong>01 / 知识资产解构：</strong>梳理过往标杆项目运营数据与资质，生成标准语义实体与知识库。",
          "<strong>02 / GEO 全渠道布局：</strong>在主流 AI 搜索与知识权威站点完成权重布设，锁定高意图租客与合作线索。"
        ],
      },
      en: {
        title: "Physical Asset Structuring & GEO Authority Sourcing",
        match: "96%",
        focus: "Convert offline operational metrics and tenant track records into verifiable facts and trusted citations for LLM search engines.",
        roadmap: [
          "<strong>01 / Domain Knowledge Structuring:</strong> Audit flagship project data and build machine-readable semantic entities.",
          "<strong>02 / Cross-Platform GEO Sourcing:</strong> Seed high-authority citations across AI search networks to capture intent-driven leads."
        ],
      }
    },
    consumer: {
      zh: {
        title: "消费品牌意图搜索占位 + GEO 全域引荐",
        match: "97%",
        focus: "在大模型多轮问答推荐与意图搜索中建立首选推荐位，通过垂直信源交叉验证抢占高意图购买转化。",
        roadmap: [
          "<strong>01 / 意图关键词语义渗透：</strong>针对核心品类决策问答，构建权威信源并对齐大模型训练集偏好。",
          "<strong>02 / 动态信源与口碑闭环：</strong>联动高质量垂直媒体与评测知识库，实现 AI 搜索端高转化问答占位。"
        ],
      },
      en: {
        title: "Consumer Intent Search Sourcing & GEO Referral",
        match: "97%",
        focus: "Secure top-tier recommendation status in AI conversational search through cross-verified vertical authority citations.",
        roadmap: [
          "<strong>01 / Intent Sourcing Alignment:</strong> Position brand proof across trusted sources tailored to LLM evaluation patterns.",
          "<strong>02 / Authority Loop & Conversion:</strong> Integrate review systems and niche knowledge hubs to drive high-intent inquiries."
        ],
      }
    },
    enterprise: {
      zh: {
        title: "B2B 决策心智渗透 + 垂直权威信源 GEO 方案",
        match: "98%",
        focus: "沉淀行业深度白皮书与技术标准实体，确保大模型在解答企业级决策咨询时将品牌作为标杆案例引用。",
        roadmap: [
          "<strong>01 / 权威知识实体搭建：</strong>将专业技术与交付案例转化为结构化白皮书与知识图谱实体。",
          "<strong>02 / 行业高权重节点布设：</strong>覆盖 B2B 决策者重度参考的权威知识库与行业媒体信源。"
        ],
      },
      en: {
        title: "B2B Decision Sourcing & Vertical GEO Authority",
        match: "98%",
        focus: "Publish technical authority standards and white papers to become the benchmark case cited by enterprise LLMs.",
        roadmap: [
          "<strong>01 / Knowledge Entity Blueprint:</strong> Translate technical patents and case studies into machine-readable knowledge graphs.",
          "<strong>02 / High-Weight Node Seeding:</strong> Establish citations on trusted enterprise platforms consult by decision-makers."
        ],
      }
    }
  },
  native: {
    physical: {
      zh: {
        title: "空间运营智能体 + 产业知识资产数字化方案",
        match: "95%",
        focus: "重构招商研判、租户服务与运营报表流程，将多年线下经验固化为可随时调用的场景智能体。",
        roadmap: [
          "<strong>01 / 运营流程现状诊断：</strong>梳理招商、租约与客户协同中的低效断点，输出端到端 AI Native 蓝图。",
          "<strong>02 / 场景智能体协作交付：</strong>上线招商研判智能体与租务问答系统，显著压降跨部门沟通成本。"
        ],
      },
      en: {
        title: "Spatial Operations Agents & Domain Knowledge Hub",
        match: "95%",
        focus: "Automate leasing diagnostics, tenant workflows, and reporting by codifying offline experience into custom AI agents.",
        roadmap: [
          "<strong>01 / Operational Bottleneck Audit:</strong> Map leasing and property management workflows to define AI Native blueprint.",
          "<strong>02 / Agent Workflow Deployment:</strong> Roll out specialized copilot agents for leasing research and tenant services."
        ],
      }
    },
    consumer: {
      zh: {
        title: "敏捷营销工作流 + 跨渠道知识中枢方案",
        match: "96%",
        focus: "以 AI 赋能跨平台多语种内容产出、受众情绪分析与私域转化，实现内容生产力数十倍跃迁。",
        roadmap: [
          "<strong>01 / 品牌内容知识库沉淀：</strong>规范品牌声调、产品优势与合规词库，构建统一营销中枢。",
          "<strong>02 / 敏捷人机内容工作流：</strong>赋能营销团队协同产出多形态社媒内容，快速捕获流量增量。"
        ],
      },
      en: {
        title: "Agile Marketing Workflows & Unified Knowledge Hub",
        match: "96%",
        focus: "Empower marketing with AI-driven multilingual content, sentiment analysis, and community conversion.",
        roadmap: [
          "<strong>01 / Brand Knowledge Base:</strong> Unify brand tone, product specifications, and compliance rules into one hub.",
          "<strong>02 / Agile Collaborative Workflows:</strong> Equip creators with copilot tools to multiply multichannel social output."
        ],
      }
    },
    enterprise: {
      zh: {
        title: "专有业务知识库 (RAG) + 专家协作智能体方案",
        match: "97%",
        focus: "解构资深专家的非结构化经验，构建企业级专有知识检索库与伴随式协同交付工作流。",
        roadmap: [
          "<strong>01 / 隐性经验显性化：</strong>对技术文档、方案模板与历史答疑进行语义分块与高精度向量封装。",
          "<strong>02 / 专家协同智能体落地：</strong>让每位员工拥有领域专家级知识助手，新人上手与交付提速 70%。"
        ],
      },
      en: {
        title: "Enterprise RAG Knowledge Base & Expert Agent Hub",
        match: "97%",
        focus: "Codify tacit senior expertise into enterprise RAG systems and agile copilot workflows.",
        roadmap: [
          "<strong>01 / Tacit Knowledge Extraction:</strong> Chunk and vectorize internal documents, solution decks, and FAQs.",
          "<strong>02 / Expert Copilot Delivery:</strong> Empower every team member with a specialized domain assistant."
        ],
      }
    }
  },
  global: {
    physical: {
      zh: {
        title: "跨区域产业文化适配 + 全球招商信源设计",
        match: "95%",
        focus: "针对海外投资者与跨境入驻企业，建立符合国际商务审美的品牌叙事与权威多语种数字呈现。",
        roadmap: [
          "<strong>01 / 国际商务叙事重塑：</strong>按海外受众逻辑重构园区价值主张与政策红利解读。",
          "<strong>02 / 跨境信任信源搭建：</strong>建立面向全球大模型与国际经贸平台的权威数字名片。"
        ],
      },
      en: {
        title: "Cross-Border Asset Adaptation & Global Sourcing",
        match: "95%",
        focus: "Craft international narratives and multilingual authority profiles for overseas investors and cross-border tenants.",
        roadmap: [
          "<strong>01 / International Value Narrative:</strong> Restructure park positioning to match global commercial investment logic.",
          "<strong>02 / Global Digital Trust Assets:</strong> Seed verified company profiles across international trade platforms and LLMs."
        ],
      }
    },
    consumer: {
      zh: {
        title: "品牌出海信任设计 + 多语种创作者生态方案",
        match: "99%",
        focus: "超越直译，深入东南亚或欧美本地文化生活场景，联合本土创作者与规范化广告表达构建真正信任。",
        roadmap: [
          "<strong>01 / 本地文化场景对齐：</strong>梳理目标市场文化代码与数字合规底线，重构产品审美沟通方式。",
          "<strong>02 / 分语种创作者生态联动：</strong>联合本土创作者矩阵进行真实生活方式种草，建立可持续口碑。"
        ],
      },
      en: {
        title: "Global Trust Design & Multilingual Creator Network",
        match: "99%",
        focus: "Move beyond translation into cultural lifestyle alignment, local creator networks, and digital compliance.",
        roadmap: [
          "<strong>01 / Cultural Code Alignment:</strong> Audit regional cultural taboos and ad laws to adapt brand positioning.",
          "<strong>02 / Native Creator Partnerships:</strong> Collaborate with local creators to craft genuine word-of-mouth trust."
        ],
      }
    },
    enterprise: {
      zh: {
        title: "海外市场合规治理 + 跨文化专业品牌塑造",
        match: "96%",
        focus: "精准对齐当地数字监管政策（如数据安全、透明度与广告规范），建立可持续拓展的国际化专业品牌。",
        roadmap: [
          "<strong>01 / 政策与合规风险排查：</strong>对齐目标地区法案（如数字公平、透明度要求），筑牢信任底线。",
          "<strong>02 / 本地化权威信誉体系：</strong>在海外权威行业机构与商业平台建立合规、可靠的专业形象。"
        ],
      },
      en: {
        title: "Global Compliance Governance & Cross-Cultural Trust",
        match: "96%",
        focus: "Align with local consumer and digital regulations to build a sustainable, trusted international presence.",
        roadmap: [
          "<strong>01 / Regulatory Risk Screening:</strong> Audit against regional consumer laws and digital fairness guidelines.",
          "<strong>02 / Localized Authority Building:</strong> Secure verified presence on recognized international trade platforms."
        ],
      }
    }
  }
};

let currentAssessment = {
  industry: "physical",
  goal: "geo",
  status: "unstructured",
};

function updateAssessmentDisplay(isEnglish) {
  const { goal, industry } = currentAssessment;
  const profile = diagnosticProfiles[goal]?.[industry] || diagnosticProfiles.geo.physical;
  const data = isEnglish ? profile.en : profile.zh;

  const resultTitle = document.getElementById("result-title");
  const resultMatch = document.getElementById("result-match");
  const resultFocus = document.getElementById("result-focus");
  const resultRoadmap = document.getElementById("result-roadmap");
  const bannerPlanTitle = document.getElementById("banner-plan-title");
  const bannerPlanMatch = document.getElementById("banner-plan-match");

  if (resultTitle) resultTitle.textContent = data.title;
  if (resultMatch) resultMatch.textContent = data.match;
  if (resultFocus) resultFocus.textContent = data.focus;
  if (resultRoadmap) {
    resultRoadmap.innerHTML = data.roadmap.map((item) => `<li>${item}</li>`).join("");
  }
  if (bannerPlanTitle) bannerPlanTitle.textContent = data.title;
  if (bannerPlanMatch) bannerPlanMatch.textContent = data.match;
  const bannerPlanPrefix = document.querySelector(".banner-plan-prefix");
  const bannerPlanMatchLabel = document.querySelector(".banner-plan-match-label");
  if (bannerPlanPrefix) bannerPlanPrefix.textContent = isEnglish ? "Linked Diagnostic Blueprint: " : "已关联诊断方案：";
  if (bannerPlanMatchLabel) bannerPlanMatchLabel.textContent = isEnglish ? "Match " : "契合度 ";
}

function initAssessmentWidget() {
  const options = document.querySelectorAll(".assessment-option");
  if (!options.length) return;

  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.getAttribute("data-group");
      const val = btn.getAttribute("data-value");
      if (!group || !val) return;

      currentAssessment[group] = val;

      document.querySelectorAll(`.assessment-option[data-group="${group}"]`).forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-checked", "true");

      updateAssessmentDisplay(activeLanguage);
    });
  });

  const applyBtn = document.getElementById("assessment-apply-btn");
  const banner = document.getElementById("contact-diagnostic-banner");
  if (applyBtn && banner) {
    applyBtn.addEventListener("click", () => {
      banner.hidden = false;
      banner.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}

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
  updateAssessmentDisplay(isEnglish);
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

initAssessmentWidget();
applyLanguage(new URLSearchParams(window.location.search).get("lang") === "en");
