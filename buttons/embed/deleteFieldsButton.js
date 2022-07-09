const { MessageEmbed } = require("discord.js");

module.exports = {
  id: "CEfields_delete",
  permission: "MANAGE_MESSAGES",
  async execute(interaction, client) {
    const { guild } = interaction;
    const BASE_EMBED = interaction.message.embeds[0];
    const CUSTOM_EMBED = interaction.message.embeds[1];
    const ROW_0 = interaction.message.components[0];
    const ROW_1 = interaction.message.components[1];
    const error = client.tools.error;

    let num = 0;

    const FieldEmbed = new MessageEmbed().setColor("F4D58D").setAuthor({
      name: `${guild.name} | Deleting fields`,
      iconURL: guild.iconURL({
        dynamic: true,
        size: 512,
      }),
    }).setDescription(`
      **to Delete:** \`type index number in chat"\`
      **to End:** \`type "stop"\`
      `);

    const filter = (m) => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
      filter,
    });

    let msgEmbed = new MessageEmbed().setColor("F4D58D");

    interaction.reply({
      embeds: [msgEmbed.setDescription("Enter the field index number:")],
    });

    const refreshIndex = async function (base, custom) {
      const fields = await custom.fields.map((field) => {
        return {
          name: field.name.slice(3),
          value: field.value,
          inline: field.inline,
        };
      });
      await interaction.message.edit({ embeds: [base, custom.setFields(fields)] });
      num = 0;

      const fields_with_index = await CUSTOM_EMBED.fields.map((field) => {
        return {
          name: `\`${num++}\`` + " " + field.name,
          value: field.value,
          inline: field.inline,
        };
      });

      await interaction.message.edit({
        embeds: [base, custom.setFields(fields_with_index)],
      });
    };

    const fields_with_index = await CUSTOM_EMBED.fields.map((field) => {
      return {
        name: `\`${num++}\`` + " " + field.name,
        value: field.value,
        inline: field.inline,
      };
    });

    await interaction.message.edit({
      embeds: [FieldEmbed, CUSTOM_EMBED.setFields(fields_with_index)],
    });

    collector.on("collect", (m) => {
      if (m.content.toLowerCase() === "stop") {
        collector.stop();

        BASE_EMBED.fields[0] = {
          name: "**Embed Length**",
          value: `Characters remaining \`${6000 - CUSTOM_EMBED.length}\``,
        };

        const fields = CUSTOM_EMBED.fields.map((field) => {
          return {
            name: field.name.slice(3),
            value: field.value,
            inline: field.inline,
          };
        });

        interaction.message
          .edit({
            embeds: [BASE_EMBED, CUSTOM_EMBED.setFields(fields)],
            components: [ROW_0, ROW_1],
          })
          .then(() => setTimeout(() => m.delete() && interaction.deleteReply(), 1000));
        return;
      }

      let index = parseInt(m.content);

      if (isNaN(index)) {
        return error(interaction, m, "Index must be a number");
      }
      if (index > 25 || index < 0) {
        return error(interaction, m, "Index number must be between 0 - 25");
      }
      if (!CUSTOM_EMBED.fields[index]) {
        return error(interaction, m, `Index${index} doesn't exist`);
      }

  

      interaction.editReply({
        embeds: [msgEmbed.setDescription(`Field\`${index}\` deleted!`)],
      });

      interaction.message
        .edit({
          embeds: [BASE_EMBED, CUSTOM_EMBED.spliceFields(index, 1)],
        })
        .then(() => setTimeout(() => m.delete(), 1000));

      refreshIndex(FieldEmbed, CUSTOM_EMBED);
    });
  },
};
