import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import express from 'express';
import http from 'http';

import personnageRoute from './routes/personnage.js';
import { setupAuth } from './auth/discord.js';

config();

// === Initialisation du bot Discord ===
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// Charger les commandes
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
}

// Charger les événements
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = await import(`./events/${file}`);
  if (event.default.once) {
    client.once(event.default.name, (...args) => event.default.execute(...args));
  } else {
    client.on(event.default.name, (...args) => event.default.execute(...args));
  }
}

client.login(process.env.TOKEN);

// === Serveur Express pour le dashboard ===
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // dossier public (HTML/CSS/JS)

setupAuth(app);                      // setup des routes /login, /logout, /callback
app.use(personnageRoute);           // API de création de personnage

app.get('/', (req, res) => {
  res.send('KDZ Bot + Dashboard Web actif.');
});

app.listen(port, () => {
  console.log(`✅ Serveur HTTP lancé pour Render sur le port ${port}`);
});

// This code initializes a Discord bot using the discord.js library.
// It loads commands and events from specified directories, sets up the bot's intents, and logs in using a token from environment variables.
// The bot listens for interactions and events, allowing it to respond to user commands and perform actions based on those interactions.
// Additionally, it sets up a simple HTTP server to keep the bot running on platforms like Render, which require an active HTTP server to prevent the bot from going idle.
// The bot's commands are stored in a collection, allowing for easy retrieval and execution when a command is invoked.
// The events are also registered, allowing the bot to respond to various Discord events such as when it is ready or when a user interacts with a command.
