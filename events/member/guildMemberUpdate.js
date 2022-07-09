const client = require("../../src/index");
const { GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberUpdate",
    /**
     * 
     * @param  {Client} client
     * @param {GuildMember} newMember
     */
    execute(oldMember, newMember) {

    const { user, guild } = newMember
    if (newMember.roles.cache.some(role => role.id === client.config.HaveRoleId)) {
        newMember.roles.remove(client.config.RemoveRoleId);
	    console.log(`"${newMember.user.username}" got Streamnet role, please check to send the invitebot`);
        }
    }
}