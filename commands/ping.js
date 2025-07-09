import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Répond Pong !'),
  async execute(interaction) {
    await interaction.reply('Pong !');
  }
};
// This command responds with "Pong!" when the user types /ping in the chat.
// It uses the SlashCommandBuilder to create a slash command with the name 'ping' and
// a description. The execute function is called when the command is invoked, and it
// sends a reply back to the user with the message 'Pong!'.