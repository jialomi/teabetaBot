const { Events, EmbedBuilder, ButtonBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require("discord.js")
const memberRole = "288385193285386248"
const guestRole = "615837413117526027"
const grandcounsilRole = "288382736480337920"
const kingsguardRole = "438818482692423683"
const knightRole = "455248257161887754"
const testinboxChannelId = "1094636463011930215"
const inboxChannelId = "1095111479449092276"

function isImage(url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg|JPG|JPEG|PNG|WEBP|AVIF|GIF|SVG)$/.test(url);
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        // Apply Button Pressed Reaction
        if (interaction.customId === "applyclubButton") {

            const guild = interaction.guild
            const member = await guild.members.fetch(interaction.user.id)

            if (member.roles.cache.has(memberRole)) {
                interaction.reply("You are already a NORTHMEN")

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 2000)

                return;
            }

            const modal = new ModalBuilder()
            .setCustomId("clubapplyModal")
            .setTitle("THE NORTH CLUB APPLICATION")
            
            const clubapplyQn1 = new TextInputBuilder()
            .setCustomId("clubapplyQn1")
            .setLabel("Key in your Trove In Game Name")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder("E.g. Surge")
            .setMaxLength(20)
            .setMinLength(3)

            const clubapplyQn2 = new TextInputBuilder()
            .setCustomId("clubapplyQn2")
            .setLabel("What about Trove keeps you playing?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setPlaceholder("E.g. Trove is fun...")

            const clubapplyQn3 = new TextInputBuilder()
            .setCustomId("clubapplyQn3")
            .setLabel("What can you tell us about yourself?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setPlaceholder("E.g. My Hobbies are...")

            const clubapplyQn4 = new TextInputBuilder()
            .setCustomId("clubapplyQn4")
            .setLabel("Why do you want to join The North?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setPlaceholder("E.g. Because The North is...")

            const clubapplyQn5 = new TextInputBuilder()
            .setCustomId("clubapplyQn5")
            .setLabel("Image Proof for your Total Mastery Rank")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
            .setPlaceholder("Image URL")

            const firstActionRow = new ActionRowBuilder().setComponents(clubapplyQn1)
            const secondActionRow = new ActionRowBuilder().setComponents(clubapplyQn2)
            const thirdActionRow = new ActionRowBuilder().setComponents(clubapplyQn3)
            const fourthActionRow = new ActionRowBuilder().setComponents(clubapplyQn4)
            const fifthActionRow = new ActionRowBuilder().setComponents(clubapplyQn5)

            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow)

            await interaction.showModal(modal)
        }

        if(interaction.customId === "clubapplyModal") {
            
            // Storing answers from Club Application Modals into Variables
            const clubanswerQn1 = interaction.fields.getTextInputValue("clubapplyQn1")
            const clubanswerQn2 = interaction.fields.getTextInputValue("clubapplyQn2")
            const clubanswerQn3 = interaction.fields.getTextInputValue("clubapplyQn3")
            const clubanswerQn4 = interaction.fields.getTextInputValue("clubapplyQn4")

            // Retrieving the Inbox Channel
            const inboxChannel = interaction.client.channels.cache.get(inboxChannelId)

            // Determining if the URL in clubapplyQn5 is an Image URL
            let image = await interaction.fields.getTextInputValue("clubapplyQn5")
            console.log(isImage(image))
            if (image === "") {
                image = "https://cdn.discordapp.com/attachments/756494646678519878/758105625594036295/image0_1.png"
            }
            if (isImage(image) === false) {
                image = "https://cdn.discordapp.com/attachments/756494646678519878/758105625594036295/image0_1.png"
            }

            // Building the embed for the Application
            const embed = new EmbedBuilder()
            .setTitle("Application to Join THE NORTH")
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
                    name: "Trove In game Name",
                    value: `${clubanswerQn1}`,
                },
                {
                    name: "What about Trove keeps you playing?",
                    value: `${clubanswerQn2}`
                },
                {
                    name: "What can you tell us about yourself?",
                    value: `${clubanswerQn3}`
                },
                {
                    name: "Why do you want to join The North?",
                    value: `${clubanswerQn4}`
                },
                {
                    name: "Image for proof of Total Mastery Level ",
                    value: "If you do not see a image of proof, it means the Applicant either did not give a valid Image URL or left this part Blank"
                }
            )

            const clubApprove = new ButtonBuilder()
            .setCustomId("clubApprove")
            .setLabel("✔️ Approve")
            .setStyle("Success")

            const clubDeny = new ButtonBuilder()
            .setCustomId("clubDeny")
            .setLabel("Ⅹ Deny")
            .setStyle("Danger")

            const row = new ActionRowBuilder()
            .addComponents(clubApprove, clubDeny)

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

        // Application Approve Process (Part 1)
        if (interaction.customId === "clubApprove") {

            const guild = interaction.guild
            const member = await guild.members.fetch(interaction.user.id)

            if (!member.roles.cache.has(grandcounsilRole)) {
                interaction.reply({ content: "You are not Authorised to perform this action!", ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 2000)

                return;
            }

            const userMessage = await interaction.message.embeds
            const embedMessage = userMessage[0]
            const ign = embedMessage.fields[2].value
            const discordTag = embedMessage.fields[0].value
            const discordIdentity = embedMessage.fields[1].value
            const discordID = discordTag.match(/\d+/)[0]
            const clubanswerQn2 = embedMessage.fields[3].value
            const clubanswerQn3 = embedMessage.fields[4].value
            const clubanswerQn4 = embedMessage.fields[5].value
            const image = embedMessage.image.url
            const thumbnail = embedMessage.thumbnail.url

            const embed = new EmbedBuilder()
            .setTitle("Application to Join THE NORTH Successful")
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
                    name: "Trove In game Name",
                    value: `${ign}`,
                },
                {
                    name: "What about Trove keeps you playing?",
                    value: `${clubanswerQn2}`
                },
                {
                    name: "What can you tell us about yourself?",
                    value: `${clubanswerQn3}`
                },
                {
                    name: "Why do you want to join The North?",
                    value: `${clubanswerQn4}`
                },
                {
                    name: "Image for proof of Total Mastery Level ",
                    value: "If you do not see a image of proof, it means the Applicant either did not give a valid Image URL or left this part Blank"
                },
                {
                    name: "Approved By",
                    value: `<@${interaction.user.id}>`
                }
            )
            
            const dmEmbed = new EmbedBuilder()
            .setTitle("Congratulation! Your Application Has been Approved")
            .setDescription("You are now a part of THE NORTH, all that is left to do is invite you to the club on Trove!")
            .setColor(0x0000FF)
            .setAuthor(
                {
                    name:interaction.client.user.username, 
                    iconURL: interaction.client.user.displayAvatarURL()
                }
            )
            .setThumbnail(thumbnail)
            .setImage("https://cdn.discordapp.com/attachments/756494646678519878/758105625594036295/image0_1.png")
            .setFields(
                {
                    name: "Club Invite Step",
                    value: "It's Simple, All you have to do is, when you are in game and ready to join, press the request button below and it will inform our Staff team that you are ready to join!\nEnjoy!"
                }
            )

            const requestinviteButton = new ButtonBuilder()
            .setCustomId("requestinviteButton")
            .setLabel("Request")
            .setStyle("Success")

            const row = new ActionRowBuilder().addComponents(requestinviteButton)

            const confirminviteButton = new ButtonBuilder()
            .setCustomId("confirminviteButton")
            .setLabel("✅ Confirm")
            .setStyle("Success")

            const row2 = new ActionRowBuilder().addComponents(confirminviteButton)

            const user = await interaction.client.users.fetch(discordID)
            await user.send({content: `Congratulations ${discordTag} ! Your Club Application has been Approved! Follow the Steps Below to fully join THE NORTH!`, embeds: [dmEmbed], components: [row]})

            const channelId = interaction.channelId

            const channel = interaction.client.channels.cache.get(channelId)
            const editMessage = await channel.messages.fetch(interaction.message.id)

            editMessage.edit({ embeds: [embed], components: [row2] })

            interaction.reply({content: "Approve Successful", ephemeral: true})

            setTimeout(async () => {
                try {
                    await interaction.deleteReply()
                } catch (error) {
                    console.error(error)
                    }
            }, 10000)
        }

        if (interaction.customId === "requestinviteButton") {

            const embed = new EmbedBuilder()
            .setTitle("Request Sent, You should be invited into the club soon!")
            .setDescription("Be patient! you are almost there!")
            .setThumbnail(interaction.user.displayAvatarURL())
            .setColor(0x00FF00)
            .setImage("https://cdn.discordapp.com/attachments/756494646678519878/758105625594036295/image0_1.png")
            .setAuthor(
                {
                    name: interaction.client.user.username,
                    iconURL: interaction.client.user.displayAvatarURL()
                }
            )

            console.log(interaction.channelId)

            const channel = await interaction.client.channels.fetch(interaction.channelId)
            const message = await channel.messages.fetch(interaction.message.id)
            await message.edit({ content: `Great! The Request has been sent!`, embeds: [embed], components: []})

            const inboxChannel = interaction.client.channels.cache.get(inboxChannelId)
            await inboxChannel.send(`<@${interaction.user.id}> is ready to be invited to THE NORTH`)

        }

        if (interaction.customId === "confirminviteButton") {

            const guild = interaction.guild
            const member = await guild.members.fetch(interaction.user.id)

            if (!member.roles.cache.has(grandcounsilRole) || !member.roles.cache.has(kingsguardRole) || !member.roles.cache.has(knightRole)) {
                interaction.reply({ content: "You are not Authorised to perform this action!", ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 2000)

                return;
            }

            const userMessage = await interaction.message.embeds
            const embedMessage = userMessage[0]
            const ign = embedMessage.fields[2].value
            const discordTag = embedMessage.fields[0].value
            const discordIdentity = embedMessage.fields[1].value
            const discordID = discordTag.match(/\d+/)[0]
            const clubanswerQn2 = embedMessage.fields[3].value
            const clubanswerQn3 = embedMessage.fields[4].value
            const clubanswerQn4 = embedMessage.fields[5].value
            const approveBy = embedMessage.fields[7].value
            const image = embedMessage.image.url
            const thumbnail = embedMessage.thumbnail.url

            const embed = new EmbedBuilder()
            .setTitle("Applicant Successfully Invited to THE NORTH")
            .setDescription("Applicant Information (Applicant Invited)")
            .setColor(0x0000FF)
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
                    name: "Trove In game Name",
                    value: `${ign}`,
                },
                {
                    name: "What about Trove keeps you playing?",
                    value: `${clubanswerQn2}`
                },
                {
                    name: "What can you tell us about yourself?",
                    value: `${clubanswerQn3}`
                },
                {
                    name: "Why do you want to join The North?",
                    value: `${clubanswerQn4}`
                },
                {
                    name: "Image for proof of Total Mastery Level ",
                    value: "If you do not see a image of proof, it means the Applicant either did not give a valid Image URL or left this part Blank"
                },
                {
                    name: "Approved By",
                    value: `${approveBy}`
                }
            )

            const userMember = await guild.members.fetch(discordID)
            await userMember.roles.remove(guestRole)
            await userMember.roles.add(memberRole)
            await userMember.setNickname(ign)

            const channelId = interaction.channelId

            const channel = interaction.client.channels.cache.get(channelId)
            const editMessage = await channel.messages.fetch(interaction.message.id)
            
            editMessage.edit({ embeds: [embed], components: [] })

            interaction.reply({content: "Confirm Successful", ephemeral: true})

            setTimeout(async () => {
                try {
                    await interaction.deleteReply()
                } catch (error) {
                    console.error(error)
                    }
            }, 10000)
        }

        // Application Reject Process Modal (Part 1)
        if (interaction.customId === "clubDeny") {
            
            const guild = interaction.guild
            const member = await guild.members.fetch(interaction.user.id)

            if (!member.roles.cache.has(grandcounsilRole)) {
                interaction.reply({ content: "You are not Authorised to perform this action!", ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 2000)

                return;
            }

            modal = new ModalBuilder()
            .setCustomId("clubdenyReason")
            .setTitle("Deny Application Reason")
            
            const clubdenyReason = new TextInputBuilder()
            .setCustomId("clubdenyReason")
            .setLabel("Deny Reason")
            .setPlaceholder("Applicant was denied because....")
            .setRequired(false)
            .setStyle(TextInputStyle.Paragraph)

            const firstActionRow = new ActionRowBuilder().setComponents(clubdenyReason)

            modal.addComponents(firstActionRow)
            
            await interaction.showModal(modal)
        }

        // Modal for Deny Reason for Staff
        if (interaction.customId === "clubdenyReason") {

            const userMessage = await interaction.message.embeds
            const embedMessage = userMessage[0]
            const ign = embedMessage.fields[2].value
            const discordTag = embedMessage.fields[0].value
            const discordIdentity = embedMessage.fields[1].value
            const discordID = discordTag.match(/\d+/)[0]
            const clubanswerQn2 = embedMessage.fields[3].value
            const clubanswerQn3 = embedMessage.fields[4].value
            const clubanswerQn4 = embedMessage.fields[5].value
            const image = embedMessage.image.url
            const thumbnail = embedMessage.thumbnail.url

            let denyReason = interaction.fields.getTextInputValue("clubdenyReason")
            let denyTemplate = "\n```We thank you for your time & efforts put into the Aplication, however We regret to inform you that your Club Application to THE NORTH has been Denied```"
            let denyReasonFinal

            if (denyReason === "") {
                denyReasonFinal = discordTag + "\n```We thank you for your time & efforts put into the Aplication, however We regret to inform you that your Club Application to THE NORTH has been Denied```"
            } else {
                denyReasonFinal = discordTag + "\n```We thank you for your time & efforts put into the Aplication, however We regret to inform you that your Club Application to THE NORTH has been Denied due to:\n\n" + denyReason + "```"
            }

            const embed = new EmbedBuilder()
            .setTitle("Application to Join THE NORTH Unsuccessful")
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
                    name: "Trove In game Name",
                    value: `${ign}`,
                },
                {
                    name: "What about Trove keeps you playing?",
                    value: `${clubanswerQn2}`
                },
                {
                    name: "What can you tell us about yourself?",
                    value: `${clubanswerQn3}`
                },
                {
                    name: "Why do you want to join The North?",
                    value: `${clubanswerQn4}`
                },
                {
                    name: "Image for proof of Total Mastery Level ",
                    value: "If you do not see a image of proof, it means the Applicant either did not give a valid Image URL or left this part Blank"
                },
                {
                    name: "Denied By",
                    value: `<@${interaction.user.id}>`
                },
            )

            const channelId = interaction.channelId

            const channel = interaction.client.channels.cache.get(channelId)
            const editMessage = await channel.messages.fetch(interaction.message.id)

            editMessage.edit({ content: denyReasonFinal, embeds: [embed], components: [] })
            
            interaction.reply({content: "Deny Successful", ephemeral: true})

            setTimeout(async () => {
                try {
                    await interaction.deleteReply()
                } catch (error) {
                    console.error(error)
                    }
            }, 10000)
        }
    }
}