const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Replies with dicazzo!'),
	async execute(interaction) {
		await interaction.reply(' di cazzo!');
	},
};