const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { HaveRoleId, RuleRoleId, WelcomeChannelId } = require("../../config/config.json");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} Client
     */

    async execute(interaction, client) {
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("✖ An error occured while running this command")
            ]}) && client.commands.delete(interaction.commandName);

            if (command.permission && !interaction.member.permissions.has(command.permission)) {
                return interaction.reply({ content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`, ephemeral: true })
            }

            command.execute(interaction, client)
        }

        if (interaction.isButton()) {
            const buttonID = interaction.customId;
            if (buttonID === 'primary') { // get button by customId set below
                const member = interaction.member; // get member from the interaction - person who clicked the button
    
                if (member.roles.cache.has(RuleRoleId) || member.roles.cache.has(HaveRoleId)) { // if they already have the role
                   // member.roles.remove(process.env.RULE_ROLE_ID); // remove it
                    return interaction.reply({
                        content: 'Regeln wurden schon bestätigt!!',
                        ephemeral: true
                    });
                    
                } else { // if they don't have the role
                    const { guild } = interaction.message //store the guild of the reaction in variable
                    const member = interaction.member;
                    const welcomeChannel = member.guild.channels.cache.get(WelcomeChannelId);
                    const welcomeMessage =`Hey ${member}, willkommen in der Community 😀\nSchau dir den <#825364230827409479> Channel an und befolge die Schritte wenn du Zutritt zum Server willst!`;
                    welcomeChannel.send(welcomeMessage);
                    console.log(`Welcome message for "${member.user.username}" was send to the #general channel!`);
                    member.roles.add("903678877740716103"); // add it
                    return interaction.reply({
                        content: 'Regeln bestätigt und Rolle wurde hinzugefügt!',
                        ephemeral: true
                    })
                }
            }
        }
    }
}


