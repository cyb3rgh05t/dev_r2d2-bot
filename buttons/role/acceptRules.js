const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../../src/config/.env`)});


module.exports = {
    id: "acceptRole",
    async execute(interaction) {
        const member = interaction.member; // get member from the interaction - person who clicked the button
    
                if (member.roles.cache.has(process.env.RULE_ROLE_ID) || member.roles.cache.has(process.env.HAVE_ROLE_ID)) { // if they already have the role
                   // member.roles.remove(process.env.RULE_ROLE_ID); // remove it
                    const message = await interaction.reply({
                        content: 'Du hast die Regeln schon bestätigt!!',
                        fetchReply: true
                    });
                    setTimeout(() => message.delete().catch(() => {}), 5000);
                } else { // if they don't have the role
                    const { guild } = interaction.message //store the guild of the reaction in variable
                    const member = interaction.member;
                    const welcomeChannel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
                    const welcomeMessage =`Hey ${member}, willkommen in der Community 😀\nSchau dir den <#825364230827409479> Channel an und befolge die Schritte wenn du Zutritt zum Server willst!`;
                    welcomeChannel.send(welcomeMessage);
                    console.log(`Welcome message for "${member.user.username}" was send to the #general channel!`);
                    member.roles.add("903678877740716103"); // add it
                    const message = await interaction.reply({
                        content: 'Regeln bestätigt und Rolle wurde hinzugefügt!',
                        fetchReply: true
                    });
                    setTimeout(() => message.delete().catch(() => {}), 5000);
    }
  }
}