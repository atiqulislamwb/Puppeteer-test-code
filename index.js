const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.google.com");

  const keyword = "puppeteer";
  const searchSelector = "textarea.gLFyf";

  await page.waitForSelector(searchSelector);

  await page.type(searchSelector, keyword);

  await page.keyboard.press("Enter");

  await page.waitForSelector("div#search");

  const results = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("h3"));
    return anchors.map((anchor) => anchor.innerText);
  });

  console.log("Search Results:", results);

  // Close the browser
  await browser.close();
})();
