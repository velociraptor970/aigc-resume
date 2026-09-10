const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const scriptPath = path.join(root, "script.js");
const assetsPath = path.join(root, "assets");

const index = fs.readFileSync(indexPath, "utf8");
const script = fs.readFileSync(scriptPath, "utf8");

const requiredCopy = [
  "焦晨栩 | 游戏 AI 美术 / 综合美术（AI向）作品集",
  "把 AI 接进游戏",
  "美术生产流程",
  "实习经历",
  "核心数据",
  "experience-data-grid",
  "莉莉丝科技（上海）有限公司",
  "厦门吉比特网络技术股份有限公司",
  "角色、场景、图标、道具",
  "AI 美术方案",
  "项目支持周期",
  "围绕游戏项目 AI 美术生产",
  "LoRA / Kontext 训练集验证",
  "腾讯音乐娱乐集团 - 喜马拉雅",
  "游戏 AI 美术 / 工具链 / 2D+3D 资产",
  "三条主线项目",
  "主线项目",
  "补充案例入口",
  "完整实习经历",
  "Blender × Photoshop",
  "3D 贴图工具链",
  "AI 2D 资产处理",
  "岗位相关证据",
  "ComfyUI 工作流沉淀与复用",
  "AI 美术流程与 PS-AI 协作",
  "2026.03 - 2026.09",
  "6 个月",
  "实习周期",
  "2025.11 - 2026.03",
  "2026.04-08",
  "5 个月",
  "沉淀周期",
  "上线数量",
  "7 类",
  "角色 / 场景 / 道具",
  "常规交付",
  "近千次",
  "平台复用",
  "LoRA",
  "结果对比",
  "AI 美术案例",
  "LoRA 训练案例",
  "evidence-pipeline",
  "evidence-texture-platform",
  "evidence-matting",
  "evidence-shadow",
  "evidence-jbt",
];

for (const text of requiredCopy) {
  if (!index.includes(text) && !script.includes(text)) {
    throw new Error(`Missing required copy: ${text}`);
  }
}

const forbiddenCopy = [
  "Game AIGC / AI TA",
  "AI TA 候选人",
  "这个 JD",
  "最能对应 JD",
  "我会把自己表述为",
  "2026.03 - 至今",
  "4 个月",
  "我应该怎么说",
  "我的优势不是",
  "不是把自己包装",
  "面试关键词",
  "可展示证据",
  "七天冲刺",
  "我要学",
  "入引擎验收",
  "卡牌项目",
  "成熟卡牌",
  "X3 大地图",
  "W3 大地图",
  "大地图深度烘焙",
  "PBR 材质知识点总结",
  "AI 的自言自语",
  "自言自语",
  "作弊",
  "用于面试现场补充验证",
  "面试官",
  "证明你",
  "可展示证据",
  "我会把自己",
  "使用人数",
  "调用次数",
  "使用占比",
  "后台数据",
  "使用量",
  "参与 PS-AI 插件能力验证与项目视觉实验，沉淀局部重绘、高清去噪、提示词文案和 ComfyUI 工作流接入方案",
  "局部重绘 / 去噪",
];

for (const text of forbiddenCopy) {
  if (index.includes(text) || script.includes(text)) {
    throw new Error(`Forbidden copy is still present: ${text}`);
  }
}

new vm.Script(script, { filename: "script.js" });

const assetStat = fs.statSync(assetsPath);
if (!assetStat.isDirectory()) {
  throw new Error("assets must be a directory");
}

const requiredAssets = [
  "hero-portrait.png",
  "wechat-qr.png",
  "shadow-process-long.png",
  "evidence-shadow-feedback.png",
  "evidence-matting-praise.png",
  "evidence-matting-batch-doc.png",
  "evidence-matting-shadow-feedback.png",
  "evidence-matting-consult.png",
  "evidence-pipeline-feedback.png",
  "evidence-workflow-useful-feedback.png",
  "evidence-pipeline-doc.png",
  "evidence-psai-denoise-feedback.png",
  "evidence-psai-repaint-feedback.png",
  "evidence-texture-platform-merge-request.png",
  "evidence-texture-platform-v3-preview.png",
  "evidence-texture-platform-replace-workflow.png",
  "demo-matting-soft-edge-poster.jpg",
  "demo-matting-soft-edge.mp4",
  "demo-shadow-blender-layer-poster.jpg",
  "demo-shadow-blender-layer.mp4",
  "demo-shadow-ps-layer-poster.jpg",
  "demo-shadow-ps-layer.mp4",
];

for (const fileName of requiredAssets) {
  const filePath = path.join(assetsPath, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing asset: ${fileName}`);
  }
  if (fs.statSync(filePath).size < 1024) {
    throw new Error(`Asset too small: ${fileName}`);
  }
}

if (fs.existsSync(path.join(assetsPath, "resume-preview.png"))) {
  throw new Error("Old resume asset should be removed: resume-preview.png");
}

console.log("content checks passed");
