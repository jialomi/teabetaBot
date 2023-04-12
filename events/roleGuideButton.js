const { Events, ActionRowBuilder, ButtonBuilder } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        
        // More Roles Button Pressed
        if (interaction.customId === "morerolesButton") {
            
            const Weirwood = await interaction.guild.emojis.cache.find(emoji => emoji.name === "Weirwood")
            const movie_camera = "🎥"
            const rooGift = await interaction.guild.emojis.cache.find(emoji => emoji.name === 'rooGift')
            const pinata = await interaction.guild.emojis.cache.find(emoji => emoji.name === 'pinata')
            const Stark = await interaction.guild.emojis.cache.find(emoji => emoji.name === 'Stark')
            const robot = "🤖"
            const Mastery = await interaction.guild.emojis.cache.find(emoji => emoji.name === 'Mastery')
            const game_die = "🎲"

            await interaction.reply({content:"https://cdn.discordapp.com/attachments/699091549614506004/699105854833819668/discord_roles.png", ephemeral:true})

            const movie_cameraButton = new ButtonBuilder()
            .setCustomId('movie_cameraButton')
            .setLabel(` `)
            .setEmoji(movie_camera)
            .setStyle("Primary")

            const rooGiftButton = new ButtonBuilder()
            .setCustomId('rooGiftButton')
            .setLabel(` `)
            .setEmoji(rooGift.id)
            .setStyle("Primary")

            const pinataButton = new ButtonBuilder()
            .setCustomId('pinataButton')
            .setLabel(` `)
            .setEmoji(pinata.id)
            .setStyle("Primary")

            const StarkButton = new ButtonBuilder()
            .setCustomId('StarkButton')
            .setLabel(` `)
            .setEmoji(Stark.id)
            .setStyle("Primary")

            const robotButton = new ButtonBuilder()
            .setCustomId('robotButton')
            .setLabel(` `)
            .setEmoji(robot)
            .setStyle("Primary")

            const MasteryButton = new ButtonBuilder()
            .setCustomId('MasteryButton')
            .setLabel(` `)
            .setEmoji(Mastery.id)
            .setStyle("Primary")

            const game_dieButton = new ButtonBuilder()
            .setCustomId('game_dieButton')
            .setLabel(` `)
            .setEmoji(game_die)
            .setStyle("Primary")


            const row = new ActionRowBuilder()
            .addComponents(movie_cameraButton, rooGiftButton, pinataButton, StarkButton, robotButton)

            const row2 = new ActionRowBuilder()
            .addComponents(MasteryButton, game_dieButton)

            await interaction.followUp({content: `${Weirwood} **Staff Roles:**\n\n• <@&288382741450588160>: Leader of THE NORTH\n• <@&716773257683927101>: THE NORTH's second in command\n• <@&288382736480337920>: THE NORTH's leadership counsil\n• <@&438818482692423683>:\Staff members responsible for moderation and delivering giveaway prizes\n• <@&455248257161887754>:Club Members who helped the club quite a lot\n\n${Weirwood} **Additional Roles:**\n\n<@&915346138075385936>: Giver of Steam games - Contact to claim Steam game winnings\n<@&585581018455605259>: Members who have boosted THE  NORTH's Discord server\n<@&605340807649689611>: Trovians who create mods\n<@&605338712049451019>: Trovians who make Trove artwork\n<@&304419017773285379>: Trovians who stream Trove or create videos of Trove\n<@&288385193285386248>: Members of THE NORTH\n\n${Weirwood} **Self-assignable roles:** click the buttons below with the appropriate emoji to receive/remove the roles.\n\n**Notifications:** (anyone should be able to ping these roles in <#588022249345384457>, consequences apply if pings are missused)\n• 🎥 <@&687309211319009290>: Receive a ping for official and community live streams.\n• ${rooGift} <@&686566413074300931>: Receive a ping whenever there is a club giveaway.\n• ${pinata} <@&686566519169482784>: Receive a ping whenever there is a club Piñata Party.\n• ${Stark} <@&531010852569219072>: Receive pings for club contests and events.\n• 🤖 <@&401116888345870337>: Receive a ping when there is a rampage.\n• ${Mastery} <@&686566343105052931>: Receive a ping whenever new mastery is released.\n\n**Minigames:**\n• 🎲 <@&698456536359370833>: Unlock channels for all sorts of discord minigames (includes Pokecord, Cards Against Humanity, Snail Race and other fun minigames).`, ephemeral: true, components: [row, row2]})


            
        }

        if (interaction.customId === "movie_cameraButton") {

            const role = "687309211319009290"
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (member.roles.cache.has(role)) {
                
                await member.roles.remove(role)

                await interaction.reply({content: `<@&${role}> role has been removed from you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            } else {
                
                await member.roles.add(role)

                await interaction.reply({content: `<@&${role}> role has been added to you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            }
        }

        if (interaction.customId === "rooGiftButton") {

            const role = "686566413074300931"
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (member.roles.cache.has(role)) {
                
                await member.roles.remove(role)

                await interaction.reply({content: `<@&${role}> role has been removed from you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            } else {
                
                await member.roles.add(role)

                await interaction.reply({content: `<@&${role}> role has been added to you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            }
        }

        if (interaction.customId === "pinataButton") {

            const role = "686566519169482784"
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (member.roles.cache.has(role)) {
                
                await member.roles.remove(role)

                await interaction.reply({content: `<@&${role}> role has been removed from you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            } else {
                
                await member.roles.add(role)

                await interaction.reply({content: `<@&${role}> role has been added to you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            }
        }

        if (interaction.customId === "StarkButton") {

            const role = "531010852569219072"
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (member.roles.cache.has(role)) {
                
                await member.roles.remove(role)

                await interaction.reply({content: `<@&${role}> role has been removed from you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            } else {
                
                await member.roles.add(role)

                await interaction.reply({content: `<@&${role}> role has been added to you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            }
        }

        if (interaction.customId === "robotButton") {

            const role = "401116888345870337"
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (member.roles.cache.has(role)) {
                
                await member.roles.remove(role)

                await interaction.reply({content: `<@&${role}> role has been removed from you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            } else {
                
                await member.roles.add(role)

                await interaction.reply({content: `<@&${role}> role has been added to you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            }
        }

        if (interaction.customId === "MasteryButton") {

            const role = "686566343105052931"
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (member.roles.cache.has(role)) {
                
                await member.roles.remove(role)

                await interaction.reply({content: `<@&${role}> role has been removed from you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            } else {
                
                await member.roles.add(role)

                await interaction.reply({content: `<@&${role}> role has been added to you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            }
        }

        if (interaction.customId === "game_dieButton") {

            const role = "698456536359370833"
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (member.roles.cache.has(role)) {
                
                await member.roles.remove(role)

                await interaction.reply({content: `<@&${role}> role has been removed from you`, ephemeral: true})

                setTimeout(async () => {
                    try {
                        await interaction.deleteReply()
                    } catch (error) {
                        console.error(error)
                    }
                }, 5000)
            } else {
                
                await member.roles.add(role)

                await interaction.reply({content: `<@&${role}> role has been added to you`, ephemeral: true})

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
}