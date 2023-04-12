const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.customId === "partnersButton") {
            try {
                const channel = interaction.client.channels.cache.get('522921826364424193')

                const messages = await channel.messages.fetch({ limit: 100 })
                let messageIDs = []
                let firstMessage = true
                for (const message of messages.values()) {
                    let reply;
                    if (firstMessage) {
                        reply = await interaction.reply({ content: message.content, ephemeral: true })
                        firstMessage = false
                    } else {
                        reply = await interaction.followUp({ content: message.content, ephemeral: true })
                    }
                    messageIDs.push(reply.id)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}