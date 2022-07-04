const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../../src/config/.env`)});

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {MessageCreate} message
     */
     async execute(message) {
        const prefix = process.env.PREFIX;
        if (!message.content.startsWith(prefix) || message.author.bot) return;
         
        if (message.content.startsWith(`${prefix}welcomeimage`)) {
            message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_DISCORD.png.png?raw=true"]});
          }
          else if (message.content.startsWith(`${prefix}donateimage`)) {
            message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_Donate.png?raw=true"]});
          }
          else if (message.content.startsWith(`${prefix}rulesimage`)) {
            message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_RULES.png.png?raw=true"]});
          }
          else if (message.content.startsWith(`${prefix}invitesimage`)) {
            message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_INVITES.png?raw=true"]});
          }
          else if (message.content.startsWith(`${prefix}dashimage`)) {
            message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_Dashboard.png?raw=true"]});
          }
     }
}