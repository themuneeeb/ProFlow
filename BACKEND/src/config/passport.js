// src/config/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

// Use the GoogleStrategy with Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1) Try find by googleId
        let user = await User.findOne({ googleId: profile.id });

        // 2) If not found, try find by email to link accounts
        if (!user) {
          const email = profile.emails[0].value;
          const existing = await User.findOne({ email });
          if (existing) {
            // Link Google to existing local account
            existing.googleId = profile.id;
            user = await existing.save();
          } else {
            // 3) Create brand new user via Google
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: email,
              verified: true, // Google email is trusted
            });
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize and deserialize user (no sessions in JWT flow but needed for passport)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id)
    .then((user) => done(null, user))
    .catch(done)
);
