const { Perms } = require("../validation/permissions");
const { Client } = require("discord.js");
//const { GuildId } = require("../config/config.json");
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../config/.env`)});

/**
 * 
 * @param {Client} client 
 */
module.exports = async(client, PG, Ascii) => {
  const Table = new Ascii("Commands Handler");

  CommandsArray = [];
  
  (await PG(`${(process.cwd().replace(/\\/g, "/"))}/commands/*/*.js`)).map(async (file) => {
    const command = require(file);

    if(!command.name)
      return Table.addRow(file.split("/")[7], "🟥 FAILED", "missing a name.")

    if(!command.type && !command.description)
      return Table.addRow(command.name, "🟥 FAILED", "missing a description.")

    if(command.permission) {
      if(Perms.includes(command.permission))
        command.defaultPermission = false;
      else
        return Table.addRow(command.name, "🟥 FAILED", "Permission is invalid.")
    }

    client.commands.set(command.name, command);
    CommandsArray.push(command);

    await Table.addRow(command.name,"🟩 LOADED");
    
  });

  console.log(Table.toString());
     
    // PERMISSION CHECK //

    client.on('ready', async () => {
        const mainGuild = await client.guilds.cache.get(process.env.GUILD_ID);
        mainGuild.commands.set(CommandsArray);
    });

}