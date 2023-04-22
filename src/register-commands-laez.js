require("dotenv/config");
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        name: "test",
        description: "test"
    }
]

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commandds...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID2
      ),
      { body: commands }
    );

    console.log("Slash commands were registered");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();