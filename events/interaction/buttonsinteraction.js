const client = require("../../src/index");
const { ButtonInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        if(!interaction.isButton()) return;
        const Button = client.buttons.get(interaction.customId);
        
        if(Button.permission && !interaction.member.permissions.has(Button.permission))
        return interaction.reply({ content: `You do not have the required permission for this command: \`${interaction.customId}\`.`, ephemeral: true })

        if(Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
        return interaction.reply({content: "You are not the owner.", ephemeral: true});

        Button.execute(interaction, client);
        
    }
}
