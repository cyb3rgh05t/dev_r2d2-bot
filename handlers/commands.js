const { Perms } = require("../validation/permissions");
const { client } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table")
const { GuildId } = require("../config/config.json");


module.exports = async(client) => {
  const Table = new Ascii("Command Loaded");

  CommandsArray = [];
  
  (await PG(`${(process.cwd().replace(/\\/g, "/"))}/commands/*/*.js`)).map(async (file) => {
    const command = require(file);

    if(!command.name)
      return Table.addRow(file.split("/")[7], "✖ FAILED", "missing a name.")

    if(!command.description)
      return Table.addRow(command.name, "✖ FAILED", "missing a description.")

    if(command.permission) {
      if(Perms.includes(command.permission))
        command.defaultPermission = false;
      else
        return Table.addRow(command.name, "✖ FAILED", "Permission is invalid.")
    }

    client.commands.set(command.name, command);
    CommandsArray.push(command);

    await Table.addRow(command.name,"✔ SUCCESSFUL");
    
  });

  console.log(Table.toString());
     
    // PERMISSION CHECK //

    client.on('ready', async () => {
        const mainGuild = await client.guilds.cache.get(GuildId);
        mainGuild.commands.set(CommandsArray);
    });

}