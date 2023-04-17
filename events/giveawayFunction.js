const { Events, EmbedBuilder, ButtonBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require("discord.js")

const guildId = "288378882418016256"
const memberRole = "288385193285386248"
const guestRole = "615837413117526027"
const grandcounsilRole = "288382736480337920"
const kingsguardRole = "438818482692423683"
const knightRole = "455248257161887754"
const staffRole = "623160704492634112"
const devRole = "1095126923740463106"
const adminRoleId = "570764875350147092"
const testinboxChannelId = "1094636463011930215"
const backupinboxChannelId = "1095111479449092276"
const inboxChannelId = "1095111479449092276"
const giveawayDatabaseID = "1097357158452047952"
const giveawayDatabaseChannelID = "1097358125008429147"

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.customId === "giveawayModal") {

            const dbguild = await interaction.client.guilds.cache.get(giveawayDatabaseID)
            const dbchannel = await interaction.client.channels.cache.get(giveawayDatabaseChannelID)

            const giveawayDuration = interaction.fields.getTextInputValue("giveawayDuration")
            const giveawayNumberOfWinners = interaction.fields.getTextInputValue("giveawayNumberOfWinners")
            const giveawayPrize = interaction.fields.getTextInputValue("giveawayPrize")
            const giveawayDesc = interaction.fields.getTextInputValue("giveawayDesc")

            const dbEmbed = new EmbedBuilder()
            .setTitle("Giveaway Database Created")
            .setFields(
                {
                    name: "Duration",
                    value: `${giveawayDuration}`
                },
                {
                    name: "Number Of Winners",
                    value: `${giveawayNumberOfWinners}`
                },
                {
                    name: "Prize",
                    value: `${giveawayPrize}`
                },
                {
                    name: "Description",
                    value: `${giveawayDesc}`
                },
                {
                    name: "Participants",
                    value: ` `
                }
            )

            const dbmessage = await dbchannel.send({ embeds: [dbEmbed] })

            const giveawayEmbed = new EmbedBuilder()
            .setTitle(`${giveawayPrize}`)
            

            await interaction.reply({ content: "Giveaway Started", ephemeral: true })

            setTimeout(async () => {
                interaction.deleteReply()
            },5000)
        }
    }
}