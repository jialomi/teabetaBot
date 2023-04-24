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

        // Laezaria Appl Button Pressed Reaction
        if (interaction.customId === "laezapplyclubButton") {

            
            const guild = interaction.guild
            const member = await guild.members.fetch(interaction.user.id)

            /*if (member.roles.cache.has(memberRole)) {
                interaction.reply({ content: "You are already a member of Laezaria", ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 1000 * 60 )

                return;
            }*/

            
            const modal = new ModalBuilder()
            .setCustomId("laezclubapplyModal")
            .setTitle("LAEZARIA CLUB APPLICATION")

            const laezclubapplyQn1 = new TextInputBuilder()
            .setCustomId("laezclubapplyQn1")
            .setLabel("What is your trove in game name?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder("Example: Xoric")
            .setMaxLength(20)
            .setMinLength(3)

            const laezclubapplyQn2 = new TextInputBuilder()
            .setCustomId("laezclubapplyQn2")
            .setLabel("What is the PR on your highest class?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder("Example: 30,000 PR")

            const laezclubapplyQn3 = new TextInputBuilder()
            .setCustomId("laezclubapplyQn3")
            .setLabel("What is your total mastery?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder("Example: 500 MR")

            const laezclubapplyQn4 = new TextInputBuilder()
            .setCustomId("laezclubapplyQn4")
            .setLabel("Why do you want to join this club?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setPlaceholder("I want to join Laezaria because...")

            const laezclubapplyQn5 = new TextInputBuilder()
            .setCustomId("laezclubapplyQn5")
            .setLabel("Image link for PR/Mastery screenshot")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder('See "How to get Image URL" section')

            const firstActionRow = new ActionRowBuilder().setComponents(laezclubapplyQn1)
            const secondActionRow = new ActionRowBuilder().setComponents(laezclubapplyQn2)
            const thirdActionRow = new ActionRowBuilder().setComponents(laezclubapplyQn3)
            const fourthActionRow = new ActionRowBuilder().setComponents(laezclubapplyQn4)
            const fifthActionRow = new ActionRowBuilder().setComponents(laezclubapplyQn5)

            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow)
            
            await interaction.showModal(modal)
            
        }

        if (interaction.customId === "laezclubapplyModal") {

            const clubanswerQn1 = interaction.fields.getTextInputValue("laezclubapplyQn1")
            const clubanswerQn2 = interaction.fields.getTextInputValue("laezclubapplyQn2")
            const clubanswerQn3 = interaction.fields.getTextInputValue("laezclubapplyQn3")
            const clubanswerQn4 = interaction.fields.getTextInputValue("laezclubapplyQn4")
            let rawImage = await interaction.fields.getTextInputValue("laezclubapplyQn5")

            const inboxChannel = interaction.client.channels.cache.get(inboxChannelId)

            let image = await interaction.fields.getTextInputValue("laezclubapplyQn5")
            let embed;
            console.log(isImage(image))
            if (rawImage === "") {
                rawImage = "Empty Input"
            }
            if (image === "") {
                image = "https://cdn.discordapp.com/attachments/1099183284115755008/1099249455645065256/Laezaria-Icon-Round-Failed-Image.png"
            }
            if (isImage(image) === false) {
                image = "https://cdn.discordapp.com/attachments/1099183284115755008/1099249455645065256/Laezaria-Icon-Round-Failed-Image.png"
            }

            embed = new EmbedBuilder()
            .setTitle("Application to join Laezaria")
            .setDescription("Applicant Information (Awaiting Staff Approval)")
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
                    value: `${clubanswerQn1}`,
                },
                {
                    name: "What is the PR on your highest class?",
                    value: `${clubanswerQn2}`
                },
                {
                    name: "What is your total mastery?",
                    value: `${clubanswerQn3}`
                },
                {
                    name: "Why do you want to join this club?",
                    value: `${clubanswerQn4}`
                },
                {
                    name: "Raw Image URL",
                    value: `${rawImage}`
                }
            )
            

            const laezclubApprove = new ButtonBuilder()
            .setCustomId('laezclubApprove')
            .setLabel('Approve')
            .setStyle('Success')

            const laezclubDeny = new ButtonBuilder()
            .setCustomId('laezclubDeny')
            .setLabel('Deny')
            .setStyle("Danger")

            const row = new ActionRowBuilder()
            .addComponents(laezclubApprove, laezclubDeny)

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

        if (interaction.customId === "laezclubApprove") {
            
            const userMessage = await interaction.message.embeds
            const embedMessage = userMessage[0]
            const ign = embedMessage.fields[2].value
            const discordTag = embedMessage.fields[0].value
            const discordIdentity = embedMessage.fields[1].value
            const discordID = discordTag.match(/\d+/)[0]
            const clubanswerQn2 = embedMessage.fields[3].value
            const clubanswerQn3 = embedMessage.fields[4].value
            const clubanswerQn4 = embedMessage.fields[5].value
            const rawImage = embedMessage.fields[6].value
            const image = embedMessage.image.url
            const thumbnail = embedMessage.thumbnail.url

            const embed = new EmbedBuilder()
            .setTitle("Application to join Laezaria Successful")
            .setDescription("Applicant Information (Approved By Staff)")
            .setColor(0x00ff00)
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
                    name: "What is the PR on your highest class?",
                    value: `${clubanswerQn2}`
                },
                {
                    name: "What is your total mastery?",
                    value: `${clubanswerQn3}`
                },
                {
                    name: "Why do you want to join this club?",
                    value: `${clubanswerQn4}`
                },
                {
                    name: "Approved By",
                    value: `<@${interaction.user.id}>`
                },
                {
                    name: "Raw Image URL",
                    value: `${rawImage}`
                },
            )

            const dmEmbed = new EmbedBuilder()
            .setTitle("Congratulations! Your Application has been Approved!")
            .setDescription("You are now a club member of Laezaria")
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
                const memberRole = await interaction.guild.roles.cache.find((r) => r.name === 'Trove Club Member')
                await userMember.roles.add(memberRole)
                await userMember.setNickname(ign)
            } catch (error) {
                console.log(error)
            }
            
            const user = await interaction.client.users.fetch(discordID)
            await user.send({ content: `Congratulations ${discordTag} ! Your Club Application to Laezaria has been Approved!`, embeds: [dmEmbed] })

            const channel = interaction.client.channels.cache.get(interaction.channelId)
            const editMessage = await channel.messages.fetch(interaction.message.id)

            await editMessage.edit({ embeds: [embed], components: [] })
        }

        if (interaction.customId === "laezclubDeny") {
            
            const modal = new ModalBuilder()
            .setCustomId('laezclubdenyReason')
            .setTitle("Deny Application Reason")

            const clubdenyReason = new TextInputBuilder()
            .setCustomId('laezclubdenyReason')
            .setLabel('Deny Reason')
            .setRequired(false)
            .setStyle(TextInputStyle.Paragraph)

            const firstActionRow = new ActionRowBuilder().setComponents(clubdenyReason)

            modal.addComponents(firstActionRow)

            await interaction.showModal(modal)
        }

        if (interaction.customId === "laezclubdenyReason") {
            
            const userMessage = await interaction.message.embeds
            const embedMessage = userMessage[0]
            const ign = embedMessage.fields[2].value
            const discordTag = embedMessage.fields[0].value
            const discordIdentity = embedMessage.fields[1].value
            const discordID = discordTag.match(/\d+/)[0]
            const clubanswerQn2 = embedMessage.fields[3].value
            const clubanswerQn3 = embedMessage.fields[4].value
            const clubanswerQn4 = embedMessage.fields[5].value
            const rawImage = embedMessage.fields[6].value
            const image = embedMessage.image.url
            const thumbnail = embedMessage.thumbnail.url

            let denyReason = interaction.fields.getTextInputValue("laezclubdenyReason")
            let denyTemplate = "\n```We thank you for your time & efforts put into the Application, however we regret to inform you that your Club Application to Laezaria has been Denied```"
            let denyReasonFinal

            if (denyReason === "") {
                denyReasonFinal = discordTag + "\n```We thank you for your time & efforts put into the Application, however we regret to inform you that your Club Application to Laezaria has been Denied```"
            } else {
                denyReasonFinal = discordTag + "\n```We thank you for your time & efforts put into the Application, however we regret to inform you that your Club Application to Laezaria has been Denied due to:\n\n" + denyReason + "```"
            }

            const embed = new EmbedBuilder()
            .setTitle("Application to join Laezaria Unsuccessful")
            .setDescription("Applicant Information (Denied By Staff)")
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
                    name: "What is the PR on your highest class?",
                    value: `${clubanswerQn2}`
                },
                {
                    name: "What is your total mastery?",
                    value: `${clubanswerQn3}`
                },
                {
                    name: "Why do you want to join this club?",
                    value: `${clubanswerQn4}`
                },
                {
                    name: "Denied By",
                    value: `<@${interaction.user.id}>`
                },
                {
                    name: "Raw Image URL",
                    value: `${rawImage}`
                },
            )

            const embed2 = new EmbedBuilder()
            .setTitle("Application to join Laezaaria Unsuccessful")
            .setDescription(`${denyReasonFinal}`)
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