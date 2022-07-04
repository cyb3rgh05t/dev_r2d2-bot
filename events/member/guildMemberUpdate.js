const { GuildMember } = require("discord.js");
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../../src/config/.env`)});

module.exports = {
    name: "guildMemberUpdate",
    /**
     * 
     * @param  {Client} client
     * @param {GuildMember} newMember
     */
    execute(oldMember, newMember) {

    const { user, guild } = newMember
    if (newMember.roles.cache.some(role => role.id === process.env.HAVE_ROLE_ID)) {
        newMember.roles.remove(process.env.Remove_Role_ID);
	    console.log(`"${newMember.user.username}" got Streamnet role, please check to send the invitebot`);
        }
    }
}