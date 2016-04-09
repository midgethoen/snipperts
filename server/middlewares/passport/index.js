import mongoose from 'mongoose';
import google from './google';
import passport from 'passport';

const User = mongoose.model('User');

export function configurePassport() {
  const pass = passport;

  pass.serializeUser(function serializeUser(user, done) {
    done(null, user._id);
  });

  pass.deserializeUser(function deserializeUser(_id, done) {
    User.findById({ _id }, function userLoaded(err, user) {
      done(err, user);
    });
  });

  pass.use(google);

  return pass;
}
