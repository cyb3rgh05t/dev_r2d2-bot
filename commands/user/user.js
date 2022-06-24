const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "user",
    description: "Replies with user info!",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
		interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
	}
}