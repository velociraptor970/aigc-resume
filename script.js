const body = document.body;

const themeDetails = {
  pipeline: {
    title: "从需求拆解到管线落地",
    copy: "这部分最贴合 JD：研究 AIGC 在游戏研发管线中的应用，并把技术转化为优化生产和体验的实际方案。",
    keywords: "ComfyUI、流程复现、团队复用、生产验证",
    proof: "流程文档、节点截图、输出对比、引擎验证结果",
  },
  asset: {
    title: "从图像生成走向可用 3D 资产",
    copy: "重点不是复刻工具名字，而是解释 3D AI 贴图和角色资产流程里每一步为什么存在、如何检查、如何进入生产。",
    keywords: "图生 3D、多视图、UV、PBR、Blender 验证",
    proof: "角色流程文档、贴图通道对比、材质节点、模型检查截图",
  },
  pbr: {
    title: "让 AI 贴图从好看变得可控",
    copy: "PBR 相关内容可以作为面试补强点：你能说明 Base Color、Roughness、Metallic、Normal、AO 对表现的影响。",
    keywords: "PBR 通道、材质节点、灯光验证、贴图清晰度",
    proof: "PBR 视频总结、材质测试截图、Blender 渲染对比",
  },
  engine: {
    title: "把生成结果放进引擎里说话",
    copy: "AO/Depth、软边缘抠图、透明资源和地图空间感都可以连接到引擎表现，证明你关注最终上线效果。",
    keywords: "AO、Depth、透明边缘、Unity / UE5、性能成本",
    proof: "地图烘焙文档、Depth/AO 输出、引擎内效果验证",
  },
  tooling: {
    title: "把复杂流程变成别人能用的工具",
    copy: "PS-AI 插件和流程说明不是算法难度，而是落地价值：把美术调用门槛降下来，让团队可以稳定复用。",
    keywords: "PS 插件、AI 编程、工作流说明、团队交付",
    proof: "插件交互视频、使用说明、管线截图、复用案例",
  },
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { threshold: [0.35, 0.55, 0.75] }
);

sections.forEach((section) => navObserver.observe(section));

function applyTheme(theme) {
  if (!themeDetails[theme]) return;

  body.dataset.theme = theme;
  document.querySelectorAll("[data-theme-target]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.themeTarget === theme);
  });

  const detail = themeDetails[theme];
  document.querySelector("#detail-title").textContent = detail.title;
  document.querySelector("#detail-copy").textContent = detail.copy;
  document.querySelector("#detail-keywords").textContent = detail.keywords;
  document.querySelector("#detail-proof").textContent = detail.proof;
}

document.querySelectorAll("[data-theme-target]").forEach((item) => {
  item.addEventListener("mouseenter", () => applyTheme(item.dataset.themeTarget));
  item.addEventListener("focusin", () => applyTheme(item.dataset.themeTarget));
  item.addEventListener("click", () => applyTheme(item.dataset.themeTarget));
});

window.addEventListener("load", () => {
  body.classList.add("page-ready");
});