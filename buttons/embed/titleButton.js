const { MessageEmbed } = require("discord.js");

module.exports = {
  id: "CEtitle",
  permission: ["MANAGE_MESSAGES"],
  async execute(interaction, client) {
    const { guild } = interaction;
    const BASE_EMBED = interaction.message.embeds[0];
    const CUSTOM_EMBED = interaction.message.embeds[1];
    const ROW_0 = interaction.message.components[0];
    const ROW_1 = interaction.message.components[1];
    const error = client.tools.error;

    const remaining = 6000 - CUSTOM_EMBED.length;

    const titleEmbed = new MessageEmbed().setColor("F4D58D").setAuthor({
      name: `${guild.name} | Editing title`,
      iconURL: guild.iconURL({
        dynamic: true,
        size: 512,
      }),
    }).setDescription(`
      **to Set:** \`send a message in chat\`
      **to End:** \`type "stop"\`
      `);

    interaction.message.edit({
      embeds: [titleEmbed, CUSTOM_EMBED],
      components: [],
    });

    let msgEmbed = new MessageEmbed().setColor("F4D58D").setDescription("**Enter a title:**");

    interaction.reply({ embeds: [msgEmbed] });

    const filter = (m) => m.content.includes("stop") || m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
      filter,
    });

    collector.on("collect", (m) => {
      if (m.content.toLowerCase() === "stop") {
        collector.stop();

        BASE_EMBED.fields[0] = {
          name: "**Embed Length**",
          value: `Characters remaining \`${6000 - CUSTOM_EMBED.length}\``,
        };

        interaction.message
          .edit({
            embeds: [BASE_EMBED, CUSTOM_EMBED],
            components: [ROW_0, ROW_1],
          })
          .then(() => setTimeout(() => m.delete() && interaction.deleteReply(), 1000));
        return;
      }

      if (m.content.length >= 256) {
        return error(interaction, m, "**Title is too long**");
      }

      interaction.editReply({
        embeds: [msgEmbed.setDescription(`**Title set to:** \`${m.content}\``)],
      });

      const title = m.content.length > remaining ? m.content.substring(0, remaining) : m.content;

      interaction.message
        .edit({
          embeds: [titleEmbed, CUSTOM_EMBED.setTitle(title)],
        })
        .then(() => setTimeout(() => m.delete(), 1000));
    });
  },
};
