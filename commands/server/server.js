const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "server",
    description: "Replies with server info!",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
		interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
	}
}