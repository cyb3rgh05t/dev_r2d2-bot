const { RuleRoleId, HaveRoleId, WelcomeChannelId } = require("../../structures/config/config.json");

module.exports = {
    id: "acceptRole",
    execute(interaction) {
        const member = interaction.member; // get member from the interaction - person who clicked the button
    
                if (member.roles.cache.has(RuleRoleId) || member.roles.cache.has(HaveRoleId)) { // if they already have the role
                   // member.roles.remove(process.env.RULE_ROLE_ID); // remove it
                    return interaction.reply({
                        content: 'Du hast die Regeln schon bestätigt!!',
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