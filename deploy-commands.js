import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';

config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('📦 Déploiement des commandes slash...');
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
  );
  console.log('✅ Commandes déployées avec succès.');
} catch (error) {
  console.error(error);
}
// This script deploys slash commands to a specific guild in Discord.
// It reads command files from the 'commands' directory, imports them, and registers them with the Discord API using the REST API.
// The commands are registered for a specific guild using the CLIENT_ID and GUILD_ID from the environment variables.
// The script logs the deployment process to the console, indicating success or failure.