const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');
const { comparePassword } = require('../utils/passwordHash');

// Local Strategy - Login with email and password
passport.use(new LocalStrategy(
  {
    usernameField: 'email', 
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Check if password matches
      const isMatch = await comparePassword(password, user.password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ where: { googleId: profile.id } });

      if (user) {
        return done(null, user);
      }

      // Create new user from Google profile
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        role: 'employee', 
        password: null 
      });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

module.exports = passport;