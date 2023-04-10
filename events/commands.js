const memberRole = "288385193285386248"
const guestRole = "615837413117526027"

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        
        if (interaction.commandName === "unverify") {
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
    }
}