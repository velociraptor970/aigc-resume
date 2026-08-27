const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const pageUrl = pathToFileURL(path.join(root, "index.html")).href;

async function checkViewport(page, width, height, screenshotName) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ width, height });
  await page.goto(pageUrl, { waitUntil: "load" });
  await page.waitForSelector("#hero-title", { state: "visible" });

  const title = await page.title();
  if (!title.includes("综合美术") || !title.includes("AI向")) {
    throw new Error(`Unexpected title: ${title}`);
  }

  const heroTitle = await page.$eval("#hero-title", (element) => ({
    visible: Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length),
    text: element.textContent.replace(/\s+/g, ""),
  }));
  if (!heroTitle.visible || heroTitle.text !== "把美术需求做成可复用AI工作流") {
    throw new Error(`Hero title is not visible or unexpected: ${heroTitle.text}`);
  }

  const subtitleVisible = await page.$eval(".hero-subtitle", (element) =>
    Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
  );
  if (!subtitleVisible) {
    throw new Error("Hero subtitle is not visible");
  }

  const pageWidth = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  if (pageWidth.scrollWidth > pageWidth.clientWidth + 1) {
    throw new Error(`Horizontal overflow: ${pageWidth.scrollWidth} > ${pageWidth.clientWidth}`);
  }

  if (width >= 1120) {
    const capabilityColumns = await page.$eval(".capability-grid", (element) =>
      getComputedStyle(element).gridTemplateColumns.split(/\s+/).filter(Boolean).length
    );
    if (capabilityColumns !== 3) {
      throw new Error(`Capability grid should be 3 columns, got ${capabilityColumns}`);
    }
  }

  const imageStates = await page.$$eval("img", (images) =>
    images.map((image) => ({
      src: image.getAttribute("src"),
      complete: image.complete,
      width: image.naturalWidth,
      height: image.naturalHeight,
    }))
  );

  for (const image of imageStates) {
    if (!image.complete || image.width < 1 || image.height < 1) {
      throw new Error(`Image failed to load: ${image.src}`);
    }
  }

  if (errors.length) {
    throw new Error(`Browser errors: ${errors.join(" | ")}`);
  }

  await page.screenshot({ path: path.join(__dirname, screenshotName), fullPage: true });
}

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
    args: ["--disable-gpu", "--no-sandbox", "--disable-extensions", "--no-first-run"],
  });

  try {
    const page = await browser.newPage();
    await checkViewport(page, 1440, 900, "desktop-check.png");
    await checkViewport(page, 390, 844, "mobile-check.png");
  } finally {
    await browser.close();
  }

  console.log("visual checks passed");
})();
