const { Events, EmbedBuilder, ButtonBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField,  } = require("discord.js")
const guildId = "288378882418016256"
const memberRole = "288385193285386248"
const grandcounsilRole = "288382736480337920"

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.customId === "knightapplyButton") {
            const channelName = `ticket-knight-${interaction.user.username.toLowerCase().replace(/\s+/g, "-")}`
            const catergoryID = "1095833702426230804"
            const member = await interaction.guild.members.fetch(interaction.user.id)
            console.log(channelName)
            const channelfind = interaction.guild.channels.cache.find((channelfind) => channelfind.name === channelName)

            if (!member.roles.cache.has(memberRole)) {
                interaction.reply({ content: "You must be a NORTHMEN to apply for the Knight Position", ephemeral: true})

                setTimeout(async () => {
                    await interaction.deleteReply()
                },5000)
            }
            
            if (channelfind) {
                interaction.reply({ content: "You already have an existing Application open, please do not try to make another one.", ephemeral: true })

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
                    ]
                })

                await interaction.reply({ content: `Knight Application ticket ${channel} has been created`, ephemeral: true})

                const text = interaction.user.toString() + "\nThank you for showing interest in contributing to The North as part of our staff. To Begin, please answer the following questions:\n```1. Why do you want to be a Captain of The North?\n\n2. What are some goals you have in mind if you become a Captain and how will you go about achieving them?\n\n3. What skills can you offer to The  North as a Captain? How do these skills set you apart from other applicants?\n\n4. How active are you in our community and in Trove? How many hours in a given day or week do you spend on Trove?\n\n5. How sociable would you say you are at engaging in conversation or voice chat with others? Are you comfortable initiating a conversation and keeping it going?\n\n6. Do you have any experience moderating Discord servers or any other groups outside of Trove? Please share any that apply.\n\n7. Have you ever worked on a building project in Trove? If so, please provide some examples in the form of image links.\n\n8. How often do you run delves? Will you be able to host them for our club? How frequently?\n\n9. What is your timezone?\n\n10. What languages can you speak fluently?\n\n11. Is there anything else you would like to let us know about yourself?```"

                await channel.send(text)

            } catch (error) {
                console.error(error)
            }
        }
    }
}