import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/characters.json');

export function saveCharacter(userId, characterData) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  data[userId] = characterData;

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export function getCharacter(userId) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  return data[userId] || null;
}

export function deleteCharacter(userId) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  if (data[userId]) {
    delete data[userId];
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  }
  return false;
}

// This module provides functions to save and retrieve character data for users.
// The `saveCharacter` function takes a user ID and character data, reads the existing data from a JSON file, updates it with the new character data, and writes it back to the file.
// The `getCharacter` function retrieves the character data for a given user ID from the JSON file, returning the character data if it exists or null if it does not.
// The `deleteCharacter` function removes the character data for a specified user ID from the JSON file, returning true if the character was deleted successfully or false if the user ID did not exist in the data.
// The character data is stored in a JSON file located at `data/characters.json`, and the file is read and written using the `fs` module.
// The `dataPath` variable holds the path to the JSON file, and the functions use `fs.readFileSync` and `fs.writeFileSync` to read and write the data synchronously.
// This allows for easy management of character data, enabling the bot to save and retrieve user-specific character information as needed.
// The character data is stored in a key-value format, where the key is the user ID and the value is the character data object.
// This structure allows for efficient retrieval and updating of character data for individual users, making it suitable for a Discord bot that manages user-specific information.
// The module uses the `path` and `url` modules to handle file paths correctly, ensuring compatibility across different environments and file systems.
// The `fileURLToPath` function is used to convert the module's file URL to a file path, allowing the script to work correctly regardless of how it is imported or executed.
// The `dataPath` variable is constructed using `path.join` to ensure the correct path format, making it easier to manage file locations in a cross-platform manner.
// The functions are designed to be used in a Discord bot context, where user IDs are unique identifiers for users interacting with the bot.
// This allows the bot to maintain state and provide personalized experiences for users by storing and retrieving their character data as needed.   

