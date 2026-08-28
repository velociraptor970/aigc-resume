const body = document.body;

const themeDetails = {
  pipeline: {
    title: "公共平台工作流上线",
    copy: "2026.04-08 持续沉淀 10+ 个项目定制工作流，覆盖图标、角色、道具、抠图、阴影、贴图等 6 类生产场景。",
    keywords: "5 个月、10+ 工作流、6 类生产场景、多组复用、项目反馈",
    proof: "公共平台截图、工作流交付反馈、管线文档截图、跨组咨询记录、项目使用反馈",
  },
  asset: {
    title: "LoRA 风格适配支持",
    copy: "围绕项目画风需求整理参考、数据处理、训练/微调、批次生成和反馈记录。",
    keywords: "LoRA 训练、风格适配、角色/图标/道具、参考整理、结果对比",
    proof: "工作流截图、风格参考、生成批次对比、项目反馈记录",
  },
  pbr: {
    title: "Blender + AI 阴影烘焙流程",
    copy: "利用项目已有 Blender 场景文件输出 AO、接触阴影和空间层次，再整理成 Photoshop 可编辑图层。",
    keywords: "Blender、AO、接触阴影、PSD 图层、外框收紧、约 1 天交付",
    proof: "流程长图、PS 工具截图、PSD 层级、交付反馈截图",
  },
  engine: {
    title: "软 / 硬边缘抠图工作流",
    copy: "面向动画序列、毛发和半透明素材的批量抠图需求，拆分硬边轮廓与软边透明层次，沉淀边缘校色与本地批量运行规范。",
    keywords: "软边缘抠图、硬边缘抠图、毛发、半透明边缘、动画素材、长期稳定",
    proof: "批量运行说明、项目反馈截图、跨组咨询记录、带阴影版本反馈",
  },
  tooling: {
    title: "PS-AI 功能方向协作",
    copy: "沉淀 PS-AI 插件中的局部重绘、高清去噪、提示词文案与 ComfyUI 接入经验，并在现公司协作中提供功能参考。",
    keywords: "PS-AI、局部重绘、高清去噪、提示词文案、ComfyUI 工作流参考",
    proof: "插件演示截图、功能反馈记录、局部重绘与去噪案例",
  },
  "texture-platform": {
    title: "公司自研 3D 贴图软件工具链",
    copy: "接手公司自研 3D 贴图软件的贴图绘制链路，重构双图材质编辑、局部重绘、贴图保存、输出回写和平台调用路径。",
    keywords: "自研 3D 贴图软件、贴图绘制、双图材质编辑、局部重绘、云端 ComfyUI、已上线",
    proof: "合并请求记录、版本效果展示、工作流替换沟通截图",
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

document.querySelectorAll("[data-evidence-target]").forEach((item) => {
  const jumpToEvidence = () => {
    const target = document.querySelector(item.dataset.evidenceTarget);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  item.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;
    jumpToEvidence();
  });

  item.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    jumpToEvidence();
  });
});

document.querySelectorAll(".evidence-shot img").forEach((image) => {
  if (image.closest("a")) return;

  const link = document.createElement("a");
  link.href = image.getAttribute("src");
  link.target = "_blank";
  link.rel = "noopener";
  link.className = "evidence-image-link";
  link.setAttribute("aria-label", `${image.alt || "证据截图"}，打开原图`);

  image.replaceWith(link);
  link.appendChild(image);
});

window.addEventListener("load", () => {
  body.classList.add("page-ready");
});
