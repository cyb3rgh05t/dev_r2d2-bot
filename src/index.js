const { Client, Collection } = require("discord.js");
const client = new Client({intents: 131071});

const { token } = require("./config/config.json");

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table")
const colors = require("colors");

module.exports = client;

client.tools = require("./console/errorEmbed");
client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();
client.userSettings = new Collection();
client.prefixcmd = new Collection();

["events", "commands", "prefixcmd", "buttons"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii)
});


client.login(token).then(() => {
}).catch((err) => {
    console.log(`[ERROR]`.red.bold, err)
});
