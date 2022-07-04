const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../../src/config/.env`)});
const GuildSettings = require("../../src/schemas/settingsDB.js");
const chalk = require("chalk");

module.exports = {
    name: "messageCreate",
    description: "invite-message",
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
         
         if (message.content.startsWith(`${prefix}invite-message`)) {
            message.channel.send({ content: `**SPENDEN** sind das A und O damit dieses **Projekt** am Leben bleibt.\n\nDeshalb frage ich für jede **Server Einladung** eine kleinde **Spende** um die Server und alles was ansteht zu bezahlen...\n\n➡️  Betätige eine **Spende** indem du den Anweisungen in <#912755161078849598> folgst.\n\n➡️  Nach einer **Spende** wird der  <@825635238188285952>  dir per** PM **schreiben. Folge den **ANWEISUNGEN** des **BOTS**.***(dies kann bis zu 24h dauern)***\n\n➡️  **NACHDEM** du hinzugefügt worden bist, kanst du die **EINLADUNG** in deiner **MAILBOX** *(Mailbox der Email welsche du dem Bot angegeben hast)* akzeptieren.\n***(sollte der Link in der email nicht klappen, dann kanst du die Einladung auch manuel akzeptieren. Mehr dazu im  <#864928903000227850>***)`});
          }
         } catch (error) {
            message.channel.send("Some Error Occured");
            console.log(`${chalk.red("[ERROR] ")}` + error)
           }
     } 
  }