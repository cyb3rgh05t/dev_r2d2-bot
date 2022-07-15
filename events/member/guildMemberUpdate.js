const client = require("../../src/index");
const { GuildMember } = require("discord.js");
const { memberId, streamnetId } = require("../../src/config/config.json");
const colors = require("colors");

module.exports = {
    name: "guildMemberUpdate",
    /**
     * 
     * @param {Client} client
     * @param {GuildMember} newMember
     */
    execute(oldMember, newMember) {

    if (newMember.roles.cache.some(role => role.id === streamnetId)) {
        newMember.roles.remove(memberId);
	    //console.log(`[ACTION]`.bgBlue, `"${newMember.user.username}" got Streamnet role, please check to send the invitebot`);
        }
    }
}