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
  "莉莉丝科技（上海）有限公司",
  "厦门吉比特网络技术股份有限公司",
  "腾讯音乐娱乐集团 - 喜马拉雅",
  "三条主讲能力",
  "三个主讲项目",
  "三条主线证据",
  "软 / 硬边缘抠图工作流",
  "Blender + AI 阴影烘焙流程",
  "公司自研 3D 贴图软件工具链",
  "LoRA、PS-AI 与公共平台 10+ 工作流沉淀",
  "公共平台工作流上线与复用数据",
  "2026.04-08",
  "5 个月",
  "使用周期",
  "上线数量",
  "6 类生产场景",
  "复用范围",
  "效率数据",
  "几十到上百张",
  "使用人数",
  "调用次数",
  "使用占比",
  "复用反馈",
  "可继续定制",
  "追加定制需求",
  "跨组咨询记录",
  "PS-AI 插件协作",
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
  "作弊",
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
