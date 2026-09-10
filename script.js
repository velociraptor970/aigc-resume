const body = document.body;

const themeDetails = {
  pipeline: {
    title: "ComfyUI 工作流沉淀与复用",
    copy: "围绕角色、场景、图标、道具和 2D/3D 资产需求，搭建并上线项目定制工作流，推动流程进入团队复用。",
    keywords: "ComfyUI、10 条工作流、7 类资产、软边缘抠图、近千次复用",
    proof: "公共平台截图、工作流交付反馈、管线文档截图、跨组咨询记录",
  },
  asset: {
    title: "LoRA / Kontext 训练与风格适配",
    copy: "围绕草图转完整稿和游戏资产需求整理训练集，验证结构补全、风格适配、结果对比和泛化表现。",
    keywords: "LoRA、Kontext、训练集、草图转完整稿、结果验证",
    proof: "风格参考、训练集整理、生成批次对比、项目反馈记录",
  },
  pbr: {
    title: "Blender × Photoshop 阴影交付",
    copy: "利用项目已有 Blender 场景输出 AO、接触阴影和空间层次，再整理成 Photoshop 可编辑图层。",
    keywords: "Blender、Photoshop、AO、接触阴影、PSD 图层、约 1 天交付",
    proof: "流程长图、PS 工具截图、PSD 层级、交付反馈截图",
  },
  engine: {
    title: "AI 2D 资产处理",
    copy: "面向角色、毛发、半透明和动画素材，沉淀生成后处理、透明层次保留、边缘校色和批量运行规范。",
    keywords: "AI 2D 资产、角色/毛发、半透明、Alpha 过渡、结果筛选、批量复用",
    proof: "批量运行说明、项目反馈截图、跨组咨询记录、带阴影版本反馈",
  },
  tooling: {
    title: "PS-AI 一体化插件与美术协作",
    copy: "将 ComfyUI 工作流接入 Photoshop，支持实时绘画、单/多图编辑和局部重绘，降低 AI 能力进入美术流程的使用门槛。",
    keywords: "PS-AI、ComfyUI、Photoshop、实时绘画、局部重绘",
    proof: "插件演示截图、功能反馈记录、局部重绘案例、工作流参考",
  },
  jbt: {
    title: "AI 美术流程与 PS-AI 协作",
    copy: "围绕《问道》《权剑传说》的场景、角色和道具需求，参与 PS-AI 插件、实时绘画、局部重绘以及 LoRA / Kontext 训练集验证。",
    keywords: "AI 美术、PS-AI、LoRA、Kontext、《问道》《权剑传说》",
    proof: "AI 美术方案、吉比特长图、LoRA 训练集与结果",
  },
  "texture-platform": {
    title: "3D 贴图工具链流程重构",
    copy: "参与公司自研 3D 贴图软件 V3 迭代，重构双图材质编辑、局部重绘、贴图保存、输出回写和平台调用路径。",
    keywords: "3D 贴图、材质编辑、局部重绘、Blender/PS 协作、平台调用、流程上线",
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

function scorePosterFrame(canvas) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return -1;

  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let sum = 0;
  let sumSq = 0;
  const total = width * height;

  for (let i = 0; i < data.length; i += 4) {
    const luminance = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    sum += luminance;
    sumSq += luminance * luminance;
  }

  const mean = sum / total;
  return sumSq / total - mean * mean;
}

function seekVideo(video, time) {
  return new Promise((resolve, reject) => {
    const onSeeked = () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      resolve();
    };

    const onError = () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      reject(new Error("video error"));
    };

    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener("error", onError, { once: true });
    video.currentTime = time;
  });
}

async function captureVideoPoster(video) {
  if (!video || video.dataset.posterAutoCaptured === "1" || video.dataset.posterLock === "1") return;

  const source = video.currentSrc || video.querySelector("source")?.src || video.getAttribute("src");
  if (!source) return;

  const probe = document.createElement("video");
  probe.preload = "auto";
  probe.muted = true;
  probe.playsInline = true;
  probe.crossOrigin = video.crossOrigin || "anonymous";
  probe.src = source;

  try {
    await new Promise((resolve, reject) => {
      const onLoaded = () => {
        probe.removeEventListener("loadedmetadata", onLoaded);
        probe.removeEventListener("error", onError);
        resolve();
      };
      const onError = () => {
        probe.removeEventListener("loadedmetadata", onLoaded);
        probe.removeEventListener("error", onError);
        reject(new Error("video load failed"));
      };
      probe.addEventListener("loadedmetadata", onLoaded, { once: true });
      probe.addEventListener("error", onError, { once: true });
      probe.load();
    });

    const duration = Number.isFinite(probe.duration) && probe.duration > 0 ? probe.duration : 0;
    const candidateTimes = [0.35, 0.8, 1.2, 1.8, 2.4]
      .map((time) => (duration > 0 ? Math.min(time, Math.max(duration - 0.1, 0.05)) : time))
      .filter((time, index, list) => list.indexOf(time) === index && time >= 0.05);

    let bestDataUrl = "";
    let bestScore = -1;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    for (const candidateTime of candidateTimes) {
      try {
        await seekVideo(probe, candidateTime);
      } catch (error) {
        continue;
      }

      const width = Math.max(320, probe.videoWidth || 0);
      const height = Math.max(180, probe.videoHeight || 0);
      const scale = Math.min(1, 640 / width);
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      context.drawImage(probe, 0, 0, canvas.width, canvas.height);

      const score = scorePosterFrame(canvas);
      if (score > bestScore) {
        bestScore = score;
        bestDataUrl = canvas.toDataURL("image/jpeg", 0.86);
      }
    }

    if (bestDataUrl) {
      video.poster = bestDataUrl;
      video.dataset.posterAutoCaptured = "1";
    }
  } catch (error) {
    console.warn("无法自动生成视频封面：", error);
  }
}

function initVideoPosters() {
  document.querySelectorAll(".evidence-video-shot video").forEach((video) => {
    captureVideoPoster(video);
  });
}

initVideoPosters();

window.addEventListener("load", () => {
  body.classList.add("page-ready");
});
