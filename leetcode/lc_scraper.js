const puppeteer = require("puppeteer");
// const fs = require("fs");
const LINK = "https://leetcode.com/problems/coin-change/";

const lcScraper = async (link, isSelf = false) => {
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

    // const [relatedTopics] = await page.$x('//div[text()="Related Topics"]');
    // await relatedTopics.click();

    // const html = await page.content();
    // fs.writeFileSync("lc-" + questionTitle + ".html", html);

    const relatedTopicsElements = await page.$$("div > a > span");

    const topics = await Promise.all(
        relatedTopicsElements.map((elem) =>
            elem.evaluate((el) => el.textContent)
        )
    );

    await browser.close();

    return {
        question: questionTitle,
        difficulty: difficulty,
        topics: topics,
        link: link,
        isSelf: isSelf,
    };
};

module.exports = { lcScraper };
