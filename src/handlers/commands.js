const { Perms } = require("../validation/permissions");
const { Client } = require("discord.js");
const client = require("../../src/index");
const colors = require("colors");

/**
 * 
 * @param {Client} client 
 */
module.exports = async(client, PG, Ascii) => {
  const Table = new Ascii("Commands Handler");

  CommandsArray = [];
  
  (await PG(`${(process.cwd().replace(/\\/g, "/"))}/commands/*/*.js`)).map(async (file) => {
    const command = require(file);
    if (command.length <= 0) return console.log("No SLASHCOMMANDS Found".yellow.bold);
    
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
        const MainGuild = await client.guilds.cache.get(client.config.GuildId);
        MainGuild.commands.set(CommandsArray)
      /*.then(async (command) => {
          const Roles = (commandName) => {
            const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
            if(!cmdPerms) return null;

            return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
          }

          const fullPermissions = command.reduce((accumulator, r) => {
            const roles =Roles(r.name);
            if(!roles) return accumulator;
            
            const permissions = roles.reduce((a, r) => {
              return [...a, {id: r.id, type: "ROLE", permission: true}]
            }, []);

            return [...accumulator, {id: r.id, permissions}]
          }, []);

          await MainGuild.commands.permissions.set({ fullPermissions });
        });
      */
    });

}