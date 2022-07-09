const client = require('../../src/index');
const { MessageEmbed } = require("discord.js");
const GuildSettings = require('../../src/schemas/settingsDB');
const GuildCommands = require('../../src/schemas/commandsDB');
const colors = require("colors");

module.exports = {
    name: "messageCreate",

async execute(message) {
    let storedSettings = await GuildSettings.findOne({
        GuildID: message.guild.id,
      });
      if (!storedSettings) {
        const newSettings = new GuildSettings({
          GuildID: message.guild.id,
        });
        await newSettings.save().catch((e) => {
          console.log(e);
        });
        storedSettings = await GuildSettings.findOne({ GuildID: message.guild.id });
      }

      const prefix = storedSettings.Prefix;
      if (message.content.indexOf(prefix) !== 0) return;
      
    if (message.author.bot || !message.guild) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
        const cmd = client.prefixcmd.get(command) || client.prefixcmd.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if (!cmd) return;
        try {

            if (cmd.owner && message.author.id !== client.config.OwnerId) {
                return message.reply({embeds: [new MessageEmbed()
                  .setColor("RED")
                  .setFooter({text: `Some Error Occured`})
                  .setTitle("Your are not allowed to execute this command")
                  .setDescription("You Should be one of the bot owners to use this command")]
                }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, "You Are not Allowed to execute this command", 3000)}).catch((e) => {console.log(String(e).grey)});
              }

            if (cmd.permissions && cmd.permissions.length > 0 && !message.member.permissions.has(cmd.permissions)) {
                return message.reply({ embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setFooter({text: `Some Error Occured`})
                    .setTitle("Your are not allowed to execute this command")
                    .setDescription("You Dont Have Enough Permissons to use this command")]
                }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, "You Are not Allowed to execute this command", 3000)}).catch((e) => {console.log(String(e).grey)});
            }

            let check = await GuildCommands.findOne({ GuildID: message.guild.id, })
          
            if(check && check.cmds && check.cmds.includes(cmd.name)) {
              message.channel.send("Command Disabled")
            } else {
              cmd.run(client, message, args);
            }

        } catch (error) {
          console.log(`[ERROR]`.red.bold, error)
        }

	},
};