const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const app = express();

// Configure Passport to use the Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: 'YOUR_GOOGLE_CLIENT_ID',
      clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
      callbackURL: '/login/google/callback', // Update the callback URL according to your setup
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can handle the user's Google profile information and perform any necessary actions
      // For example, create or authenticate the user in your system and generate an access token or session
      // The `profile` object contains the user's information returned by Google
      console.log('User profile:', profile);
      // You can pass the user profile to the `done` callback if needed

      // For simplicity, we'll pass a dummy user ID as an example
      const userId = '123'; // Replace with the actual user ID

      // Set a cookie to keep the user logged in
      done(null, userId);
    }
  )
);

// Initialize Passport and restore authentication state, if any
app.use(passport.initialize());

// Handle the Google login request
app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle the Google callback after authentication
app.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login-failed' }), (req, res) => {
  // Redirect the user back to the homepage or any other desired page
  res.redirect('/');
});

// Serve the HTML file
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});