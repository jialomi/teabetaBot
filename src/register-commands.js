require("dotenv/config");
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        name: "unverify",
        description: "Unverify a discord user",
        options: [
            {
                name: "discord-user",
                description: "Discord User",
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ]
    },

    {
      name: "editmessage",
      description: "Message Editor",
      options: [
        {
          name: "channel-id",
          description: "Channel ID of the channel that has the message you want to edit",
          type: ApplicationCommandOptionType.String,
          required: true
        },
        {
          name: "message-id",
          description: "Message ID of the message you want to edit",
          type: ApplicationCommandOptionType.String,
          required: true
        },
        {
          name: "content-message-id",
          description: "The message you want to copy and use to edit the message being editted",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },

    {
      name: "say",
      description: "Makes Tea Beta send a message",
      options: [
        {
          name: "content",
          description: "Content of the message",
          type: ApplicationCommandOptionType.String,
        },
      ]
    },

    {
      name: "closeticket",
      description: "Closes Application Ticket",
    }
]

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commandds...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands were registered");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();