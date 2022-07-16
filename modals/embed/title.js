const { MessageActionRow, MessageButton, Modal, MessageEmbed, ModalSubmitInteraction, Client, TextInputComponent } = require("discord.js");
const db = require("../../src/schemas/embedDB");

module.exports = {
    id: "ce_title_modal",

    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     * @param {Client} client 
     */


    async execute(interaction, client) {
        const i = interaction;
        const m = i.member;
        const g = i.guild;
        const c = i.channel;
        const ShowEmbed = i.message.embeds[0];
        const PrevEmbed = i.message.embeds[1];
        const mRow1 = i.message.components[0];
        const mRow2 = i.message.components[1];
        const mRow3 = i.message.components[2];
        const input = i.fields.getTextInputValue("ce_title_modal_input");

        interaction.reply({content: "Titel erfolgreich gesetzt!", ephemeral: true}).catch((err) => console.error(err.message))

        interaction.message.edit({
            embeds: [ShowEmbed, PrevEmbed.setTitle(`${input}`)],
            components: [mRow1, mRow2, mRow3]
        }).catch((err) => console.error(err.message))


    }
}