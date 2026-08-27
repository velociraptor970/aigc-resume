const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const assetsDir = path.join(root, "assets");
const processShot = path.join(assetsDir, "evidence-shadow-process-source.png");
const feedbackShot = path.join(assetsDir, "evidence-shadow-feedback.png");
const outputPath = path.join(assetsDir, "shadow-process-long.png");

function imageData(filePath) {
  const ext = path.extname(filePath).toLowerCase().replace(".", "") || "png";
  return `data:image/${ext};base64,${fs.readFileSync(filePath).toString("base64")}`;
}

async function main() {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #f7f4ff;
      font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", Arial, sans-serif;
      color: #111111;
    }
    .poster {
      width: 1200px;
      min-height: 1840px;
      padding: 72px;
      background:
        linear-gradient(115deg, rgba(143, 120, 255, 0.18), transparent 34%),
        linear-gradient(145deg, transparent 45%, rgba(255, 119, 164, 0.16)),
        linear-gradient(0deg, rgba(94, 205, 255, 0.16), transparent 40%),
        repeating-linear-gradient(90deg, rgba(17, 17, 17, 0.035) 0 1px, transparent 1px 64px),
        repeating-linear-gradient(0deg, rgba(17, 17, 17, 0.035) 0 1px, transparent 1px 64px),
        #fbfbff;
      overflow: hidden;
      position: relative;
    }
    .poster::after {
      content: "";
      position: absolute;
      right: -90px;
      top: 90px;
      width: 360px;
      height: 520px;
      border: 3px solid rgba(138, 105, 255, 0.22);
      border-radius: 70px;
      transform: rotate(-10deg);
    }
    .content { position: relative; z-index: 1; }
    .label {
      display: inline-flex;
      padding: 13px 18px;
      border: 3px solid #111;
      border-radius: 12px;
      background: #111;
      color: #fff;
      box-shadow: 7px 7px 0 rgba(17, 17, 17, 0.16);
      font-size: 20px;
      font-weight: 900;
      letter-spacing: 0;
      text-transform: uppercase;
    }
    h1 {
      width: 760px;
      margin: 38px 0 18px;
      font-size: 78px;
      line-height: 0.98;
      letter-spacing: 0;
    }
    .lead {
      width: 650px;
      margin: 0 0 28px;
      color: #454654;
      font-size: 28px;
      line-height: 1.55;
      font-weight: 700;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 38px;
    }
    .chips span {
      padding: 10px 18px;
      border: 3px solid #111;
      border-radius: 999px;
      background: #fff;
      font-size: 19px;
      font-weight: 900;
      box-shadow: 4px 4px 0 rgba(17, 17, 17, 0.08);
    }
    .judgement {
      position: absolute;
      right: 0;
      top: 168px;
      width: 365px;
      padding: 28px;
      border: 4px solid #111;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 10px 10px 0 rgba(17, 17, 17, 0.14);
    }
    .judgement strong {
      display: block;
      margin-bottom: 12px;
      font-size: 28px;
      line-height: 1.12;
    }
    .judgement p {
      margin: 0;
      color: #3f4050;
      font-size: 21px;
      line-height: 1.62;
      font-weight: 700;
    }
    .step-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
      margin-top: 20px;
    }
    .step {
      min-height: 192px;
      padding: 28px;
      border: 4px solid #111;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.85);
      box-shadow: 8px 8px 0 rgba(17, 17, 17, 0.12);
    }
    .num {
      display: inline-flex;
      min-width: 58px;
      height: 42px;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: #111;
      color: #fff;
      font-size: 22px;
      font-weight: 900;
    }
    .step h2 {
      margin: 26px 0 10px;
      font-size: 34px;
      line-height: 1.15;
    }
    .step p {
      margin: 0;
      color: #4e4f5f;
      font-size: 22px;
      line-height: 1.48;
      font-weight: 700;
    }
    .lane {
      margin-top: 38px;
      padding: 32px;
      border: 4px solid #111;
      border-radius: 22px;
      background: #141419;
      color: #fff;
      box-shadow: 9px 9px 0 rgba(17, 17, 17, 0.16);
    }
    .lane-head {
      display: flex;
      justify-content: space-between;
      gap: 22px;
      margin-bottom: 24px;
      font-size: 24px;
      font-weight: 900;
    }
    .lane-head span:last-child {
      color: #f07aa4;
      font-size: 18px;
      align-self: center;
      text-transform: uppercase;
    }
    .pipeline {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
      align-items: center;
    }
    .pipe-item {
      min-height: 86px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      border: 2px solid rgba(255, 255, 255, 0.34);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      text-align: center;
      font-size: 19px;
      font-weight: 900;
      line-height: 1.32;
    }
    .evidence-row {
      display: grid;
      grid-template-columns: 1.02fr 0.98fr;
      gap: 26px;
      margin-top: 44px;
    }
    .shot-card {
      overflow: hidden;
      border: 4px solid #111;
      border-radius: 20px;
      background: #fff;
      box-shadow: 9px 9px 0 rgba(17, 17, 17, 0.15);
    }
    .shot-head {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      padding: 18px 22px;
      background: #111;
      color: #fff;
      font-size: 20px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .shot-head span:last-child { color: #ff9fbd; }
    .image-box {
      height: 500px;
      background: #f8f8fb;
      overflow: hidden;
    }
    .image-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left top;
      display: block;
    }
    .feedback img {
      object-position: left center;
    }
    .caption {
      padding: 18px 20px 20px;
      color: #454654;
      font-size: 20px;
      line-height: 1.45;
      font-weight: 800;
    }
    .result-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
      margin-top: 40px;
    }
    .result {
      padding: 24px;
      min-height: 122px;
      border: 4px solid #111;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.92);
    }
    .result span {
      display: block;
      margin-bottom: 10px;
      color: #8765ff;
      font-size: 19px;
      font-weight: 900;
    }
    .result strong {
      font-size: 26px;
      line-height: 1.2;
    }
    .note {
      margin-top: 38px;
      padding: 22px 26px;
      border-left: 7px solid #111;
      background: rgba(255, 255, 255, 0.72);
      color: #343542;
      font-size: 23px;
      line-height: 1.55;
      font-weight: 800;
    }
  </style>
