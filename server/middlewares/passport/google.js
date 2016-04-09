/**
 * Module dependencies.
 */

import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import config from '../../config';

import User from '../../models/user';

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
  },
  (accessToken, refreshToken, profile, done) => {
    const options = {
      criteria: { 'google.id': profile.id },
    };
    User.load(options, function loadUser(err, user) {
      if (err) return done(err);
      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          provider: 'google',
          google: profile._json,
        });
        newUser.save(function saveCallback(err) {
          if (err) console.log(err); // eslint-disable-line no-console
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
);

export default googleStrategy;
