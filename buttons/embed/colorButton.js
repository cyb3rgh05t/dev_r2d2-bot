const { MessageEmbed } = require("discord.js");

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = {
  id: "CEcolor",
  permission: ["MANAGE_MESSAGES"],
  async execute(interaction, client) {
    const { guild } = interaction;
    const BASE_EMBED = interaction.message.embeds[0];
    const CUSTOM_EMBED = interaction.message.embeds[1];
    const ROW_0 = interaction.message.components[0];
    const ROW_1 = interaction.message.components[1];
    const error = client.tools.error;

    const colorEmbed = new MessageEmbed().setColor("F4D58D").setAuthor({
      name: `${guild.name} | Editing color`,
      iconURL: guild.iconURL({
        dynamic: true,
        size: 512,
      }),
    }).setDescription(`
      **to Set:** \`send a hex color code in chat\`
      **for Random:** \`type "random"\`
      **to End:** \`type "stop"\`
      `);

    interaction.message.edit({
      embeds: [colorEmbed, CUSTOM_EMBED],
      components: [],
    });

    let msgEmbed = new MessageEmbed().setColor("F4D58D").setDescription("Enter a HEX color code:");

    interaction.reply({ embeds: [msgEmbed] });

    const filter = (m) => m.content.includes("stop") || m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
      filter,
    });

    let color = "";

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

      if (!m.content.match(/[0-9A-Fa-f]{6}/g) && m.content.toLowerCase() !== "random") {
        return error(interaction, m, `\`${m.content}\` - invalid color code`);
      }

      const hexToDecimal = (hex) => parseInt(hex, 16);

      if (hexToDecimal(m.content) > 16777215 || (hexToDecimal(m.content) < 0 && m.content.toLowerCase() !== "random")) {
        return error(interaction, m, `\`${m.content}\`*- is out of Range`);
      }

      //ternary operator for random color
      color = m.content.toLowerCase() === "random" ? getRandomColor() : m.content;

      interaction.editReply({
        embeds: [msgEmbed.setDescription(`Color set to:\`${color}\``).setColor(`${color}`)],
      });

      interaction.message
        .edit({
          embeds: [colorEmbed, CUSTOM_EMBED.setColor(color)],
        })
        .then(() => setTimeout(() => m.delete(), 1000));
    });
  },
};
