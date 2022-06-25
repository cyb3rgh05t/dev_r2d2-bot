const { GuildMember } = require("discord.js");
const {NewMemberChannelId } = require("../../structures/config/config.json");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {Client} client 
     * @param {GuildMember} member
     */
    execute(member) {
    const { user, guild } = member   
    const newMemberChannel = member.guild.channels.cache.get(NewMemberChannelId)
	console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    const newMemberMessage = `**${member.user.username}** joined the Server, we now have ${member.guild.memberCount} members!`;
    // sends a message to the channel
    newMemberChannel.send(newMemberMessage)

    }
}