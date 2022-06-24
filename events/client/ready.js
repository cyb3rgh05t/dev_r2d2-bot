const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database, Token, ClientId, Prefix } = require("../../config/config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log(`Starting Bot ....`);
        console.log(`Getting Bot Token ....`);
        console.log(`✔ Bot Token = "${Token}"`);
        console.log(`Getting Client App ID ....`);
        console.log(`✔ Client App ID = "${ClientId}"`);
        console.log(`Getting Bot Prefix ....`);
        console.log(`✔ Bot Prefix = "${Prefix}"`);
		console.log(`✔ Logged in as "${client.user.tag}"`);
        console.log("✔ Bot is now ready and online!")
        client.user.setActivity("StreamNet", {type: "WATCHING"})

        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("✔ Bot is now connected to the database!")
        }).catch((err) => {
            console.log(err)
        });
    }
}