const { SlashCommandBuilder } = require('discord.js');
// const { } = require('@discordjs/voice'); // TODO


module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('bdog say one of his famous catch phrase! WOW')
		.addStringOption(option => {
			return option.setName('line')
				.setDescription('The input to echo back')
				.setRequired(false)
				.setAutocomplete(true)
		}),
	async execute(interaction) {
		await interaction.reply(' di cazzo!');
	},
};