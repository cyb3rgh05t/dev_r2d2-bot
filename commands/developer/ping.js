const { CommandInteraction, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Sends the client's ping",
    permission: "ADMINISTRATOR",
    cooldown: 5,
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        const Response = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`🏓 ${client.ws.ping}ms`);
        interaction.reply({embeds: [Response]})
    }
}