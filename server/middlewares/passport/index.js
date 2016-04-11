import mongoose from 'mongoose';
import google from './google';
import pass from 'passport';

export const passport = pass;

const User = mongoose.model('User');

passport.serializeUser(function serializeUser(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function deserializeUser(_id, done) {
  User.findById({ _id }, function userLoaded(err, user) {
    done(err, user);
  });
});

passport.use(google);
