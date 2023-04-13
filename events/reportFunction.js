const { Events, EmbedBuilder, ButtonBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField,  } = require("discord.js")
const guildId = "288378882418016256"
const memberRole = "288385193285386248"
const grandcounsilRole = "288382736480337920"
const inboxChannelId = "1095111479449092276"
const devRole = "1095126923740463106"

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.customId === "reportButton") {
            
            const modal = new ModalBuilder()
            .setCustomId("reportModal")
            .setTitle("Are you sure you want to continue")

            const confirmreportQn = new TextInputBuilder()
            .setCustomId("confirmreportQn")
            .setLabel("Would you like to continue with the report?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Yes or No")
            .setRequired(true)

            const firstActionRow = new ActionRowBuilder()
            .addComponents(confirmreportQn)

            modal.addComponents(firstActionRow)

            await interaction.showModal(modal)
        }

        if (interaction.customId === "reportModal") {

            if (interaction.fields.getTextInputValue("confirmreportQn").toLowerCase() !== "yes") {
                interaction.reply({ content: "Operation Cancelled", ephemeral: true })

                setTimeout(async () => {
                    await interaction.deleteReply()
                },5000)

                return
            }

            const channelName = `ticket-report-${interaction.user.username.toLowerCase().replace(/\s+/g, "-")}`
            const catergoryID = "1095833702426230804"
            console.log(`Channel created: ${channelName}`)
            const channelfind = interaction.guild.channels.cache.find((channelfind) => channelfind.name === channelName)

            if (channelfind) {
                interaction.replace({ content: "You already have an existing Report open, please do not try to make another one.", ephemeral: true })

                setTimeout(async () => {
                    await interaction.deleteReply()
                },5000)

                return;
            }

            try {
                
                const channel = await interaction.guild.channels.create({
                    name: channelName,
                    type: 0,
                    parent: catergoryID,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                        },
                        {
                            id: interaction.client.user.id,
                            allow: [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                        },
                        {
                            id: grandcounsilRole,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                        },
                        {
                            id: devRole,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                        }
                    ]
                })

                const embed = new EmbedBuilder()
                .setAuthor({
                    name: interaction.user.username,
                    iconURL: interaction.user.displayAvatarURL()
                })
                .setDescription(`Report ticket made by: ${interaction.user.toString()}\n\nChannel: ${channel}`)
                .setTimestamp()
                .setThumbnail(interaction.user.displayAvatarURL())
                .setColor(0xFF0000)

                const reportEmbed = new EmbedBuilder()
                .setTitle("Report Guidelines")
                .setDescription("Information needed")
                .setColor(0xFF0000)
                .setThumbnail("https://cdn.discordapp.com/icons/288378882418016256/a_4ea65f4ffe0c1f0901d00de60f117abc.webp?size=96")
                .setFields(
                    {
                        name: "Offender",
                        value: "The user/player you want to report"
                    },
                    {
                        name: "Offence",
                        value: "What rule did the offender break, and explain how the offender broke the rule"
                    },
                )



                const inboxChannel = await interaction.client.channels.cache.get(inboxChannelId)
                await inboxChannel.send({ embeds: [embed] })

                await interaction.reply({ content: `Report ticket ${channel} has been created`, ephemeral: true })

                const text = interaction.user.toString() + "\nMake sure your report has the following information:"

                await channel.send({ content: text, embeds: [reportEmbed] })

            } catch (error) {
                console.error(error)
            }
        }
    }
}