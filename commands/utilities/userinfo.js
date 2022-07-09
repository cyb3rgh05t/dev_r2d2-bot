const { CommandInteraction, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "user-info",
    description: "Displays the userinfo of the specified target.",
    usage: "/user-info [target]",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "target",
            description: "Select the target.",
            type: "USER",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const target = interaction.options.getMember("target") || interaction.member;
        await target.user.fetch();

        const getPresence = (status) => {
            const statusType = {
                idle: "1FJj7pX.png",
                dnd: "fbLqSYv.png",
                online: "JhW7v9d.png",
                invisible: "dibKqth.png"
            };

            return `https://i.imgur.com/${statusType[status] || statusType["invisible"]}`;
        };

        const response = new MessageEmbed()
            .setColor(target.user.accentColor || "RANDOM")
            .setAuthor({ name: target.user.tag, iconURL: getPresence(target.presence?.status) })
            .setThumbnail(target.user.avatarURL({ dynamic: true }))
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .addFields(
                { name: "ID", value: target.user.id },
                { name: "Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "Account Created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "Roles", value: target.roles.cache.map(r => r).sort((a, b) => b.position - a.position).join(" ").replace("@everyone", "") || "None" },
                { name: "Nickname", value: target.nickname || "None", inline: true },
                { name: "Accent Colour", value: target.user.accentColor ? `#${target.user.accentColor.toString(16)}` : "None", inline: true },
                //{ name: "Banner", value: target.user.bannerURL() ? "** **" : "None" }
            )
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "");

        interaction.reply({ embeds: [response], ephemeral: true });
    }
}