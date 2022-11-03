const puppeteer = require("puppeteer");

const LINK = "https://leetcode.com/problems/coin-change/";

const lcScraper = async (link) => {
    // set up browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(link);

    // wait for page to fully load
    await page.waitForSelector(".css-v3d350");

    // get required data from page
    const questionTitle = await page.$eval(
        ".css-v3d350",
        (el) => el.textContent
    );
    const difficulty = await page.$eval(
        ".css-10o4wqw > div",
        (el) => el.textContent
    );

    // TODO: scrape related topics (require clicking)
    const relatedTopics = null;
    await browser.close();

    return {
        question: questionTitle,
        difficulty: difficulty,
        link: link,
    };
};

export default lcScraper;
