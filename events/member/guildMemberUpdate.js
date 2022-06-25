const { GuildMember } = require("discord.js");
const { HaveRoleId, RemoveRoleId } = require("../../structures/config/config.json");

module.exports = {
    name: "guildMemberUpdate",
    /**
     * 
     * @param  {Client} client
     * @param {GuildMember} newMember
     */
    execute(oldMember, newMember) {

    const { user, guild } = newMember
    if (newMember.roles.cache.some(role => role.id === HaveRoleId)) {
        newMember.roles.remove(RemoveRoleId);
	    console.log(`"${newMember.user.username}" got Streamnet role, please check to send the invitebot`);
        }
    }
}