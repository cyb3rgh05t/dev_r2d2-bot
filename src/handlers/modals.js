const { Client } = require("discord.js");

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client, PG, Ascii) => {

    const Table = new Ascii("Modals");
    
    (await PG(`${process.cwd().replace(/\\/g, "/")}/Modals/*/*.js`)).map(async (file) => {
        const modalFile = require(file);

        if(!modalFile.id) return;
        
        client.modals.set(modalFile.id, modalFile);
        await Table.addRow(`${modalFile.id}.js`, "✅", "Keine Probleme.");
        
    });
    console.log(Table.toString());
}