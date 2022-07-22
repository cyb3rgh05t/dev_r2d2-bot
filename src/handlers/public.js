const colors = require("colors");

/**
 * 
 * @param {Client} client 
 */
module.exports = async(client, PG, Ascii) => {
  const Table = new Ascii("Public Commands");
    const public_CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/commands/*/*.js`)).map(async (file) => {
        const public_command = require(file);
        if (public_command.length <= 0) return console.log("[WARNING] No PUBLIC COMMANDS Found".yellow.bold);


            if(public_command.public) {
                public_CommandsArray.push(public_command);
                await Table.addRow(public_command.name,"🟩 LOADED");
                //console.log(`Loaded ${public_command.name.toUpperCase()} from ${file.split("/").pop()}`)
            }
    });
    console.log(Table.toString());
};
