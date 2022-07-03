const { Client, Collection } = require("discord.js");
const client = new Client({intents: 131071});
const { Token } = require("./config/config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table")
//const path = require("path");
//require('dotenv').config({ path: path.join(__dirname, `./config/.env`)});

client.tools = require("./console/errorEmbed");
client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();
client.userSettings = new Collection();


["events", "commands", "buttons"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii)
});

client.login(Token).then(() => {
    console.log(`✅ Client logged in as "${client.user.tag}"`);
}).catch((err) => {
    console.log(err)
});
