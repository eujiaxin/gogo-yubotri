const { Client } = require("@notionhq/client");
const { lcScraper } = require("../leetcode/lc_scraper");

require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

async function addItem(link, question, difficulty, isSelf, topics) {
    try {
        const today = new Date();
        const rev1Date = new Date(today.getTime());
        rev1Date.setDate(rev1Date.getDate() + 7);
        const rev2Date = new Date(rev1Date.getTime());
        rev2Date.setDate(rev2Date.getDate() + 7);

        const notionTopics = topics.map((topic) => {
            const topicObject = new Object();
            topicObject.name = topic;
            return topicObject;
        });

        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                Question: {
                    type: "title",
                    title: [
                        {
                            type: "text",
                            text: {
                                content: question,
                            },
                        },
                    ],
                },
                Difficulty: {
                    type: "select",
                    select: {
                        name: difficulty,
                    },
                },
                Link: {
                    url: link,
                },
                Topics: {
                    multi_select: notionTopics,
                },
                isSelf: {
                    type: "select",
                    select: {
                        name: isSelf ? "Y" : "N",
                    },
                },
                Date: {
                    type: "date",
                    date: {
                        start: today.toISOString(),
                    },
                },
                Revision1: {
                    type: "date",
                    date: {
                        start: rev1Date.toISOString(),
                    },
                },
                Revision2: {
                    type: "date",
                    date: {
                        start: rev2Date.toISOString(),
                    },
                },
            },
        });
        console.log(response);
        console.log("Success! Entry added.");
        return response;
    } catch (error) {
        console.error(error.body);
    }
}

const links = [
    "https://leetcode.com/problems/coin-change/",
    "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "https://leetcode.com/problems/two-sum/",
    "https://leetcode.com/problems/trapping-rain-water",
];
const leetCodeToNotion = async (link) => {
    // const leetcodes = await Promise.all(
    //     links.map(async (link) => lcScraper(link))
    // );

    // leetcodes.map((data) => {
    //     addItem(data.question, data.difficulty, false, data.topics);
    // });

    const res = lcScraper(link).then((data) =>
        addItem(link, data.question, data.difficulty, data.isSelf, data.topics)
    );
    return res;
};

const oop = leetCodeToNotion(
    "https://leetcode.com/problems/insert-interval/"
).then((res) => console.log("FINALLY ITS HERE: " + res));
// module.exports = { leetCodeToNotion };
