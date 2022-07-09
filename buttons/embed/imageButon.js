const { MessageEmbed } = require("discord.js");

module.exports = {
  id: "CEimage",
  permission: "MANAGE_MESSAGES",
  async execute(interaction, client) {
    const { guild } = interaction;
    const BASE_EMBED = interaction.message.embeds[0];
    const CUSTOM_EMBED = interaction.message.embeds[1];
    const ROW_0 = interaction.message.components[0];
    const ROW_1 = interaction.message.components[1];
    const error = client.tools.error;

    const ImageEmbed = new MessageEmbed().setColor("F4D58D").setAuthor({
      name: `${guild.name} | Editing image`,
      iconURL: guild.iconURL({
        dynamic: true,
        size: 512,
      }),
    }).setDescription(`
      **to Set:** \`\`\`Send a [DIRECT] image link in chat\nor upload any JPG || PNG file\`\`\`
      **to End:** \`type "stop"\`
      `);

    interaction.message.edit({
      embeds: [ImageEmbed, CUSTOM_EMBED],
      components: [],
    });

    let msgEmbed = new MessageEmbed().setColor("F4D58D").setDescription("**Enter a direct image link:**");

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

      let image = "";

      if (m.attachments.size > 0) {
        if (m.attachments.first().name.endsWith(".jpg") || m.attachments.first().name.endsWith(".png")) {
          image = m.attachments.first().url;
        }
      } else {
        image = m.content;
      }

      // cheack if image is valid picture
      if (!image.includes("http")) return error(interaction, m, "Invalid image link");
      if (!image.endsWith(".jpg") && !image.endsWith(".png")) return error(interaction, m, "Invalid image link");

      interaction.editReply({
        embeds: [msgEmbed.setDescription(`**Send a new link to update the image**`)],
      });

      interaction.message
        .edit({
          embeds: [ImageEmbed, CUSTOM_EMBED.setImage(image)],
        })
        .then(() => setTimeout(() => m.delete(), 1000));
    });
  },
};
