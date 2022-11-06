const { SlashCommandBuilder } = require("discord.js");
const { leetCodeToNotion } = require("../notion/notion");

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
        )
        .addBooleanOption((option) =>
            option
                .setName("solved")
                .setDescription(
                    "Solved for the first time? (default set to False)"
                )
        ),
    async execute(interaction) {
        const linkInput =
            interaction.options.getString("link") ?? "No link provided";

        await interaction.reply("Updating notion for " + linkInput + " ...");
        const result = await leetCodeToNotion(linkInput);
        console.log("RESULT: " + result);
        await interaction.followUp({
            content: "Created new notion page!!",
        });
    },
};
