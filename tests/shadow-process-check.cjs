const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
    args: ["--disable-gpu", "--no-sandbox", "--disable-extensions", "--no-first-run"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });

  await page.goto("file:///C:/Users/jiaochenxu/Desktop/aigc-resume-edit/index.html#shadow-process", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(450);

  const card = page.locator("#shadow-process");
  await card.screenshot({
    path: "C:/Users/jiaochenxu/Desktop/aigc-resume-edit/tests/shadow-process-compact-check.png",
  });

  const metrics = await card.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    const img = el.querySelector(".evidence-shot-long img").getBoundingClientRect();
    return {
      cardWidth: Math.round(rect.width),
      cardHeight: Math.round(rect.height),
      imageWidth: Math.round(img.width),
      imageHeight: Math.round(img.height),
    };
  });

  console.log(JSON.stringify(metrics));
  await browser.close();
})();
