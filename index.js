const { Client, Collection } = require("discord.js");
const client = new Client({intents: 131071});
const { Token } = require("./config/config.json");

client.commands = new Collection ()

require("./handlers/event")(client);
require("./handlers/commands")(client);

client.login(Token);
