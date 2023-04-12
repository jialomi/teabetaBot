const memberRole = "288385193285386248"
const guestRole = "615837413117526027"
const grandcounsilRole = "288382736480337920"

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        
        if (interaction.commandName === "unverify") {

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
        }

        if (interaction.commandName === "editmessage") {

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
            }

            const contentChannel = await interaction.client.channels.cache.get(interaction.channelId)
            const contentMessage = await contentChannel.messages.fetch(interaction.options.get("content-message-id").value)

            const editChannel = await interaction.client.channels.cache.get(interaction.options.get("channel-id").value)
            const editMessage = await editChannel.messages.fetch(interaction.options.get("message-id").value)

            editMessage.edit({content: contentMessage.content})
        }

        if (interaction.commandName === "say") {

            interaction.reply({content: `said ${interaction.options.get("content").value}`})
            interaction.deleteReply()
            interaction.channel.send(interaction.options.get("content").value)
        }
    }
}