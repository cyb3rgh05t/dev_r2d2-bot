const { Client, Collection } = require("discord.js");
const client = new Client({intents: 131071});
const { Token } = require("./config/config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table")

client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();

["events", "commands", "buttons"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii)
});

client.login(Token).then(() => {
    console.log(`✅ Client logged in as "${client.user.tag}"`);
}).catch((err) => {
    console.log(err)
});
