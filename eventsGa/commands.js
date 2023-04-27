const { AttachmentBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js")

const memberRole = "288385193285386248"
const guestRole = "615837413117526027"
const grandcounsilRole = "288382736480337920"
const sendToChannelId = "1095836703916314665"
const devRole = "1095126923740463106"
const banChannelId = "1096859455842418788"
const banRoleId = "462611820126142464"
const adminRoleId = "570764875350147092"

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {

        if (interaction.commandName === "gcreate") {

            const modal = new ModalBuilder()
            .setCustomId('giveawayModal')
            .setTitle('Create a Giveaway')

            const giveawayDuration = new TextInputBuilder()
            .setCustomId("giveawayDuration")
            .setLabel('DURATION')
            .setPlaceholder("E.g. 10 m - minutes / 10 h - hours")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const giveawayNumberOfWinners = new TextInputBuilder()
            .setCustomId("giveawayNumberOfWinners")
            .setLabel("Number of Winners")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMinLength(1)
            .setMaxLength(2)

            const giveawayPrize = new TextInputBuilder()
            .setCustomId("giveawayPrize")
            .setLabel("PRIZE")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const giveawayDesc = new TextInputBuilder()
            .setCustomId("giveawayDesc")
            .setLabel("Description")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false)

            const giveawayChannels = new TextInputBuilder()
            .setCustomId("giveawayChannels")
            .setLabel("Giveaway Channel IDs")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

            const firstActionRow = new ActionRowBuilder()
            .addComponents(giveawayDuration)
            const secondActionRow = new ActionRowBuilder()
            .addComponents(giveawayNumberOfWinners)
            const thirdActionRow = new ActionRowBuilder()
            .addComponents(giveawayPrize)
            const fourthActionRow = new ActionRowBuilder()
            .addComponents(giveawayDesc)
            const fifthActionRow = new ActionRowBuilder()
            .addComponents(giveawayChannels)

            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow)

            await interaction.showModal(modal)
        }

    }
}