const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { HaveRoleId, RuleRoleId, WelcomeChannelId } = require("../../structures/config/config.json");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} Client
     */

    async execute(interaction, client) {
        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("✖ An error occured while running this command")
            ]}) && client.commands.delete(interaction.commandName);

            if (command.permission && !interaction.member.permissions.has(command.permission)) {
                return interaction.reply({ content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`, ephemeral: true })
            }

            command.execute(interaction, client);
            console.log(`${interaction.user.tag} in channel #${interaction.channel.name} triggered an interaction "/${interaction.commandName}".`)
        }
    }
}


