const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");

const shadowIdIndex = html.indexOf('id="evidence-shadow"');
const shadowStart = html.lastIndexOf("<article", shadowIdIndex);
const shadowEnd = html.indexOf('id="evidence-matting"', shadowStart);

if (shadowIdIndex === -1 || shadowStart === -1 || shadowEnd === -1) {
  throw new Error("shadow evidence card or following matting card not found");
}

const shadowHtml = html.slice(shadowStart, shadowEnd);

if (shadowHtml.includes("evidence-card-wide")) {
  throw new Error("shadow evidence card should stay inside the evidence cluster");
}

const requiredClasses = [
  "shadow-case-points",
  "shadow-feedback-shot",
  "shadow-case-actions",
];

for (const className of requiredClasses) {
  if (!shadowHtml.includes(className)) {
    throw new Error(`missing ${className} in shadow evidence card`);
  }
}

if (shadowHtml.includes("shadow-process-hero") || shadowHtml.includes("shadow-process-long.png")) {
  throw new Error("process map should be in the right stack, not inside the shadow evidence summary");
}

if (shadowHtml.includes("shadow-case-panel") || css.includes(".shadow-case-panel")) {
  throw new Error("old side panel layout should not remain");
}

const feedbackIndex = shadowHtml.indexOf("shadow-feedback-shot");
const actionIndex = shadowHtml.indexOf("shadow-case-actions");

if (!(feedbackIndex < actionIndex)) {
  throw new Error("shadow evidence should show feedback before actions");
}

const clusterIndex = html.indexOf('<div class="evidence-cluster shadow-evidence-cluster">');
const loraIndex = html.indexOf('id="evidence-lora"');
const processIdIndex = html.indexOf('id="shadow-process"');
const processStart = html.lastIndexOf("<article", processIdIndex);
const processEnd = html.indexOf("</article>", processStart);

if (
  clusterIndex === -1 ||
  loraIndex === -1 ||
  processIdIndex === -1 ||
  processStart === -1 ||
  processEnd === -1
) {
  throw new Error("shadow evidence cluster, lora card, or shadow process card not found");
}

if (html.includes('class="evidence-stack"')) {
  throw new Error("shadow evidence should no longer create an empty right stack column");
}

if (!(clusterIndex < processIdIndex && processIdIndex < shadowIdIndex && shadowIdIndex < html.indexOf('id="evidence-matting"') && html.indexOf('id="evidence-matting"') < loraIndex)) {
  throw new Error("shadow evidence cluster should flow as process map, shadow evidence, matting evidence, then lora evidence");
}

const processHtml = html.slice(processStart, processEnd);
if (!processHtml.includes("shadow-process-card") || !processHtml.includes("shadow-process-long.png")) {
  throw new Error("top process card should include the compact shadow process map preview");
}

const cssHooks = [
  ".evidence-cluster",
  ".shadow-evidence-cluster",
  ".shadow-process-copy",
  ".evidence-media-grid",
  ".shadow-process-card",
  ".shadow-case-points",
  ".shadow-feedback-shot",
];

for (const hook of cssHooks) {
  if (!css.includes(hook)) {
    throw new Error(`missing CSS hook: ${hook}`);
  }
}

console.log("shadow layout check passed");
