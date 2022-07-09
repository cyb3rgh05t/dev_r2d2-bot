const { MessageEmbed } = require("discord.js");

let collectCounter = 0;
const Input = [`**name?**`, `**value?**`, `**inline? True || False**`];

module.exports = {
  id: "CEfields",
  permission: "MANAGE_MESSAGES",
  async execute(interaction, client) {
    const { guild } = interaction;
    const BASE_EMBED = interaction.message.embeds[0];
    const CUSTOM_EMBED = interaction.message.embeds[1];
    const ROW_0 = interaction.message.components[0];
    const ROW_1 = interaction.message.components[1];
    const error = client.tools.error;

    const remaining = 6000 - CUSTOM_EMBED.length;

    const FieldEmbed = new MessageEmbed().setColor("F4D58D").setAuthor({
      name: `${guild.name} | Editing fields`,
      iconURL: guild.iconURL({
        dynamic: true,
        size: 512,
      }),
    }).setDescription(`
      **to Set: | name   |** \`send a message in chat | to set no name type "blank"\`
      **to Set: | value  |** \`send a message in chat max: (1024) characters\`
      **to Set: | inline |** \`send true || false\`
      `);

    interaction.message.edit({
      embeds: [FieldEmbed, CUSTOM_EMBED],
      components: [],
    });
    const filter = (m) => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
      filter,
    });

    let msgEmbed = new MessageEmbed().setColor("F4D58D").setDescription(`${Input[collectCounter++]}`);

    interaction.reply({
      embeds: [msgEmbed],
    });

    collector.on("collect", (m) => {
      if (collectCounter === 1 && m.content.length > 256) {
        return error(interaction, m, "Name is too long").then(() => setTimeout(() => interaction.deleteReply(), 5000));
      }
      if (collectCounter === 2 && m.content.length > 1024) {
        return error(interaction, m, "Value is too long").then(() => setTimeout(() => interaction.deleteReply(), 5000));
      }
      if (collectCounter < Input.length) {
        interaction
          .editReply({
            embeds: [msgEmbed.setDescription(`${Input[collectCounter++]}`)],
          })
          .then(() => setTimeout(() => m.delete(), 1000));
      } else {
        collector.stop();
        collectCounter = 0;
        setTimeout(() => m.delete(), 1000);
      }
    });

    collector.on("end", (collected) => {
      const data = collected.map((msg) => {
        return msg.content;
      });
      let isTrueSet = data[2] === "true";
      let name = data[0];
      if (data[0].toLowerCase() === "blank") name = "\u200b";

      const value = data[1].length > remaining ? data[1].substring(0, remaining) : data[1];

      interaction.message
        .edit({
          embeds: [
            BASE_EMBED,
            CUSTOM_EMBED.addFields({
              name: `${name}`,
              value: `${value}`,
              inline: isTrueSet,
            }),
          ],
          components: [ROW_0, ROW_1],
        })
        .then(() => setTimeout(() => interaction.deleteReply(), 1000));

      BASE_EMBED.fields[0] = {
        name: "**Embed Length**",
        value: `Characters remaining \`${6000 - CUSTOM_EMBED.length}\``,
      };
      interaction.message.edit({ embeds: [BASE_EMBED, CUSTOM_EMBED] });
    });
  },
};
