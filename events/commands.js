const { AttachmentBuilder } = require("discord.js")

const memberRole = "288385193285386248"
const guestRole = "615837413117526027"
const grandcounsilRole = "288382736480337920"
const sendToChannelId = "1095836703916314665"

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

                let editChannel = await interaction.options.get("channel-id").value

                if (editChannel === "0") {
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

        if (interaction.commandName === "closeticket") {

            try {
                if (!interaction.channel.name.startsWith("ticket-knight")) {
                    interaction.reply({ content: "This is not a Ticket channel", ephemeral: true })

                    setTimeout(async () => {
                        await interaction.deleteReply()
                    },5000)

                    return
                }

                await interaction.reply("```Saving Transcript.```")
                await interaction.editReply("```Saving Transcript..```")
                await interaction.editReply("```Saving Transcript...```")

                const transcriptChannel = await interaction.client.channels.cache.get(interaction.channelId)
                const sendToChannel = await interaction.client.channels.cache.get(sendToChannelId)

                const messages = await transcriptChannel.messages.fetch()
                const transcript = Array.from(messages.values()).reverse().map(m=> `${m.author.tag} (${m.createdAt.toUTCString()}): ${m.content}`).join('\n')
                console.log(transcript)
                const file = Buffer.from(transcript, 'utf-8')
                await sendToChannel.send({ content: `Ticket ID: ${interaction.channelId}\nTicket Name: ${interaction.channel.name}\nClosed By: ${interaction.user.toString()}`, files: [{ attachment: file, name: `${interaction.channel.name}.txt`}] })

                await interaction.editReply("```Closing Ticket.```")
                await interaction.editReply("```Closing Ticket..```")
                await interaction.editReply("```Closing Ticket...```")

                const channel = await interaction.guild.channels.fetch(interaction.channelId)
                await channel.delete()
            } catch (error) {
                console.error(error)
            }
        }
    }
}