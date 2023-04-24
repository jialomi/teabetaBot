const { Events, ActionRowBuilder, ButtonBuilder } = require("discord.js")

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        const discordChannel = client.channels.cache.get("1094639960742707321")
        setInterval(async () => {
            try {
                const sentMessage = await discordChannel.messages.fetch("1100106042412650598")
                const guildId = "288378882418016256"
                const guild = client.guilds.cache.get(guildId)
                const maester = await client.guilds.cache.get(guildId).emojis.cache.find(emoji => emoji.name === 'maester');

                const allroleIds = ["288382741450588160", "716773257683927101", "288382736480337920", "438818482692423683", "455248257161887754"]
                let allmemberRoles =[];

                for (let i = 0; i < allroleIds.length; i ++) {
                    const roleId = allroleIds[i]
                    const role = guild.roles.cache.get(roleId)

                    allmemberRoles[i] = role.members.map(m => m.toString())

                    if (allmemberRoles[i].length < 2) {
                        allmemberRoles[i] = role.members.map(m => m.toString())
                    } else {
                        allmemberRoles[i] = role.members
                        .filter(m => !m.roles.cache.has("288382741450588160") && !m.roles.cache.has("716773257683927101"))
                        .map(m => m.toString())
                    }   
                }

                const morerolesButton = new ButtonBuilder()
                .setCustomId('morerolesButton')
                .setLabel("Role Guide")
                .setStyle("Primary")

                const knightapplyButton = new ButtonBuilder()
                .setCustomId("knightapplyButton")
                .setLabel("🛡️ Knight Application")
                .setStyle("Primary")

                const row3 = new ActionRowBuilder()
                .addComponents(morerolesButton, knightapplyButton)

                sentMessage.edit({ content: `${maester} <@&288382741450588160> **(President)**\n${allmemberRoles[0]}\n\n${maester} <@&288382736480337920> **(Officer)**\n${allmemberRoles[2].join(' ')}\n\n${maester} <@&438818482692423683> **(Enforcer)**\n${allmemberRoles[3].join(' ')}\n\n${maester} <@&455248257161887754> **(Captain)**\n${allmemberRoles[4].join(' ')}\n\n For more info on roles, Click the **Role Guide** button below`, components: [row3]})
        } catch (error) {
            console.error(error)
        }
        },10000)
    }
}