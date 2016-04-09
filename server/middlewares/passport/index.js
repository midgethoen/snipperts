import mongoose from 'mongoose';
import google from './google';
import passport from 'passport';

const User = mongoose.model('User');

export function configurePassport() {
  const pass = passport;

  pass.serializeUser(function serializeUser(user, done) {
    done(null, user.id);
  });

  pass.deserializeUser(function deserializeUser(id, done) {
    User.load({ criteria: { _id: id } }, function userLoaded(err, user) {
      done(err, user);
    });
  });

  pass.use(google);

  return pass;
}
