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
  "焦晨栩 | 综合美术（AI向）作品集简历",
  "把美术需求做成",
  "可复用 AI 工作流",
  "实习经历",
  "核心数据",
  "experience-data-grid",
  "莉莉丝科技（上海）有限公司",
  "厦门吉比特网络技术股份有限公司",
  "场景角色图标支持",
  "局部重绘 / 实时绘画",
  "项目支持周期",
  "商业项目的场景、角色与图标美术需求",
  "高清去噪作为协助同事的 ComfyUI 工作流参考补充沉淀",
  "腾讯音乐娱乐集团 - 喜马拉雅",
  "需求判断 / 工具落地 / 项目复用",
  "核心能力与支撑经验",
  "项目主线与补充经历",
  "主线项目",
  "补充项目 / 经历入口",
  "实习经历完整线",
  "莉莉丝 / 吉比特 / 腾讯音乐",
  "三条主线证据 + 补充材料",
  "软边缘 / 半透明抠图工作流",
  "Blender + AI 阴影烘焙流程",
  "公司自研 3D 贴图软件工具链",
  "公共平台工作流上线",
  "辅助证据",
  "2026.03 - 2026.09",
  "6 个月",
  "实习周期",
  "2025.11 - 2026.03",
  "2026.04-08",
  "5 个月",
  "沉淀周期",
  "上线数量",
  "6 类生产场景",
  "复用范围",
  "常规交付",
  "几十到上百张",
  "批量处理",
  "复用反馈",
  "可继续定制",
  "追加定制",
  "跨组咨询记录",
  "PS-AI 插件协作",
  "围绕项目场景、角色、图标需求验证局部重绘与实时绘画能力",
  "LoRA 风格适配",
  "项目组使用反馈（已脱敏）",
  "本地批量运行说明（已脱敏）",
  "带阴影版本效果反馈（已脱敏）",
  "跨组咨询记录（已脱敏）",
  "流程拆解长图（点击可看完整图）",
  "效率反馈（已脱敏）",
  "合并请求记录（已脱敏）",
  "V3 效果展示（已脱敏）",
  "新流程替换旧版（已脱敏）",
  "evidence-pipeline",
  "evidence-psai",
  "evidence-texture-platform",
  "evidence-matting",
  "evidence-shadow",
  "shadow-process",
  "evidence-lora",
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
