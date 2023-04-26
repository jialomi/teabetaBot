const { Events, Client, GatewayIntentBits } = require("discord.js")
require("dotenv/config")

const fs = require('node:fs');
const internal = require("node:stream");
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
  ],
});

const eventsPath = path.join(__dirname, '../eventsGa');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('js'));

for(const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if(event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

client.login(process.env.TOKEN)