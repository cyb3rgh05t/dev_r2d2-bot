const { ButtonInteraction, MessageEmbed } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');

const DB = require("../../src/schemas/ticketDB");
const TicketSetupData = require("../../src/schemas/ticketSetupDB");

const colors = require("colors");

module.exports = {
    
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        const { guild, customId, channel, member } = interaction;
        if (!["close", "lock", "unlock", "claim"].includes(customId)) return;

        const TicketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
        if (!TicketSetup) return interaction.reply({ 
            content: "The data for this system is outdated.",
        });

        if(!member.roles.cache.find((r) => r.id === TicketSetup.Handlers ))
        return interaction.reply({ 
            content: "You cannot use these Buttons!",
        ephemeral: true,
    });

        const Embed = new MessageEmbed().setColor("BLUE");

        DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
            if (err) throw err;
            if (!docs)
                return interaction.reply({
                    content: "No Data was found related to this ticket, please delete manual.",
                    ephemeral: true,
                });
            switch (customId) {
                case "lock":
                    if(docs.Locked == true)
                        return interaction.reply({
                            content: "The Ticket is already locked",
                            ephemeral: true,
                        });
                    await DB.updateOne({ ChannelID: channel.id}, { Locked: true});
                    Embed.setDescription("🔐 | This Ticket is now locked for reviewing.")

                    docs.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, {
                            SEND_MESSAGES: false,
                        }); 
                    });

                    interaction.reply({ embeds: [Embed ]});
                    break;
                case "unlock":
                    if(docs.Locked == false)
                        return interaction.reply({
                            content: "The Ticket is already unlocked",
                            ephemeral: true,
                        });
                    await DB.updateOne({ ChannelID: channel.id}, { Locked: true});
                    Embed.setDescription("🔓 | This Ticket is now unlocked.")
                    docs.MembersID.forEach((m) => {
                        channel.permissionOverwrites.edit(m, {
                            SEND_MESSAGES: true,
                        }); 
                    });
                    interaction.reply({ embeds: [Embed ]});
                    break;
                case "close":
                    if(docs.Closed == true)
                        return interaction.reply({
                            content: "The Ticket is already closed, please wait for it to get deleted.",
                            ephemeral: true,
                        });
                const attachment = await createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${docs.Type} - ${docs.TicketID}.html`, 
                });
                await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

                const Message = await guild.channels.cache
                .get(TicketSetup.Transcripts)
                .send({
                    embeds: [
                        Embed.setTitle(
                            `Transcipt Type: ${docs.Type}\nID: ${docs.TicketID}`
                            ),
                    ],
                    files: [attachment],
                });

                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `The Transcript is now saved [TRANSCRIPT](${Message.url})`
                        ),
                    ],
                });

                setTimeout(() => {
                    channel.delete();
                }, 10 * 1000);
                break;
                case "claim":
                    if (docs.Claimed == true)
                    return interaction.reply({
                        content: `This ticket has already been claimed by <@${docs.ClaimedBy}>`,
                        ephemeral: true,
                    });

                    await DB.updateOne(
                        {ChannelID: channel.id}, 
                        {Claimed: true, ClaimedBy: member.id}
                    );

                    Embed.setDescription(`📰 | This ticket is now claimed by ${member}`);
                    interaction.reply({ embeds: [Embed] });

                    break;
             }
        });
    },
};