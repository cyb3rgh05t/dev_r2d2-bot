const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../src/schemas/modDB");
const colors = require("colors");


module.exports = {
    name: "modlogsetup",
    public: true,
    permission: "ADMINISTRATOR",
    description: "Setup your message channel for the moderation messages used by [/mod]",
    options: [
        {
            name: "channel",
            description: "Select the text channel where the mod messages will be send",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"],
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, options } = interaction;

        try {
            const Channel = options.getChannel("channel");

            await DB.findOneAndUpdate(
                { GuildID: guild.id },
                {
                    ChannelID: Channel.id,
                },
                {
                    new: true,
                    upsert: true,
                }
            );
            
            interaction.reply({ content: "Done", ephemeral: true });

        } catch (err) {
            console.log(`[ERROR]`.red.bold, err);
        }
    },
};