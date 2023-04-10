const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.customId === "teaButton") {
            await interaction.reply({ content: "https://cdn.discordapp.com/attachments/685094231878270993/685094395527168020/tea_logo.png", ephemeral: true})
            await interaction.followUp({ content: "**THE  NORTH** is a certified member of the Trove Ethics Alliance, a network of clubs dedicated to promoting ethics and positivity in the Trove community. You can feel comfortable here knowing that our staff will always be ready to defend the club's members against threats, such as scams, cheating or bullying, and vouch for respect and honesty among all players, contributing to a more positive community.\n\nYou can view all clubs committed to the Trove Ethics Alliance here:\n\nhttps://docs.google.com/spreadsheets/d/1u4GK4vNPwPng7cpuAag3mgTM-Doc1YxmSkoADPu-dTM/", ephemeral: true})
        }
    }
}