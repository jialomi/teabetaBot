const { Events, ActivityType } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        client.user.setActivity({
            name: "over servers",
            type: ActivityType.Watching,
        })
        console.log(`${client.user.tag} is live`);

        setInterval(() => {
            let memberCount = 0;
            for (const guild of client.guilds.cache) {
                memberCount = memberCount + guild[1].memberCount
            }

            client.user.setActivity({
                name: `${memberCount} Users 👮‍♂️`,
                type: ActivityType.Watching,
            })
        }, 1000 * 60 * 10)
    }
}