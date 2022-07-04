const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../../src/config/.env`)});
const GuildSettings = require("../../src/schemas/settingsDB.js");
const chalk = require("chalk");

module.exports = {
    name: "messageCreate",
    description: "rules-image",
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
         
        if (message.content.startsWith(`${prefix}rules-image`)) {
            message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_RULES.png.png?raw=true"]});
          }
     } catch (error) {
			message.channel.send("Some Error Occured");
			console.log(`${chalk.red("[ERROR] ")}` + error)
		}
  } 
}