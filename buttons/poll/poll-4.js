const { ButtonInteraction, Client } = require("discord.js");
const DB = require("../../src/schemas/pollDB");

module.exports = {
    id: "poll-4",
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const data = await DB.findOne({ GuildID: interaction.guild.id, MessageID: interaction.message.id })
        if (!data) return;

        if (data.Users.includes(interaction.user.id)) return interaction.reply({content: `You have already chosen your answer`, ephemeral: true});

        await DB.findOneAndUpdate({ GuildID: interaction.guild.id, MessageID: interaction.message.id}, {Button4: data.Button4 + 1, $push: { Users: interaction.user.id }});

        interaction.reply({content: `Your answer has been sent`, ephemeral: true});
    }
}