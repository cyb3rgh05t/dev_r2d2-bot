const { GuildMember } = require("discord.js");
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../../src/config/.env`)});

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {Client} client 
     * @param {GuildMember} member
     */
    execute(member) {
    const { user, guild } = member   
    const newMemberChannel = member.guild.channels.cache.get(process.env.NEW_MEMBER_CHANNEL_ID)
	console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    const newMemberMessage = `**${member.user.username}** joined the Server, we now have ${member.guild.memberCount} members!`;
    // sends a message to the channel
    newMemberChannel.send(newMemberMessage)

    }
}