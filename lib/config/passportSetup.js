const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const log = require('../log');

const User = db.model('User');

module.exports = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.local.username);
  });

  // used to deserialize the user
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    ((req, username, password, cb) => {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(() => {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username': username }, (err, user) => {
          // if there are any errors, return the error
          if (err) {
            return cb(err);
          }

          // check to see if theres already a user with that username
          if (user) {
            return cb(null, false, log('That username is already taken.'));
          }

          // if there is no user with that email
          // create the user
          const newUser = new User();

          // set the user's local credentials
          newUser._id = username;
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);

          // save the user
          newUser.save((err2) => {
            if (err) {
              throw err2;
            }
            return cb(null, newUser);
          });
        });
      });
    })
  ));

  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, username, password, cb) => {
      User.findOne({ 'local.username': username }, (err, user) => {
        // if there are any errors, return the error before anything else
        if (err) { return cb(err); }
        // if no user is found, return the message
        if (!user) { return cb(null, false, log('No user found.')); }

        // if the user is found but the password is wrong
        if (!user.validPassword(user, password)) { return cb(null, false, log('Oops! Wrong password.')); }

        // all is well, return successful user
        return cb(null, user);
      });
    })
  ))
};
