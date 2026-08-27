const body = document.body;

const themeDetails = {
  pipeline: {
    title: "项目需求转成公共平台可复用工作流",
    copy: "这是最贴综合美术（AI向）JD 的主线：把项目美术需求、风格参考、模型选择、节点参数、输出规范和复用说明组织成团队可以直接使用的 AIGC 美术生产流程。",
    keywords: "项目美术需求、ComfyUI、LoRA、公共平台、10+ 工作流、团队复用",
    proof: "公共平台截图、工作流列表、项目反馈截图、节点截图、生成前后对比；点击项目卡片的“查看证据”可跳到对应证据入口",
  },
  asset: {
    title: "LoRA 训练与项目风格适配支持",
    copy: "根据项目风格、参考图和美术反馈进行 LoRA 训练与效果调试，建立从素材整理、生成批次到结果筛选的风格适配流程，让生成结果更接近项目可用标准。",
    keywords: "LoRA 训练、风格适配、角色/图标/道具、参考图整理、效果筛选",
    proof: "LoRA 工作流截图、风格参考、生成批次对比、项目需求记录",
  },
  pbr: {
    title: "Blender + AI 阴影烘焙流程落地",
    copy: "面向项目美术的阴影与空间层次表现需求，结合 Blender 与 AI 辅助流程处理阴影、AO 和空间层次，让素材表现更稳定，常规需求约 1 天完成。",
    keywords: "Blender + AI 阴影烘焙、AO、空间层次、1 天交付、超越预期",
    proof: "需求记录、烘焙前后对比、PSD/输出文件、组长反馈截图",
  },
  engine: {
    title: "软边缘抠图与硬边缘抠图工作流",
    copy: "软边缘抠图和硬边缘抠图是很强的真实生产痛点：毛发、半透明边缘、动画素材边缘脏、批量处理慢。你的方案已经长期稳定支持抠图动画需求。",
    keywords: "软边缘抠图、硬边缘抠图、毛发、半透明边缘、动画素材、长期稳定",
    proof: "公共平台卡片、抠图前后对比、动画素材案例、项目好评截图",
  },
  tooling: {
    title: "PS-AI 美术工具方向验证与功能规划",
    copy: "结合前公司 PS-AI 插件实践与现阶段项目协作，梳理局部重绘、AI 生图降噪、软/硬边缘抠图等功能方向，并协助工作流接入与效果验证。",
    keywords: "PS-AI、局部重绘、AI 生图降噪、功能规划、真实美术需求",
    proof: "插件演示视频、功能原型、工作流截图、mentor/组长反馈",
  },
  li3d: {
    title: "Li3D 贴图绘制管线重构与上线",
    copy: "接手组内自研 3D 软件的核心贴图绘制流程，对标 Modddiff 类模型上贴图能力，重构 Flux2 Klein TrueV3 双图材质编辑工作流，方案获得好评并已上线。",
    keywords: "Li3D、贴图绘制管线、Modddiff、局部重绘、云端 ComfyUI、已上线",
    proof: "Li3D 页面截图、贴图效果对比、上线版本、组内反馈",
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
