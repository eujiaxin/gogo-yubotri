const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

async function addItem(text, isSelf = false) {
    try {
        const today = new Date();
        const rev1Date = new Date(today.getTime());
        rev1Date.setDate(rev1Date.getDate() + 7);
        const rev2Date = new Date(rev1Date.getTime());
        rev2Date.setDate(rev2Date.getDate() + 7);

        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                Question: {
                    type: "title",
                    title: [
                        {
                            type: "text",
                            text: {
                                content: text,
                            },
                        },
                    ],
                },
                Difficulty: {
                    type: "select",
                    select: {
                        name: "Hard",
                    },
                },
                isSelf: {
                    type: "select",
                    select: {
                        name: "N",
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
    } catch (error) {
        console.error(error.body);
    }
}

addItem("LEETCODE X");
