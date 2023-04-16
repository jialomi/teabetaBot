const { Events, ModalBuilder, EmbedBuilder, PermissionsBitField, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")

const devRole = "1095126923740463106"
const grandcounsilRole = "288382736480337920"
const banChannelId = "1096859455842418788"
const catergoryID = "1095833702426230804"

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.customId === "appealButton") {

            const modal = new ModalBuilder()
            .setCustomId("appealModal")
            .setTitle("Ban Appeal")

            const banIDinput = new TextInputBuilder()
            .setCustomId("banIDinput")
            .setLabel("Key in your BAN ID here")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const firstActionRow = new ActionRowBuilder()
            .addComponents(banIDinput)

            modal.addComponents(firstActionRow)

            await interaction.showModal(modal)
        }

        if (interaction.customId === "appealModal") {
            const channelName = `ticket-appeal-${interaction.user.username.toLowerCase().replace(/\s+/g, "-")}`
            const banID = interaction.fields.getTextInputValue("banIDinput")
            console.log(banID)

            try {
                const channelfind = await interaction.guild.channels.cache.find((channelfind) => channelfind.name === channelName)

                const banChannel = await interaction.client.channels.cache.get(banChannelId)
                const banMessage = await banChannel.messages.fetch(banID)

                if (channelfind) {
                    interaction.reply({ content: "You already have an existing Appeal Application open, please do not try to make another one.", ephemeral: true })

                    setTimeout(async () => {
                        await interaction.deleteReply()
                    },5000)

                    return;
                }

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

                const message = banMessage.embeds
                const embedMessage = message[0]
                const offender = embedMessage.fields[0].value
                const reason = embedMessage.fields[1].value
                const thumbnail = embedMessage.thumbnail.grandcounsilRole

                const embed = new EmbedBuilder()
                .setTitle(`Ban Appeal for ${interaction.user.username}`)
                .setDescription("__Offender's Info__")
                .setColor(0xFF0000)
                .setThumbnail(thumbnail)
                .setFields(
                    {
                        name: "Offender",
                        value: `${offender}`
                    },
                    {
                        name: "Ban ID",
                        value: `${banID}`
                    },
                    {
                        name: "Reason",
                        value: `${reason}`
                    }
                )

                await channel.send({ content: `${interaction.user.toString()}`, embeds: [embed] })
                await channel.send("To appeal your ban, please answer the following questions as honestly and completely as possible:\n```1. How do you feel about being banned?\n\n2. How have you changed since being banned?```")

                await interaction.reply({ content: `Appeal Channel created ${channel}`, ephemeral: true })

                setTimeout(async () => {
                    await interaction.deleteReply()
                },5000)
            } catch (error) {
                console.error(error)

                interaction.reply({ content: "Invalid Ban ID. Please make sure you key in the correct ID", ephemeral: true })

                setTimeout(async () => {
                    await interaction.deleteReply()
                },5000)

                return
            }

        }
    }
}