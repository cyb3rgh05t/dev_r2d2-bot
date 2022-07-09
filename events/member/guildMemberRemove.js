const client = require("../../src/index");
const { GuildMember, MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {Client} client 
     * @param {GuildMember} member
     */
     execute(member) {
        const { user, guild } = member
        const leaveChannel = member.guild.channels.cache.get(client.config.LeaveChannelId)
	     console.log(`User "${member.user.username}" has left "${member.guild.name}"` );
        const leaveMessage = `**${member.displayName}** has left the server, we now have ${member.guild.memberCount} members!`;
        // sends a message to the channel
        leaveChannel.send(leaveMessage)
     }   
}