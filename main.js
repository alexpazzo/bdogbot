require('dotenv').config() // load .env into process.env
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');


const token = process.env.TOKEN; // get token for dicordjs
const clientId= process.env.CLIENT_ID // clientId: Your application's client id
const guildId = process.env.GUILD_ID // guildId: Your development server's id
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // GatewayIntentBits.Guilds it ensures that the caches for guilds, channels and roles are populated and available for internal use 

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
    // const guildIds = client.guilds.cache.map(guild => guild.id);
    // console.log(guildIds);
});

client.on("messageCreate", async (message) => {
    console.log(message);
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token); // Login the client to discord api