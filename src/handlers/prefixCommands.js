const { Client } = require("discord.js");
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../config/.env`)});
const { Events } = require("../validation/eventNames");

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Prefix Command Handler");

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/prefixCommands/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.description || "MISSING"}`, `🟥 Event name is either invalid or missing: ${L[6] + `/` + L[7]}`);
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.description, "🟩 LOADED")
    });

    console.log(Table.toString());
}