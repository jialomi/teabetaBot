const { Events, EmbedBuilder, ButtonBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require("discord.js")

const guildId = "288378882418016256"
const memberRole = "288385193285386248"
const guestRole = "615837413117526027"
const grandcounsilRole = "288382736480337920"
const kingsguardRole = "438818482692423683"
const knightRole = "455248257161887754"
const staffRole = "623160704492634112"
const devRole = "1095126923740463106"
const adminRoleId = "570764875350147092"
const testinboxChannelId = "1094636463011930215"
const backupinboxChannelId = "1095111479449092276"
const inboxChannelId = "1095111479449092276"
const giveawayDatabaseID = "1097357158452047952"
const giveawayDatabaseChannelID = "1097358125008429147"

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - hours * 3600) / 60)
    const secondsLeft = seconds % 60
    return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${secondsLeft}s`
}

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.customId === "giveawayModal") {

            const dbguild = await interaction.client.guilds.cache.get(giveawayDatabaseID)
            const dbchannel = await interaction.client.channels.cache.get(giveawayDatabaseChannelID)

            const giveawayDuration = interaction.fields.getTextInputValue("giveawayDuration")
            const giveawayNumberOfWinners = interaction.fields.getTextInputValue("giveawayNumberOfWinners")
            const giveawayPrize = interaction.fields.getTextInputValue("giveawayPrize")
            const giveawayDesc = interaction.fields.getTextInputValue("giveawayDesc")

            const dbEmbed = new EmbedBuilder()
            .setTitle("Giveaway Database Created")
            .setFields(
                {
                    name: "Duration",
                    value: `${giveawayDuration}`
                },
                {
                    name: "Number Of Winners",
                    value: `${giveawayNumberOfWinners}`
                },
                {
                    name: "Prize",
                    value: `${giveawayPrize}`
                },
                {
                    name: "Description",
                    value: `${giveawayDesc}`
                },
                {
                    name: "Participants",
                    value: ` `
                }
            )

            const dbmessage = await dbchannel.send({ embeds: [dbEmbed] })

            const duration = giveawayDuration.split(' ')
            const timeInSeconds = parseFloat(duration[0]) * (duration[1] === 'h' ? 3600 : 60)

            const giveawayEmbed = new EmbedBuilder()
            .setTitle(`${giveawayPrize}`)
            .setDescription(`${giveawayDesc}`)
            .setTimestamp()
            .setFields(
                {
                    name: "Giveaway ID",
                    value: `${dbmessage.id}`
                },
                {
                    name: "Ends in",
                    value: `${giveawayDuration}`,
                },
                {
                    name: "Hosted By",
                    value: `<@${interaction.user.id}>`
                },
                {
                    name: "Entries",
                    value: ` `
                },
            )

            const entryButton = new ButtonBuilder()
            .setCustomId("entryButton")
            .setLabel("Enter")
            .setStyle("Success")

            const row = new ActionRowBuilder()
            .setComponents(entryButton)

            const gamessage = await interaction.channel.send({ embeds: [giveawayEmbed], components: [row] })

            await interaction.reply({ content: "Giveaway Started", ephemeral: true })

            let secondsLeft = timeInSeconds

            const countdownInterval = setInterval(async () => {
                secondsLeft--
                const timeLeft = secondsLeft > 0 ? formatTime(secondsLeft) : 'Ended'
                const gachannel = await interaction.client.channels.cache.get(giveawayDatabaseChannelID)
                const gamessages = await gachannel.messages.fetch(dbmessage.id)
                const gaEmbed = gamessages.embeds
                const embedMessage = gaEmbed[0]
                let gaEntries = embedMessage.fields[4].value
                let gaEntriesSplit = gaEntries.split("\n")
                let gaEntriesCount = 0;

                if (gaEntries === '') {
                    gaEntriesCount = 0
                } else {
                    gaEntriesCount = gaEntriesSplit.length
                }

                giveawayEmbed.setTitle(`${giveawayPrize}`)
                .setDescription(`${giveawayDesc}`)
                .setTimestamp()
                .setFields(
                    {
                        name: "Giveaway ID",
                        value: `${dbmessage.id}`
                    },
                    {
                        name: "Ends in",
                        value: timeLeft,
                    },
                    {
                        name: "Hosted By",
                        value: `<@${interaction.user.id}>`
                    },
                    {
                        name: "Entries",
                        value: `${gaEntriesCount}`
                    },
                )
                gamessage.edit({ embeds: [giveawayEmbed], components: [row] })
                if (secondsLeft <= 0) {
                    const winnerNumber = random(0, gaEntriesCount-1)
                    const winner = await interaction.client.users.fetch(gaEntriesSplit[winnerNumber])
                    giveawayEmbed.setTitle(`${giveawayPrize}`)
                    .setDescription(`${giveawayDesc}`)
                    .setTimestamp()
                    .setFields(
                        {
                            name: "Giveaway ID",
                            value: `${dbmessage.id}`
                        },
                        {
                            name: "Ended",
                            value: ' ',
                        },
                        {
                            name: "Hosted By",
                            value: `<@${interaction.user.id}>`
                        },
                        {
                            name: "Winner(s)",
                            value: `${winner.username}`
                        },
                        {
                            name: "Entries",
                            value: `${gaEntriesCount}`
                        },
                    )
                    gamessage.edit({ embeds: [giveawayEmbed], components: [] })
                    clearInterval(countdownInterval)
                }
            },1000)

            setTimeout(async () => {
                interaction.deleteReply()
            },5000)
        }

        if (interaction.customId === "entryButton") {

            const gaEmbed = await interaction.message.embeds
            const embedMessage = gaEmbed[0]
            const gaPrize = embedMessage.title
            const gaDescription = embedMessage.description
            const gaID = embedMessage.fields[0].value
            const gaDuration = embedMessage.fields[1].value
            const gaHost = embedMessage.fields[2].value

            const dbchannel = await interaction.client.channels.cache.get(giveawayDatabaseChannelID)
            const dbmessage = await dbchannel.messages.fetch(gaID)

            const dbEmbed = dbmessage.embeds
            const dbEmbedMessage = dbEmbed[0]
            const dbDuration = dbEmbedMessage.fields[0].value
            const dbNumberOfWinners = dbEmbedMessage.fields[1].value
            const dbPrize = dbEmbedMessage.fields[2].value
            const dbDescription = dbEmbedMessage.fields[3].value
            let dbParticipants = dbEmbedMessage.fields[4].value

            if (dbParticipants.split("\n").includes(interaction.user.id)) {
                interaction.reply({ content: "You are already inside the Giveaway", ephemeral: true })

                setTimeout(async () => {
                    interaction.deleteReply()
                },5000)

                return
            }

            if (dbParticipants === "") {
                dbParticipants = `${interaction.user.id}`
            } else {
                dbParticipants = dbParticipants + `\n${interaction.user.id}`
            }
            

            const embed = new EmbedBuilder()
            .setTitle("Giveaway Database Created")
            .setFields(
                {
                    name: "Duration",
                    value: `${dbDuration}`
                },
                {
                    name: "Number Of Winners",
                    value: `${dbNumberOfWinners}`
                },
                {
                    name: "Prize",
                    value: `${dbPrize}`
                },
                {
                    name: "Description",
                    value: `${dbDescription}`
                },
                {
                    name: "Participants",
                    value: `${dbParticipants}`
                }
            )
            dbmessage.edit({ embeds: [embed] })

            dbParticipants = dbParticipants.split("\n")
            
            const gamessage = await interaction.channel.messages.fetch(interaction.message.id)

            const gaEmbeds = new EmbedBuilder()
            .setTitle(`${gaPrize}`)
            .setDescription(`${gaDescription}`)
            .setFields(
                {
                    name: "Giveaway ID",
                    value: `${gaID}`
                },
                {
                    name: "Ends in",
                    value: `${gaDuration}`
                },
                {
                    name: "Hosted By",
                    value: `${gaHost}`
                },
                {
                    name: "Entries",
                    value: `${dbParticipants.length}`
                }
            )

            gamessage.edit({ embeds: [gaEmbeds]})

            interaction.reply({content: "You have successfully entered the Giveaway", ephemeral: true})

            setTimeout(async () => {
                interaction.deleteReply()
            },5000)
        }
    }
}