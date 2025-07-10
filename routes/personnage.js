import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const DATA_PATH = path.resolve('./data/characters.json');

if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, '{}');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).send('Non authentifié.');
}

router.post('/api/personnage', ensureAuthenticated, (req, res) => {
  const userId = req.user.id;
  const character = req.body;

  try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

    if (data[userId]) {
      return res.status(400).send('Une fiche existe déjà.');
    }

    data[userId] = {
      ...character,
      status: 'pending',
      createdAt: new Date().toISOString(),
      discordTag: `${req.user.username}#${req.user.discriminator}`
    };

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    res.status(200).send('Fiche personnage soumise avec succès !');
  } catch (err) {
    console.error('Erreur lors de la soumission :', err);
    res.status(500).send('Erreur serveur.');
  }
});

router.get('/api/personnage/me', ensureAuthenticated, (req, res) => {
  const userId = req.user.id;
  try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    if (!data[userId]) return res.status(404).send('Aucune fiche.');
    res.status(200).json(data[userId]);
  } catch {
    res.status(500).send('Erreur serveur.');
  }
});

export default router;
// This code defines an Express router for handling character creation and retrieval in a Discord bot context.
// It includes routes for submitting a character, retrieving the current user's character, and ensuring the user is authenticated before accessing these routes.
// The `ensureAuthenticated` middleware checks if the user is authenticated before allowing access to the routes.
// The `/api/personnage` route allows authenticated users to submit a character, checking if a character already exists for the user.
// If a character exists, it returns a 400 status code; otherwise, it saves the character data to a JSON file and returns a success message.
// The `/api/personnage/me` route retrieves the character data for the authenticated user, returning a 404 status if no character exists or a 500 status if there is a server error.
// The character data is stored in a JSON file located at `data/characters.json`, and the file is read and written using the `fs` module.
// The code ensures that the necessary directories and files exist before attempting to read or write data to avoid errors.