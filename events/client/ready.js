const { Client } = require("discord.js");
const mongoose = require("mongoose");
const User = require("../../src/schemas/userDB");
const { DatabaseUrl, Token, ClientId, Prefix } = require("../../src/config/config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
     async execute(client) {
        //console.log(`----`);
        //console.log(`🟧 Starting Client ....`);
        //console.log(`🟧 Getting Client Token ....`);
        //console.log(`----`);
        //console.log(`✅ Client Token = "${Token}"`);
        //console.log(`----`);
        //console.log(`🟧 Getting Client App ID ....`);
        //console.log(`----`);
        //console.log(`✅ Client App ID = "${ClientId}"`);
        //console.log(`----`);
        //console.log(`🟧 Getting Client Prefix ....`);
        //console.log(`----`);
        console.log(`✅ Client Prefix = "${Prefix}"`);
        //console.log(`----`);
        console.log("✅ Client is now ready and online!")
        client.user.setActivity("IN DEV.", {type: "WATCHING"})

        if (!DatabaseUrl) return;
        mongoose.connect(DatabaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("✅ Client is now connected to the database!")
        }).catch((err) => {
            console.log(err)
        });

        const users = await User.find();
        for (let user of users) {
          client.userSettings.set(user.Id, user);
        }

        require('../../src/handlers/premium')(client)
    }
}