const { AttachmentBuilder, EmbedBuilder } = require("discord.js")

const memberRole = "288385193285386248"
const guestRole = "615837413117526027"
const grandcounsilRole = "288382736480337920"
const sendToChannelId = "1095836703916314665"
const devRole = "1095126923740463106"
const banChannelId = "1096859455842418788"

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        
        if (interaction.commandName === "unverify") {
            try {
                const interactor = await interaction.guild.members.fetch(interaction.user.id)

                if (!interactor.roles.cache.has(grandcounsilRole)) {
                    interaction.reply({ content: "You are not authorised to perform this action", ephemeral: true})

                    setTimeout(async () => {
                        try {
                            await interaction.deleteReply()
                        } catch (error) {
                            console.error(error)
                        }
                    },5000)

                    return;
                }

                const member = await interaction.options.get("discord-user")
                const userMember = await interaction.guild.members.fetch(member.user.id)
                await userMember.roles.remove(memberRole)
                await userMember.roles.add(guestRole)

                interaction.reply({content: "Operation Successful", ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 2000)
            } catch (error) {
                console.error(error)
            }
        }

        if (interaction.commandName === "editmessage") {

            try {
                const interactor = await interaction.guild.members.fetch(interaction.user.id)

                if (!interactor.roles.cache.has(grandcounsilRole)) {
                    interaction.reply({ content: "You are not authorised to perform this action", ephemeral: true})

                    setTimeout(async () => {
                        try {
                            await interaction.deleteReply()
                        } catch (error) {
                            console.error(error)
                        }
                    },5000)
                    return;
                }

                const contentChannel = await interaction.client.channels.cache.get(interaction.channelId)
                const contentMessage = await contentChannel.messages.fetch(interaction.options.get("content-message-id").value)

                let editChannel = await interaction.options.get("channel-id")

                if (editChannel === null) {
                    editChannel = await interaction.client.channels.cache.get(interaction.channelId)
                } else {
                    editChannel = await interaction.client.channels.cache.get(interaction.options.get("channel-id").value)
                }

                // const editChannel = await interaction.client.channels.cache.get(interaction.options.get("channel-id").value)
                const editMessage = await editChannel.messages.fetch(interaction.options.get("message-id").value)

                editMessage.edit({content: contentMessage.content})

                interaction.reply({ content: "Operation Successful", ephemeral: true})

                setTimeout( async() => {
                    await interaction.deleteReply()
                }, 2000)
            } catch (error) {
                console.error(error)
            }
        }

        if (interaction.commandName === "say") {

            try {
                interaction.reply({content: `said ${interaction.options.get("content").value}`})
                interaction.deleteReply()
                interaction.channel.send(interaction.options.get("content").value)
            } catch (error) {
                console.error(error)
            }
        }

        if (interaction.commandName === "ticket") {
            try {
                const interactor = await interaction.guild.members.fetch(interaction.user.id)
                if (!interactor.roles.cache.has(grandcounsilRole) && !interactor.roles.cache.has(devRole)) {
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

                if (!interaction.channel.name.startsWith("ticket-knight") && !interaction.channel.name.startsWith("ticket-report") && !interaction.channel.name.startsWith("ticket-appeal")) {
                    interaction.reply({ content: "This is not a Ticket channel", ephemeral: true })

                    setTimeout(async () => {
                        await interaction.deleteReply()
                    },5000)

                    return
                }

                const member = interaction.options.get("user")

                if (interaction.options.get("ticket-action").value === "Add") {

                    interaction.channel.permissionOverwrites.edit(member.user.id, { ViewChannel: true, SendMessages: true })
                    interaction.reply({content: `${member.user.toString()} has been added to the ticket`})
                }

                if (interaction.options.get("ticket-action").value === "Remove") {

                    interaction.channel.permissionOverwrites.edit(member.user.id, { ViewChannel: false, SendMessages: false })
                    interaction.reply({content: `${member.user.toString()} has been removed from the ticket`})
                }

                if (interaction.options.get("ticket-action").value === "Close") {


                    await interaction.reply("```Saving Transcript.```")
                    await interaction.editReply("```Saving Transcript..```")
                    await interaction.editReply("```Saving Transcript...```")

                    const transcriptChannel = await interaction.client.channels.cache.get(interaction.channelId)
                    const sendToChannel = await interaction.client.channels.cache.get(sendToChannelId)

                    const messages = await transcriptChannel.messages.fetch()
                    const transcript = Array.from(messages.values()).reverse().map(m=> `${m.author.tag} (${m.createdAt.toUTCString()}): ${m.content}`).join('\n')
                    const file = Buffer.from(transcript, 'utf-8')
                    await sendToChannel.send({ content: `Ticket ID: ${interaction.channelId}\nTicket Name: ${interaction.channel.name}\nClosed By: ${interaction.user.toString()}`, files: [{ attachment: file, name: `${interaction.channel.name}.txt`}] })

                    await interaction.editReply("```Closing Ticket.```")
                    await interaction.editReply("```Closing Ticket..```")
                    await interaction.editReply("```Closing Ticket...```")

                    const channel = await interaction.guild.channels.fetch(interaction.channelId)
                    await channel.delete()
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (interaction.commandName === "ban") {

            const interactor = await interaction.guild.members.fetch(interaction.user.id)
            if (!interactor.roles.cache.has(grandcounsilRole) && !interactor.roles.cache.has(devRole)) {
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

            try {

                const banUser = interaction.options.get("user")
                const banReason = interaction.options.get("reason").value

                const embed = new EmbedBuilder()
                .setTitle(`Banned User ${banUser.user.username}`)
                .setDescription("__Banned User's Info:__")
                .setColor(0xFF0000)
                .setTimestamp()
                .setThumbnail(banUser.user.displayAvatarURL())
                .setFields(
                    {
                        name: "Offender",
                        value: `Discord User: ${banUser.user.toString()}\nDiscord Tag: ${banUser.user.tag}\nUser ID: ${banUser.user.id}`
                    },
                    {
                        name: "Reason",
                        value: `${banReason}`
                    }
                )

                const channel = await interaction.guild.channels.fetch(banChannelId)
                const message = await channel.send({ embeds: [embed] })

                const dmEmbed = new EmbedBuilder()
                .setTitle("Banned From THE NORTH")
                .setColor(0x0000FF)
                .setDescription(`You have been banned from THE NORTH for the following:\n${banReason}`)
                .setFields(
                    {
                        name: "Appeal Option",
                        value: "Feel free to Appeal your ban with your Ban ID given below."
                    },
                    {
                        name: "Ban ID",
                        value: `${message.id}`
                    }
                )

                const user = await interaction.client.users.fetch(banUser.user.id)
                await user.send({ embeds: [dmEmbed] })

                interaction.reply({ content: `Banned user logged to ${channel}`, ephemeral: true })

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 2000)

                
            } catch (error) {
                console.error(error)
            }
        }
    }
}