const { SlashCommandBuilder } = require("discord.js");
const { lcScraper } = require("../leetcode/lc_scraper");

// data - command definition
// execute - method that contains event handler functionality
module.exports = {
    data: new SlashCommandBuilder()
        .setName("go2lc")
        .setDescription("Update notion (Go2LeetCode) with leetcode link input")
        .addStringOption((option) =>
            option
                .setName("link")
                .setDescription("The leetcode question link")
                .setRequired(true)
        ),
    async execute(interaction) {
        const linkInput =
            interaction.options.getString("link") ?? "No link provided";
        // const lcQuestion = await lcScraper(linkInput).then(
        //     (data) => data.difficulty + +" " + data.question
        // );

        await interaction.reply(linkInput);
    },
};
