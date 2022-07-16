const { MessageActionRow, MessageButton, Modal, MessageEmbed, ButtonInteraction, Client, TextInputComponent } = require("discord.js");
const db = require("../../src/schemas/embedDB");

module.exports = {
    id: "ce_title",
    permission: "MANAGE_MESSAGES",

    /**
     * 
     * @param {ButtonInteraction} interaction 
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

        db.findOne({messageId: i.message.id, userId: m.id}, async (err, data) => {
            if(err) throw err;
            if(!data) return interaction.reply({content: "Dieses Menü gehört nicht dir!", ephemeral: true}).catch((err) => console.error(err.message));

            const InputField = new TextInputComponent()
            .setCustomId("ce_title_modal_input")
            .setLabel("Gebe hier den Titel ein!")
            .setMinLength(1)
            .setMaxLength(256)
            .setRequired(true)
            .setStyle("SHORT")
    
            const TitleModalInputRow = new MessageActionRow().addComponents(InputField)
    
    
            const modal = new Modal()
            .setCustomId("ce_title_modal")
            .setTitle("Titel")
            .addComponents(TitleModalInputRow)
    
            await interaction.showModal(modal)

        })
    }
}
