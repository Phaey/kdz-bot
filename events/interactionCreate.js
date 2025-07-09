export default {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Erreur lors de l’exécution de la commande.', ephemeral: true });
    }
  }
};
// This event is triggered when a user interacts with a command in the chat.
// It checks if the interaction is a chat input command and retrieves the corresponding command from the client's commands collection.
// If the command exists, it executes the command's execute function, passing the interaction as an argument.
// If an error occurs during execution, it logs the error to the console and replies to the interaction with an error message.
// The `ephemeral: true` option makes the reply visible only to the user who invoked the command, keeping it private.
// This is useful for handling user commands in a Discord bot, allowing the bot to respond to user inputs and execute specific actions based on the command invoked.
// The `interaction` parameter contains information about the interaction, such as the command name and the user who invoked it.
// The `client` property of the interaction allows access to the bot's commands collection, which is used to find and execute the appropriate command.
// This structure allows for modular command handling, where each command can be defined in its own file and imported into the main bot file.
// This makes it easier to manage and organize commands, especially as the bot grows in complexity and functionality.