const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("../../src/schemas/embedDB");

function fetch(channel, msg) {
  return new Promise((resolve, reject) => {
    channel.messages
      .fetch(msg)
      .then((message) => resolve(message))
      .catch((err) => reject(err));
  });
}

module.exports = {
  name: "embed",
  description: "Create a custom message embed",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "action",
      description: "embed tools",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "new",
          value: "new",
        },
        {
          name: "template",
          value: "template",
        },
        {
          name: "edit",
          value: "edit",
        },
      ],
    },
    {
      name: "channel",
      description: "message channel",
      type: "CHANNEL",
      required: false,
    },
    {
      name: "message-id",
      description: "enter message ID",
      type: "STRING",
      required: false,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild } = interaction;
    const action = interaction.options.getString("action");
    const messageID = interaction.options.getString("message-id");
    const messageChannel = interaction.options.getChannel("channel");
    const error = client.tools.error;

    const ROW_0 = new MessageActionRow().addComponents(
      new MessageButton().setLabel("Set Title").setCustomId("CEtitle").setStyle("SECONDARY"),
      new MessageButton().setLabel("Set Description").setCustomId("CEdescription").setStyle("SECONDARY"),
      new MessageButton().setLabel("Set Color").setCustomId("CEcolor").setStyle("SECONDARY"),
      new MessageButton().setLabel("Set Image").setCustomId("CEimage").setStyle("SECONDARY"),
      new MessageButton().setLabel("Set Footer").setCustomId("CEfooter").setStyle("SECONDARY")
    );

    const ROW_1 = new MessageActionRow().addComponents(
      new MessageButton().setLabel("Send").setCustomId("CEsend").setStyle("SUCCESS"),
      new MessageButton().setLabel("Add Field").setCustomId("CEfields").setStyle("SECONDARY"),
      new MessageButton().setLabel("Delete Field").setCustomId("CEfields_delete").setStyle("DANGER")
    );

    let CUSTOM_EMBED = new MessageEmbed().setDescription("\u200b").setColor("F4D58D");

    let BASE_EMBED = new MessageEmbed()
      .setColor("F4D58D")
      .setAuthor({
        name: `${guild.name} | Embed Creator`,
        iconURL: guild.iconURL({
          dynamic: true,
          size: 512,
        }),
      })
      .setDescription(
        `
      **Use buttons to create a customized embed**
      ㅤ
      `
      )
      .setFields([
        {
          name: "__**Embed Length**__",
          value: `Characters remaining \`${6000 - CUSTOM_EMBED.length}\``,
        },
      ])
      .setFooter({ text: `Changes will be reflected on the embed below` });

    if (action === "template") {
      if (!messageChannel) return error(interaction, "", "`message-channel` is required");
      if (!messageID) return error(interaction, "", "`message-id` is required");

      const message = await fetch(messageChannel, messageID);
      if (!message.embeds[0]) return error(interaction, "", "Message does not have an embed");
      CUSTOM_EMBED = message.embeds[0];

      BASE_EMBED.fields[0] = {
        name: "**Embed Length**",
        value: `Characters remaining \`${6000 - CUSTOM_EMBED.length}\``,
      };
    }

    if (action === "edit") {
      if (!messageChannel) return error(interaction, "", "`message-channel` is required");
      if (!messageID) return error(interaction, "", "`message-id` is required");
      let data = await db.findOne({ _id: interaction.user.id });
      if (!data) {
        data = new db({
          _id: interaction.user.id,
          channel: messageChannel.id,
          message: messageID,
        });
        await data.save();
      }

      const message = await fetch(messageChannel, messageID);
      if (!message.embeds[0]) return error(interaction, "", "Message does not have an embed");
      CUSTOM_EMBED = message.embeds[0];

      BASE_EMBED.fields[0] = {
        name: "**Embed Length**",
        value: `Characters remaining \`${6000 - CUSTOM_EMBED.length}\``,
      };
    }

    interaction.reply({ embeds: [BASE_EMBED, CUSTOM_EMBED], components: [ROW_0, ROW_1] });
  },
};
