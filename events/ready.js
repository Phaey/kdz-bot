export default {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
  }
};
// This event is triggered when the bot is ready and connected to Discord.
// It logs a message to the console indicating that the bot is connected and shows the bot's username.
// The `once` property is set to true, meaning this event will only be executed once when the bot starts up.
// The `client` parameter is the instance of the Discord client that is passed to the event handler.
// This allows you to access the bot's properties and methods, such as `client.user.tag`, which returns the bot's username and discriminator (e.g., "BotName#1234").
// This is useful for confirming that the bot has successfully logged in and is ready to interact with Discord.