/** Reference: https://hatebin.com/oidieiqlbr **/

const fetch = require("node-fetch");
const lc_data = async (url) => {
    const [link, titleSlug] = url.match(
        /leetcode\.com\/problems\/([\w-]+)/i
    ) ?? [null, null];

    if (!titleSlug) return;

    const query = `query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            questionFrontendId
            title
            content
            difficulty
            similarQuestions
            topicTags {
                name
            }
        }
    }`;

    const { data } = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        body: JSON.stringify({
            operationName: "questionData",
            query,
            variables: {
                titleSlug: titleSlug,
            },
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((r) => r.json());

    const { questionFrontendId, title, difficulty, topicTags } = data.question;
    const name = `${questionFrontendId}. ${title}`;

    return {
        question: name,
        difficulty: difficulty,
        topics: topicTags.map((r) => r.name),
        link: link,
    };
};
module.exports = { lc_data };
