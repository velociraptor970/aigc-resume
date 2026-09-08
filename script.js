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
    title: "软边缘 / 半透明抠图工作流",
    copy: "面向动画序列、毛发和半透明素材的批量抠图需求，沉淀透明层次保留、边缘校色和本地批量运行规范。",
    keywords: "软边缘抠图、半透明抠图、毛发、Alpha 过渡、动画素材、长期稳定",
    proof: "批量运行说明、项目反馈截图、跨组咨询记录、带阴影版本反馈",
  },
  tooling: {
    title: "PS-AI 功能方向协作",
    copy: "围绕项目场景、角色、图标需求验证局部重绘与实时绘画能力，沉淀提示词文案和 ComfyUI 接入经验，并将局部重绘经验迁移到现公司协作。",
    keywords: "PS-AI、局部重绘、实时绘画、提示词文案、ComfyUI 工作流参考",
    proof: "插件演示截图、功能反馈记录、局部重绘案例、去噪补充工作流",
  },
  jbt: {
    title: "吉比特外露展示",
    copy: "对外可讲的两块内容：AI×美宣的执行链路，以及 LoRA 对道具 / 场景训练集的思路和结果。",
    keywords: "AI×美宣、LoRA 训练、道具 / 场景、风格控制、结果反馈",
    proof: "吉比特外露长图、AI×美宣页面、LoRA 训练页面",
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
  if (!video || video.dataset.posterAutoCaptured === "1") return;

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
