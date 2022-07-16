const { Client, Collection } = require("discord.js");
const client = new Client({intents: 131071});

const { token } = require("./config/config.json");

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table")
const colors = require("colors");

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client, {
    youtubeDL: false,
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

["giveawaySys"].forEach(system => {
    require(`../systems/${system}`)(client)
});

["events", "commands", "prefixcmd", "buttons", "modals"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii)
});

client.tools = require("./console/errorEmbed");
client.commands = new Collection();
client.buttons = new Collection();
client.cooldowns = new Collection();
client.userSettings = new Collection();
client.prefixcmd = new Collection();
client.modals = new Collection();

module.exports = client;


client.login(token).then(() => {
}).catch((err) => {
    console.log(`[ERROR]`.red.bold, err)
});