</head>
<body>
  <main class="poster">
    <div class="content">
      <span class="label">Shadow Baking Workflow</span>
      <h1>Blender + AI 阴影烘焙流程</h1>
      <p class="lead">从项目需求到可交付 PSD 图层，把空间层次、AO 与阴影关系沉淀成稳定生产流程。</p>
      <div class="chips">
        <span>Blender</span>
        <span>AO</span>
        <span>PSD 图层</span>
        <span>自动匹配</span>
        <span>1 天交付</span>
      </div>

      <section class="judgement">
        <strong>核心判断</strong>
        <p>项目已有 Blender 场景文件时，优先利用真实场景关系烘焙阴影，再转成 Photoshop 与动效可用素材。</p>
      </section>

      <section class="step-grid">
        <article class="step">
          <span class="num">01</span>
          <h2>背景</h2>
          <p>项目需要更稳定的阴影与空间层次，纯算法假阴影难以覆盖复杂遮挡和物体关系。</p>
        </article>
        <article class="step">
          <span class="num">02</span>
          <h2>判断</h2>
          <p>从“继续调参”转向“利用真实 3D 信息”，用 Blender 输出 AO / 阴影，再对齐 2D 主体。</p>
        </article>
        <article class="step">
          <span class="num">03</span>
          <h2>流程</h2>
          <p>烘焙 AO 与阴影层，导出全画幅素材，在 Photoshop 中自动匹配、分组、命名并收紧外框。</p>
        </article>
        <article class="step">
          <span class="num">04</span>
          <h2>结果</h2>
          <p>常规需求约 1 天交付，已投入项目使用，并作为同类阴影需求的流程参考。</p>
        </article>
      </section>

      <section class="lane">
        <div class="lane-head">
          <span>流程拆解</span>
          <span>from requirement to reusable output</span>
        </div>
        <div class="pipeline">
          <div class="pipe-item">接收阴影 / 空间层次需求</div>
          <div class="pipe-item">确认 Blender 场景与主体关系</div>
          <div class="pipe-item">烘焙 AO 与阴影图层</div>
          <div class="pipe-item">PSD 图层整理与命名</div>
          <div class="pipe-item">交付动效 / 美术使用</div>
        </div>
      </section>

      <section class="evidence-row">
        <article class="shot-card">
          <div class="shot-head"><span>过程记录</span><span>Blender / Photoshop</span></div>
          <div class="image-box">
            <img src="${imageData(processShot)}" alt="Blender 与 Photoshop 阴影烘焙流程截图">
          </div>
          <div class="caption">记录图层组织、AO 提取、自动匹配与输出整理方式。</div>
        </article>
        <article class="shot-card feedback">
          <div class="shot-head"><span>项目反馈</span><span>Delivery Feedback</span></div>
          <div class="image-box">
            <img src="${imageData(feedbackShot)}" alt="项目反馈截图">
          </div>
          <div class="caption">用于展示从接到需求到交付的效率与质量反馈。</div>
        </article>
      </section>

      <section class="result-grid">
        <article class="result">
          <span>质量</span>
          <strong>空间关系更稳定</strong>
        </article>
        <article class="result">
          <span>效率</span>
          <strong>常规需求约 1 天</strong>
        </article>
        <article class="result">
          <span>复用</span>
          <strong>沉淀为流程参考</strong>
        </article>
      </section>

      <p class="note">面向项目美术交付：保留真实场景关系、AO 与阴影层次，同时兼顾 Photoshop 图层结构、命名和动效使用习惯。</p>
    </div>
  </main>
</body>
</html>`;

  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1840 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.locator(".poster").screenshot({ path: outputPath });
  await browser.close();
  console.log(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
