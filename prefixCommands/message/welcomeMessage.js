const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../../src/config/.env`)});
const GuildSettings = require("../../src/schemas/settingsDB.js");
const chalk = require("chalk");

module.exports = {
    name: "messageCreate",
    description: "welcome-message",
    /**
     * 
     * @param {MessageCreate} message
     */
     async execute(message) {
      try {

        let storedSettings = await GuildSettings.findOne({ GuildID: message.guild.id });
        if (!storedSettings) {
          // If there are no settings stored for this guild, we create them and try to retrive them again.
          const newSettings = new GuildSettings({ GuildID: message.guild.id, });
          await newSettings.save().catch((e) => {
            console.log(e);
          });
          storedSettings = await GuildSettings.findOne({ GuildID: message.guild.id });
        }
        const prefix = storedSettings.Prefix;
        if (!message.content.startsWith(prefix) || message.author.bot) return;
         
         if (message.content.startsWith(`${prefix}welcome-message`)) {
            message.channel.send({ content: `=======================================\n\n**Willkommen bei <:streamnet:855771751820296232> StreamNet's Discord Server - EIn täglich upgedateter Deutsch/Englisch Plex Media Server.**\n\n=======================================\n\n➡️  Wie bekomme ich Zutritt zum **StreamNet** Server ?\n\n**1. **Bestätige die** REGELN **in <#694495838013095967> !\n\n**2. **Befolge die Anweisungen für eine **EINLADUNG** in <#825352124547989544> !\n\n**3. **Folge den Anweisungen vom **<@825635238188285952>** !\n\n**4. **Akzeptiere die **PLEX-EINLADUNG** für StreamNet in deiner **PLEX EMAIL BOX**! (für manuelle Aktivierung <#864928903000227850> )\n\nViel Spass beim streamen.. <:streamnet:855771751820296232>`});
           }
         } catch (error) {
            message.channel.send("Some Error Occured");
            console.log(`${chalk.red("[ERROR] ")}` + error)
           }
     } 
  }