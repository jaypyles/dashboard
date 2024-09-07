import puppeteer from "puppeteer";

(async () => {
  const pages = [
    { name: "./docs/main_page.png", path: "http://localhost:3030" },
    {
      name: "./docs/server_page.png",
      path: "http://localhost:3030/host/optimus",
    },
  ];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "dark" },
  ]);

  for (const p of pages) {
    await page.goto(p.path);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await page.screenshot({ path: p.name });
  }

  await browser.close();
})();
