const { MessageEmbed } = require("discord.js");
const db = require("../../src/schemas/embedDB");

let collectCounter = 0;
const Input = [`**Tag a channel**`, `**Message to send above the embed?\nElse type: \`"skip"\`**`];

module.exports = {
  id: "CEsend",
  permission: "MANAGE_MESSAGES",
  async execute(interaction, client, args) {
    const BASE_EMBED = interaction.message.embeds[0];
    const CUSTOM_EMBED = interaction.message.embeds[1];
    const data = await db.findOne({ _id: interaction.user.id });
    const error = client.tools.error;

    interaction.message.edit({
      embeds: [BASE_EMBED, CUSTOM_EMBED],
      components: [],
    });

    async function fetch(channel, msg) {
      const message = await channel.messages.fetch(msg);
      return message;
    }

    if (data) {
      const EMBED_CHANNEL = client.channels.cache.get(data.channel);
      const message = await fetch(EMBED_CHANNEL, data.message);
      await message.edit({ embeds: [CUSTOM_EMBED] });
      interaction.message.edit({
        content: `updated embed`,
        embeds: [],
        components: [],
      });

      await data.deleteOne({ _id: interaction.user.id });
      return;
    }

    const filter = (m) => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
      filter,
      max: 2,
    });

    let msgEmbed = new MessageEmbed().setColor("F4D58D").setDescription(`${Input[collectCounter++]}`);

    interaction.reply({
      embeds: [msgEmbed],
    });

    let channel;
    let message;

    collector.on("collect", (m) => {
      if (collectCounter === 1) {
        channel = m.mentions.channels.first();
        if (!channel || channel.type === "GUILD_VOICE" || channel.type === "GUILD_CATEGORY") {
          return error(interaction, m, "Invalid channel").then(() => setTimeout(() => interaction.deleteReply(), 5000));
        }
      }
      if (collectCounter === 2) {
        message = m.content;
        setTimeout(() => m.delete(), 1000);
      }
      if (collectCounter < Input.length) {
        interaction
          .editReply({
            embeds: [msgEmbed.setDescription(`${Input[collectCounter++]}`)],
          })
          .then(() => setTimeout(() => m.delete(), 1000));
      }
    });
    collector.on("end", () => {
      collectCounter = 0;
      if (message.toLowerCase() === "skip") {
        channel.send({
          embeds: [CUSTOM_EMBED],
          allowedMentions: [],
        });

        interaction.message
          .edit({
            content: "Sent!",
            embeds: [],
          })
          .then(() => setTimeout(() => interaction.deleteReply(), 1000));
      } else {
        channel.send({
          content: `${message}`,
          embeds: [CUSTOM_EMBED],
          allowedMentions: [],
        });

        interaction.message
          .edit({
            content: "Sent!",
            embeds: [],
          })
          .then(() => setTimeout(() => interaction.deleteReply(), 1000));
      }
    });
  },
};
