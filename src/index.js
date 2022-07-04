const { Client, Collection } = require("discord.js");
const client = new Client({intents: 131071});
//const { Token } = require("./config/config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table")
const chalk = require("chalk");
const path = require("path");
const colors = require("colors")
require('dotenv').config({ path: path.join(__dirname, `./config/.env`)});

client.tools = require("./console/errorEmbed");
client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();
client.userSettings = new Collection();
client.prefixCommands = new Collection();

["events", "commands", "prefixCommands", "buttons"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii)
});

client.login(process.env.TOKEN).then(() => {
    console.log(`┌─────────────────────────────────────────────────────────────┐`.bold.blue)
	console.log(`│                                                             │`.bold.blue)
	console.log(`│                                                             │`.bold.blue)
	console.log(`│               `.blue.bold,`Logged in as ${client.user.tag}`.green.bold,`                 │`.bold.blue)
	console.log(`│                                                             │`.bold.blue)
	console.log(`│                                                             │`.bold.blue)
	console.log(`└─────────────────────────────────────────────────────────────┘`.bold.blue)
}).catch((err) => {
    console.log(err)
});
