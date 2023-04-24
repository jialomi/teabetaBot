const { Events, EmbedBuilder, ButtonBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require("discord.js")

const guildId = "131810843686993921"
const laezmemberRole = "259895578421362693"
const inboxChannelId = "1099183284115755008"

function isImage(url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg|JPG|JPEG|PNG|WEBP|AVIF|GIF|SVG)$/.test(url);
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.customId === "laezverifyButton") {

            const modal = new ModalBuilder()
            .setCustomId('laezverifyModal')
            .setTitle("IGN VERIFICATION")
            
            const laezverifyQn1 = new TextInputBuilder()
            .setCustomId('laezverifyQn1')
            .setLabel('What is your trove in game name')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Example: Xoric')
            .setRequired(true)
            .setMaxLength(20)
            .setMinLength(3)

            const laezverifyQn2 = new TextInputBuilder()
            .setCustomId('laezverifyQn2')
            .setLabel('Image link for proof of Laezaria Membership')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder('See "How to get Image URL" section')

            const firstActionRow = new ActionRowBuilder().setComponents(laezverifyQn1)
            const secondActionRow = new ActionRowBuilder().setComponents(laezverifyQn2)

            modal.addComponents(firstActionRow, secondActionRow)

            await interaction.showModal(modal)
        }

        if (interaction.customId === "laezverifyModal") {

            console.log("verfication modal sent")

            const verifyanswerQn1 = interaction.fields.getTextInputValue("laezverifyQn1")
            let rawImage = await interaction.fields.getTextInputValue("laezverifyQn2")

            const inboxChannel = interaction.client.channels.cache.get(inboxChannelId)

            let image = interaction.fields.getTextInputValue("laezverifyQn2")
            
            if (rawImage === "") {
                rawImage = "Empty Input"
            }
            if (image === "") {
                image = "https://cdn.discordapp.com/attachments/1099183284115755008/1099249455645065256/Laezaria-Icon-Round-Failed-Image.png"
            }
            if (isImage(image) === false) {
                image = "https://cdn.discordapp.com/attachments/1099183284115755008/1099249455645065256/Laezaria-Icon-Round-Failed-Image.png"
            }

            const embed = new EmbedBuilder()
            .setTitle("Laezaria IGN Verification")
            .setDescription("IGN Verification (Awaiting Staff Approval)")
            .setColor(0xFFFF00)
            .setImage(image)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setFields(
                {
                    name: "Discord User",
                    value: `<@${interaction.user.id}>`,
                    inline: true,
                },
                {
                    name: "Discord Tag",
                    value: `${interaction.user.tag}`,
                    inline: true,
                },
                {
                    name: "What is your trove in game name?",
                    value: `${verifyanswerQn1}`,
                },
                {
                    name: "Raw Image URL",
                    value: `${rawImage}`
                }
            )

            const laezverifyApprove = new ButtonBuilder()
            .setCustomId('laezverifyApprove')
            .setLabel('Approve')
            .setStyle('Success')
            
            const laezverifyDeny = new ButtonBuilder()
            .setCustomId('laezverifyDeny')
            .setLabel('Deny')
            .setStyle('Danger')

            const row = new ActionRowBuilder()
            .addComponents(laezverifyApprove, laezverifyDeny)

            await interaction.reply({
                content: "Request Sent",
                ephemeral: true
            })

            await inboxChannel.send({ embeds: [embed], components: [row] })

            setTimeout(async () => {
                try {
                    await interaction.deleteReply()
                } catch (error) {
                    console.error(error)
                }
            }, 5000)

        }

        if (interaction.customId === "laezverifyApprove") {

            const userMember = await interaction.message.embeds
            const embedMessage = userMember[0]
            const ign = embedMessage.fields[2].value
            const discordTag = embedMessage.fields[0].value
            const discordIdentity = embedMessage.fields[1].value
            const discordID = discordTag.match(/\d+/)[0]
            const rawImage = embedMessage.fields[3].value
            const image = embedMessage.image.url
            const thumbnail = embedMessage.thumbnail.url

            const embed = new EmbedBuilder()
            .setTitle("Laezaria IGN Verification Successful")
            .setDescription("IGN Verification (Approved by Staff)")
            .setColor(0x00FF00)
            .setImage(image)
            .setThumbnail(thumbnail)
            .setFields(
                {
                    name: "Discord User",
                    value: `${discordTag}`,
                    inline: true,
                },
                {
                    name: "Discord Tag",
                    value: `${discordIdentity}`,
                    inline: true,
                },
                {
                    name: "What is your trove in game name?",
                    value: `${ign}`,
                },
                {
                    name: "Approved By",
                    value: `<@${interaction.user.id}>`
                },
                {
                    name: "Raw Image URL",
                    value: `${rawImage}`
                }
            )

            const dmEmbed = new EmbedBuilder()
            .setTitle("Congratulations! Your IGN has been Verified!")
            .setDescription("You are now a verified club member of Laezaria")
            .setColor(0x0000FF)
            .setAuthor(
                {
                    name: interaction.client.user.username,
                    iconURL: interaction.client.user.displayAvatarURL()
                }
            )
            .setThumbnail(thumbnail)
            .setImage("https://cdn.discordapp.com/attachments/1099183284115755008/1099253139577765898/Laezaria-Icon-Round-Approved.png")
        
            try {
                const userMember = await interaction.guild.members.fetch(discordID)
                await userMember.roles.add(laezmemberRole)
                await userMember.setNickname(ign)
            } catch (error) {
                console.error(error)
            }
    
            const user = await interaction.client.users.fetch(discordID)
            await user.send({ content: `Congratulations ${discordTag} ! Your IGN Verification has been approved/verified!`, embeds: [dmEmbed] })
    
            const channel = interaction.client.channels.cache.get(interaction.channelId)
            const editMessage = await channel.messages.fetch(interaction.message.id)
    
            await editMessage.edit({ embeds: [embed], components: [] })
        }

        if (interaction.customId === "laezverifyDeny") {

            const modal = new ModalBuilder()
            .setCustomId('laezverifydenyReason')
            .setTitle("Deny Application Reason")

            const laezverifydenyReason = new TextInputBuilder()
            .setCustomId('laezverifydenyReason')
            .setLabel('Deny Reason')
            .setRequired(false)
            .setStyle(TextInputStyle.Paragraph)

            const firstActionRow = new ActionRowBuilder().setComponents(laezverifydenyReason)

            modal.addComponents(firstActionRow)

            await interaction.showModal(modal)
        }

        if (interaction.customId === "laezverifydenyReason") {

            const userMember = await interaction.message.embeds
            const embedMessage = userMember[0]
            const ign = embedMessage.fields[2].value
            const discordTag = embedMessage.fields[0].value
            const discordIdentity = embedMessage.fields[1].value
            const discordID = discordTag.match(/\d+/)[0]
            const rawImage = embedMessage.fields[3].value
            const image = embedMessage.image.url
            const thumbnail = embedMessage.thumbnail.url

            let denyReason = interaction.fields.getTextInputValue("laezverifydenyReason")
            let denyReasonFinal;

            if (denyReason === "") {
                denyReasonFinal = discordTag + "\n```Your IGN Verification has been denied.```"
            } else {
                denyReasonFinal = discordTag + "\n```Your IGN Verification has been denied due to:\n\n" + denyReason + "```"
            }

            const embed = new EmbedBuilder()
            .setTitle("Laezaria IGN Verification Unsuccessful")
            .setDescription("IGN Verification (Denied by Staff)")
            .setColor(0xff0000)
            .setImage(image)
            .setThumbnail(thumbnail)
            .setFields(
                {
                    name: "Discord User",
                    value: `${discordTag}`,
                    inline: true,
                },
                {
                    name: "Discord Tag",
                    value: `${discordIdentity}`,
                    inline: true,
                },
                {
                    name: "What is your trove in game name?",
                    value: `${ign}`,
                },
                {
                    name: "Denied By",
                    value: `<@${interaction.user.id}>`
                },
                {
                    name: "Raw Image URL",
                    value: `${rawImage}`
                }
            )

            const embed2 = new EmbedBuilder()
            .setTitle("Laezaria IGN Verification Unsuccessful")
            .setDescription(denyReasonFinal)
            .setThumbnail(thumbnail)
            .setAuthor(
                {
                    name: interaction.client.user.username,
                    iconURL: interaction.client.user.displayAvatarURL()
                }
            )

            const user = await interaction.client.users.fetch(discordID)

            const channel = interaction.client.channels.cache.get(interaction.channelId)
            const editMessage = await channel.messages.fetch(interaction.message.id)

            user.send({ embeds: [embed2] })
            editMessage.edit({ content: denyReasonFinal, embeds: [embed], components: [] })

            interaction.reply({content: "Deny Successful", ephemeral: true})

            setTimeout(async () => {
                try {
                    await interaction.deleteReply()
                } catch (error) {
                    console.error(error)
                    }
            }, 5000)

        }
    }
    
}