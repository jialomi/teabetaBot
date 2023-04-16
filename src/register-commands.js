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
          name: "content-message-id",
          description: "The message you want to copy and use to edit the message being editted",
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
          name: "channel-id",
          description: "Channel ID of the channel that has the message you want to edit",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
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
      name: "ticket",
      description: "Add / Remove somoneone from the channel",
      options: [
        {
          name:"ticket-action",
          description: "Choose Add or Remove",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "Add",
              value: "Add"
            },
            {
              name: "Remove",
              value: "Remove"
            },
            {
              name: "Close",
              value: "Close"
            },
          ]
        },
        {
          name: "user",
          description: "Discord User you want to add / remove from the ticket",
          type: ApplicationCommandOptionType.User,
          required: false
        }
      ]
    },

  {
    name: "ban",
    description: "Ban a user",
    options: [
      {
        name: "user",
        description: "User you want to ban",
        required: true,
        type: ApplicationCommandOptionType.User
      },
      {
        name: "reason",
        description: "Ban reason",
        required: true,
        type: ApplicationCommandOptionType.String
      }
    ]
  },

  {
    name: "unban",
    description: "Unban a user",
    options: [
      {
        name: "user",
        description: "User you want to unban",
        required: true,
        type: ApplicationCommandOptionType.User
      },
      {
        name: "ban-id",
        description: "Ban ID of the user",
        required: true,
        type: ApplicationCommandOptionType.String
      }
    ]
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