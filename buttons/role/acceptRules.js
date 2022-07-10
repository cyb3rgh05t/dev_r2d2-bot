const client = require("../../src/index");


module.exports = {
    id: "acceptRole",
    async execute(interaction) {
        const member = interaction.member;
 
                if (member.roles.cache.has(client.config.RuleRoleId) || member.roles.cache.has(client.config.HaveRoleId)) { 
                    await interaction.reply({
                        content: 'Du hast die Regeln schon bestätigt!!',
                        ephemeral: true
                    });
                } else { // if they don't have the role
                    const { guild } = interaction.message //store the guild of the reaction in variable
                    const member = interaction.member;
                    const welcomeChannel = member.guild.channels.cache.get(client.config.WelcomeChannelId);
                    const welcomeMessage =`Hey ${member}, willkommen in der Community 😀\nSchau dir den <#825364230827409479> Channel an und befolge die Schritte wenn du Zutritt zum Server willst!`;
                    welcomeChannel.send(welcomeMessage);
                    console.log(`[INFO]`.yellow.bold,`Welcome message for "${member.user.username}" was send to the #general channel!`);
                    member.roles.add(client.config.RuleRoleId); // add it
                    await interaction.reply({
                        content: 'Regeln bestätigt und Rolle wurde hinzugefügt!',
                        ephemeral: true
                    });
    }
  }
}