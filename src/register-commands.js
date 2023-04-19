require("dotenv/config");
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "gcreate",
    description: "create a Giveaway",
  },
]

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commandds...");

    await rest.put(
      Routes.applicationCommands(
        process.env.CLIENT_ID,
      ),
      { body: commands }
    );

    console.log("Slash commands were registered");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();