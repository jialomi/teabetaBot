const { Events, EmbedBuilder, ButtonBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, Collection} = require("discord.js")

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

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.customId === "giveawayModal") {

            const dbguild = await interaction.client.guilds.cache.get(giveawayDatabaseID)
            const dbchannel = await interaction.client.channels.cache.get(giveawayDatabaseChannelID)

            const giveawayDuration = interaction.fields.getTextInputValue("giveawayDuration")
            const giveawayNumberOfWinners = parseInt(interaction.fields.getTextInputValue("giveawayNumberOfWinners"))
            const giveawayPrize = interaction.fields.getTextInputValue("giveawayPrize")
            const giveawayDesc = interaction.fields.getTextInputValue("giveawayDesc")
            const giveawayChannels = interaction.fields.getTextInputValue("giveawayChannels").split(",")

            const duration = giveawayDuration.split(' ')
            const timeInSeconds = parseFloat(duration[0]) * (duration[1] === 'h' ? 3600 : 60)
            const endTime = new Date(Date.now() + timeInSeconds * 1000)
            const unixEndTimeStamp = Math.floor(endTime.getTime() / 1000)
            console.log(unixEndTimeStamp)
            console.log(new Date(Date.now()))
            console.log(endTime)

            console.log(new Date(endTime).toUTCString())

            const channel = await dbguild.channels.create({
                name: endTime.getTime(),
                type: 0,
                parent: `1098787237593878619`
            })

            const dbEmbed = new EmbedBuilder()
            .setTitle("Giveaway Database Created")
            .setFields(
                {
                    name: "Duration",
                    value: `${giveawayDuration}, ends at <t:${unixEndTimeStamp}:f>`
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
                },
                {
                    name: "Database Channel",
                    value: `${channel.id}`
                },
                {
                    name: "Number of Entries",
                    value: "0"
                },
                {
                    name: "Winner(s)",
                    value: 'Not Decided'
                },
                {
                    name: "Message IDs",
                    value: 'None'
                },
                {
                    name: "Channel IDs",
                    value: `${interaction.fields.getTextInputValue("giveawayChannels")}`
                }
            )

            const dbmessage = await dbchannel.send({ embeds: [dbEmbed] })

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
                    value: `<t:${unixEndTimeStamp}:R>`,
                },
                {
                    name: "Hosted By",
                    value: `<@${interaction.user.id}>`
                },
                {
                    name: "Entries",
                    value: `0`
                },
            )

            const entryButton = new ButtonBuilder()
            .setCustomId("entryButton")
            .setLabel("Enter")
            .setStyle("Success")

            const garerollButton = new ButtonBuilder()
            .setCustomId("garerollButton")
            .setLabel("Reroll")
            .setStyle("Primary")

            const row = new ActionRowBuilder()
            .setComponents(entryButton)

            const row2 = new ActionRowBuilder()
            .setComponents(garerollButton)

            let isFirstLoop = true;
            let isFirstLoopWinner = true;
            for (const channelID of giveawayChannels) {

                console.log(channelID)
                const gachannel = await interaction.client.channels.cache.get(channelID)
                const gamessage = await gachannel.send({ embeds: [giveawayEmbed], components: [row] })

                const dbembed = await dbmessage.embeds
                const embedMessage = dbembed[0]
                const gaChannelId = embedMessage.fields[9].value
                let gaMessageId = embedMessage.fields[8].value

                if (gaMessageId === 'None') {
                    gaMessageId = gamessage.id
                } else {
                    gaMessageId = `${gaMessageId},${gamessage.id}`
                }
                const updateEmbed = new EmbedBuilder()
                .setTitle("Giveaway Database Created")
                .setFields(
                    {
                        name: "Duration",
                        value: `${giveawayDuration}, ends at <t:${unixEndTimeStamp}:f>`
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
                    },
                    {
                        name: "Database Channel",
                        value: `${channel.id}`
                    },
                    {
                        name: "Number of Entries",
                        value: "0"
                    },
                    {
                        name: "Winner(s)",
                        value: 'Not Decided'
                    },
                    {
                        name: "Message IDs",
                        value: `${gaMessageId}`
                    },
                    {
                        name: "Channel IDs",
                        value: `${gaChannelId}`
                    }
                )
                dbmessage.edit({ embeds: [updateEmbed] })
                
                if (isFirstLoop) {
                    await interaction.reply({ content: "Giveaway Started", ephemeral: true })
                    isFirstLoop = false;
                }

                const timeLeft = endTime - Date.now()
                const entryCountInterval = setInterval(() => {
                    const gaEmbed = dbmessage.embeds
                    const embedMessage = gaEmbed[0]
                    let gaEntriesCount = embedMessage.fields[6].value
                    
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
                            value: `<t:${unixEndTimeStamp}:R>`,
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
                    const timeLeftInterval = endTime - Date.now()
                    if (timeLeftInterval < 10000) {
                        gamessage.edit({ embeds: [giveawayEmbed], components: [] })
                        clearInterval(entryCountInterval)
                    } else {
                        gamessage.edit({ embeds: [giveawayEmbed], components: [row] })
                    }
                },5000)
                const timeoutId = setTimeout(async () => {
                    const gaEmbed = dbmessage.embeds
                    const embedMessage = gaEmbed[0]
                    let gaEntriesCount = embedMessage.fields[6].value
                    const winner = embedMessage.fields[7].value

                    giveawayEmbed.setTitle(`${giveawayPrize}`)
                    .setDescription(`${giveawayDesc}`)
                    .setTimestamp()
                    .setFields(
                    {
                            name: "Giveaway ID",
                            value: `${dbmessage.id}`
                        },
                        {
                            name: "Ended at",
                            value: `<t:${unixEndTimeStamp}:f>`,
                        },
                        {
                            name: "Hosted By",
                            value: `<@${interaction.user.id}>`
                        },
                        {
                            name: "Winner(s)",
                            value: `${winner}`
                        },
                        {
                            name: "Entries",
                            value: `${gaEntriesCount}`
                        },
                    )
                    await gamessage.edit({ embeds: [giveawayEmbed], components: [row2] })
                    clearInterval(entryCountInterval)
                }, timeLeft)

                const timeoutId2 = setTimeout(async () => {

                    gamessage.edit({ components: [] })

                    if (isFirstLoopWinner === false ) {
                        console.log("not first loop!")
                        return
                    }

                    isFirstLoopWinner = false

                    const gaEmbed = dbmessage.embeds
                    const embedMessage = gaEmbed[0]
                    const dbParticipants = embedMessage.fields[4].value
                    const gaEntriesCount = embedMessage.fields[6].value
                    const dbMessageIDs = embedMessage.fields[8].value
                    const dbChannelIDs = embedMessage.fields[9].value

                    if (dbParticipants !== '') await channel.send(`${dbParticipants}\n`)
                    const messages = await channel.messages.fetch()
                    const totalParticipants = messages.map(msg => msg.content).join("\n")
                    console.log(totalParticipants)

                    let totalParticipantsSplit = totalParticipants.split('\n')

                    const winners = []
                    const winnersText = []
                    if (totalParticipantsSplit.length >= parseInt(giveawayNumberOfWinners)) {
                        while (winners.length < parseInt(giveawayNumberOfWinners)) {
                            const winnerNumber = random(0, totalParticipantsSplit.length-1)
                            const dbParticipantsDSplit = totalParticipantsSplit[winnerNumber].split(",")
                            const winner = await interaction.client.users.fetch(dbParticipantsDSplit[0])
                            if (!winners.includes(winner.id)) {
                                const text = `${winner.tag} from ${dbParticipantsDSplit[1]}`
                                winners.push(winner.id)
                                winnersText.push(text)
                            }
                        }
                    } else {
                        winners.push("Not Decided Yet")
                        winnersText.push("Not Decided Yet")
                    }

                    console.log(winnersText)
                    console.log(winnersText.join('\n'))

                    const embed = new EmbedBuilder()
                    .setTitle("Giveaway Database Created")
                    .setFields(
                        {
                            name: "Duration",
                            value: `${giveawayDuration}, ends at <t:${unixEndTimeStamp}:f>`
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
                            value: `${dbParticipants}`
                        },
                        {
                            name: "Database Channel",
                            value: `${channel.id}`
                        },
                        {
                            name: "Number of Entries",
                            value: `${gaEntriesCount}`
                        },
                        {
                            name: "Winner(s)",
                            value: `${winnersText.join("\n")}`
                        },
                        {
                            name: "Message IDs",
                            value: `${dbMessageIDs}`
                        },
                        {
                            name: "Channel IDs",
                            value: `${dbChannelIDs}`
                        }
                    )

                    dbmessage.edit({ embeds: [embed]})
                },timeLeft - 2000)
                /*countdownInterval = setInterval(async () => {
                    const currentTime = new Date(Date.now())
                    if (currentTime.getTime() >= endTime.getTime()) {
                        const gaEmbed = dbmessage.embeds
                        const embedMessage = gaEmbed[0]
                        const dbParticipants = embedMessage.fields[4].value
                        let gaEntriesCount = embedMessage.fields[6].value

                        await channel.send(dbParticipants)
                        const messages = await channel.messages.fetch()
                        const totalParticipants = messages.size
                        console.log(totalParticipants)

                        let winner = embedMessage.fields[5].value

                        if (winner === "") {
                            winner = "No winners"
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
                                name: "Ended at",
                                value: `<t:${unixEndTimeStamp}:f>`,
                            },
                            {
                                name: "Hosted By",
                                value: `<@${interaction.user.id}>`
                            },
                            {
                                name: "Winner(s)",
                                value: `${winner}`
                            },
                            {
                                name: "Entries",
                                value: `${gaEntriesCount}`
                            },
                        )
                        gamessage.edit({ embeds: [giveawayEmbed], components: [] })
                        clearInterval(countdownInterval)
                        clearInterval(entryCountInterval)
                        console.log("countdownInterval Cleared")
                        return;
                    }
                })*/
                /*
                const gachannel = await interaction.client.channels.cache.get(channelID)
                const gamessage = await gachannel.send({ embeds: [giveawayEmbed], components: [row] })
                
                if (isFirstLoop) {
                    await interaction.reply({ content: "Giveaway Started", ephemeral: true })
                    isFirstLoop = false;
                }

                let secondsLeft = timeInSeconds
                /*
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

                        let winner = embedMessage.fields[5].value

                        if (winner === "") {
                            winner = "No winners"
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
                                name: "Ended",
                                value: ' ',
                            },
                            {
                                name: "Hosted By",
                                value: `<@${interaction.user.id}>`
                            },
                            {
                                name: "Winner(s)",
                                value: `${winner}`
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
                    if (isFirstLoopDel) {
                        interaction.deleteReply()
                        isFirstLoopDel = false
                    }
                },5000)
                */
            }
        }
            // const gamessage = await interaction.channel.send({ embeds: [giveawayEmbed], components: [row] })

            /*
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

                    const winners = []
                    while (winners.length < giveawayNumberOfWinners) {
                        const winnerNumber = random(0, gaEntriesCount-1)
                        const gaEntriesDSplit = gaEntriesSplit[winnerNumber].split(",")
                        const winner = await interaction.client.users.fetch(gaEntriesDSplit[0])
                        if (!winners.includes(winner.tag)) {
                            const text = `${winner.tag} from ${gaEntriesDSplit[1]}`
                            winners.push(text)
                        }
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
                            name: "Ended",
                            value: ' ',
                        },
                        {
                            name: "Hosted By",
                            value: `<@${interaction.user.id}>`
                        },
                        {
                            name: "Winner(s)",
                            value: `${winners.join("\n")}`
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
            */
        

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
            const dbchannelID = dbEmbedMessage.fields[5].value
            const dbNumberOfEntries = dbEmbedMessage.fields[6].value
            const dbMessageIDs = dbEmbedMessage.fields[8].value
            const dbChannelIDs = dbEmbedMessage.fields[9].value
            let dbParticipants = dbEmbedMessage.fields[4].value

            let test = `${interaction.user.id}`

            const userID = interaction.user.id
            const serverName = interaction.guild.name
            const DBchannel = await interaction.client.channels.cache.get(dbchannelID)
            let dbchannelmessage = await DBchannel.messages.fetch()
            let dbchannelParticipants = dbchannelmessage.map(msg => msg.content).join("\n")
            
            if (dbParticipants.split("\n").some(entry => {
                const [id, server] = entry.split(",")
                return id === userID && server !== serverName
            })) {
                interaction.reply({ content: "You have already entered this giveaway from a different server.", ephemeral: true })
                return
            }

            if (dbchannelParticipants.split('\n').some(entry => {
                const [id, server] = entry.split(",")
                return id === userID && server !== serverName
            })) {
                interaction.reply({ content: "You have already entered this giveaway from a different server.", ephemeral: true })
                return
            }

            if (dbParticipants.split("\n").some(entry => {
                const [id, server] = entry.split(",")
                return id === userID && server === serverName
            })) {
                interaction.reply({ content: "You have already entered this giveaway from this server.", ephemeral: true })
                return
            }

            if (dbchannelParticipants.split('\n').some(entry => {
                const [id, server] = entry.split(",")
                return id === userID && server === serverName
            })) {
                interaction.reply({ content: "You have already entered this giveaway from this server.", ephemeral: true })
                return
            }

            if (dbParticipants === "") {
                dbParticipants = `${interaction.user.id},${interaction.guild.name}`
            } else {
                dbParticipants = dbParticipants + `\n${interaction.user.id},${interaction.guild.name}`
            }

            let dbParticipantsSplit = dbParticipants.split("\n")

            // console.log(winnersText.join("\n"))
            if (dbParticipantsSplit.length >= 10) {
                await DBchannel.send(dbParticipants)

                const resetEmbed = new EmbedBuilder()
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
                        value: ` `
                    },
                    {
                        name: "Database Channel",
                        value: `${dbchannelID}`
                    },
                    {
                        name: "Number of Entries",
                        value: `${parseInt(dbNumberOfEntries) + 1}`
                    },
                    {
                        name: "Winner(s)",
                        value: 'Not Decided'
                    },
                    {
                        name: "Message IDs",
                        value: `${dbMessageIDs}`
                    },
                    {
                        name: "Channel IDs",
                        value: `${dbChannelIDs}`
                    }
                )
                dbmessage.edit({ embeds: [resetEmbed] })
            } else {
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
                    },
                    {
                        name: "Database Channel",
                        value: `${dbchannelID}`
                    },
                    {
                        name: "Number of Entries",
                        value: `${parseInt(dbNumberOfEntries) + 1}`
                    },
                    {
                        name: "Winner(s)",
                        value: 'Not Decided'
                    },
                    {
                        name: "Message IDs",
                        value: `${dbMessageIDs}`
                    },
                    {
                        name: "Channel IDs",
                        value: `${dbChannelIDs}`
                    }
                )
                dbmessage.edit({ embeds: [embed] })
            }

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
                    value: `${parseInt(dbNumberOfEntries) + 1}`
                }
            )

            gamessage.edit({ embeds: [gaEmbeds]})

            interaction.reply({content: "You have successfully entered the Giveaway", ephemeral: true})

            setTimeout(async () => {
                interaction.deleteReply()
            },5000)
        }

        if (interaction.customId === "garerollButton") {

            const gaEmbed = await interaction.message.embeds
            const embedMessage = gaEmbed[0]
            const gaPrize = embedMessage.title
            const gaDescription = embedMessage.description
            const gaID = embedMessage.fields[0].value
            const gaDuration = embedMessage.fields[1].value
            const gaHost = embedMessage.fields[2].value
            const gaEntries = embedMessage.fields[4].value

            const dbchannel = await interaction.client.channels.cache.get(giveawayDatabaseChannelID)
            const dbmessage = await dbchannel.messages.fetch(gaID)

            const dbEmbed = dbmessage.embeds
            const dbEmbedMessage = dbEmbed[0]
            const dbTitle = dbEmbedMessage.title
            const dbDuration = dbEmbedMessage.fields[0].value
            const giveawayNumberOfWinners = parseInt(dbEmbedMessage.fields[1].value)
            const dbPrize = dbEmbedMessage.fields[2].value
            const dbDescription = dbEmbedMessage.fields[3].value
            const dbParticipants = dbEmbedMessage.fields[4].value
            const dbchannelID = dbEmbedMessage.fields[5].value
            const dbNumberOfEntries = dbEmbedMessage.fields[6].value
            const gaMessageIDs = dbEmbedMessage.fields[8].value.split(",")
            const gaChannelIDs = dbEmbedMessage.fields[9].value.split(",")

            const channel = await interaction.client.channels.cache.get(dbchannelID)
            const messages = await channel.messages.fetch()
            const totalParticipants = messages.map(msg => msg.content).join("\n")

            let totalParticipantsSplit = totalParticipants.split("\n")

            const winners = []
            const winnersText = []
            if (totalParticipantsSplit.length >= parseInt(giveawayNumberOfWinners)) {
                while (winners.length < parseInt(giveawayNumberOfWinners)) {
                    const winnerNumber = random(0, totalParticipantsSplit.length-1)
                    const dbParticipantsDSplit = totalParticipantsSplit[winnerNumber].split(",")
                    const winner = await interaction.client.users.fetch(dbParticipantsDSplit[0])
                    if (!winners.includes(winner.id)) {
                        const text = `${winner.tag} from ${dbParticipantsDSplit[1]}`
                        winners.push(winner.id)
                        winnersText.push(text)
                    }
                }
            } else {
                winners.push("Not Decided Yet")
                winnersText.push("Not Decided Yet")
            }

            const updateEmbed = new EmbedBuilder()
            .setTitle(`${dbTitle}`)
            .setFields(
                {
                    name: "Duration",
                    value: `${dbDuration}`
                },
                {
                    name: "Number of Winners",
                    value: `${giveawayNumberOfWinners}`
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
                },
                {
                    name: "Database Channel",
                    value: `${dbchannelID}`
                },
                {
                    name: "Number of Entries",
                    value: `${dbNumberOfEntries}`
                },
                {
                    name: "Winner(s)",
                    value: `${winnersText.join("\n")}`
                },
                {
                    name: "Message IDs",
                    value: `${dbEmbedMessage.fields[8].value}`
                },
                {
                    name: "Channel IDs",
                    value: `${dbEmbedMessage.fields[9].value}`
                }
            )

            await dbmessage.edit({ embeds: [updateEmbed] })

            let i = 0;

            for (const channelID of gaChannelIDs) {
                
                const channel = await interaction.client.channels.cache.get(channelID)
                const gamessage = await channel.messages.fetch(gaMessageIDs[i])
                i = i + 1

                const embed = new EmbedBuilder()
                .setTitle(`${gaPrize}`)
                .setDescription(`${gaDescription}`)
                .setFields(
                    {
                        name: "Giveaway ID",
                        value: `${gaID}`
                    },
                    {
                        name: "Ended at",
                        value: `${gaDuration}`
                    },
                    {
                        name: "Hosted By",
                        value: `${gaHost}`
                    },
                    {
                        name: "Winner(s)",
                        value: `${winnersText.join("\n")}`
                    },
                    {
                        name: "Entries",
                        value: `${gaEntries}`
                    }
                )

                gamessage.edit({ embeds: [embed]})

                gamessage.reply({ content: `Winner rerolled to ${winnersText.join("\n")}`})
                
            }

            interaction.reply({ content: "Successful Reroll", ephemeral: true })

            setTimeout(async () => {
                interaction.deleteReply()
            },5000)
        }
    }
}