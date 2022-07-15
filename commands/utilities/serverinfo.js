const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "server-info",
    description: "Get info about the server",
    usage: "/server-info [command]",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
      const { guild } = interaction;

      const { createdTimestamp, ownerId, description, members, memberCount, channels } = guild;

      const Embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor({ name: guild.name, iconURL: guild.iconURL({dynamic: true})})
      .setThumbnail(guild.iconURL({dynamic: true}))
      .addFields(
        {
          name: "GENERAL",
          value:
          `

          Name: **${guild.name}**
          Created: <t:${parseInt(createdTimestamp / 1000)}:R>
          Owner: <@${ownerId}>

          Description:
          **${description}**

          
          `
        },
        {
            name: "💡 | USERS",
            value:
            `
            - Members: ${members.cache.filter((m) => !m.user.bot).size}
            - Bots: ${members.cache.filter((m) => m.user.bot).size}

            Total: ${memberCount}

            `
        },
        {
            name: "📣 | CHANNELS",
            value:
            `
            - Text: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
            - Voice: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
            - Threads: ${channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_NEWS_THREAD").size}
            - Categories: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
            - Stages: ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}
            - News: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}

            Total: ${channels.cache.size}

            `
         
        }
      )

      interaction.reply({embeds: [Embed]})
	}
}