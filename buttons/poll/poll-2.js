const { ButtonInteraction, Client } = require("discord.js");
const DB = require("../../src/databases/pollDB");

module.exports = {
    id: "poll-2",
    permission: "MANAGE_MESSAGES",
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const data = await DB.findOne({ GuildID: interaction.guild.id, MessageID: interaction.message.id })
        if (!data) return;

        if (data.Users.includes(interaction.user.id)) return interaction.reply({content: `You have already chosen your answer`, ephemeral: true});

        await DB.findOneAndUpdate({ GuildID: interaction.guild.id, MessageID: interaction.message.id}, {Button2: data.Button2 + 1, $push: { Users: interaction.user.id }});

        interaction.reply({content: `Your answer has been sent`, ephemeral: true});
    }
}
