const { SlashCommandBuilder } = require("discord.js");

// data - command definition
// execute - method that contains event handler functionality
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};
