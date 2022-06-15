const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Button Role')
					.setStyle('SUCCESS'),
			);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buttonrole')
		.setDescription('Add the member role to a user!'),
	async execute(interaction) {
	await interaction.reply({ content: 'Button', components: [row] });
		
	},
};