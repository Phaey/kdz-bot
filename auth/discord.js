import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

export function setupAuth(app) {
  app.use(session({
    secret: 'kdz-secret',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify']
  }, (accessToken, refreshToken, profile, done) => done(null, profile)));

  app.get('/auth/discord', passport.authenticate('discord'));
  app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
  }), (req, res) => res.redirect('/creer-personnage.html'));

  app.get('/logout', (req, res) => {
    req.logout(() => res.redirect('/'));
  });

  app.get('/api/user', (req, res) => {
    if (req.user) res.json({ id: req.user.id, username: req.user.username });
    else res.status(401).json({ error: 'Non authentifié' });
  });
}
// This code sets up authentication for a Discord bot using the passport-discord strategy.
// It initializes passport with session management, allowing users to log in via Discord.
// The `setupAuth` function configures the Express app to handle authentication routes.
// It defines routes for logging in with Discord, handling the callback after authentication, and logging out
// The `/auth/discord` route initiates the authentication process, redirecting users to Discord's login page.
// The `/auth/discord/callback` route handles the response from Discord after the user has authenticated.
// If authentication is successful, it redirects the user to a character creation page.
// The `/logout` route allows users to log out, redirecting them to the home page.
// The `/api/user` route returns the authenticated user's information if they are logged in, or a 401 error if they are not authenticated.
// The code uses environment variables for sensitive information like client ID and secret, ensuring security and flexibility