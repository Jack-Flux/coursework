const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utils');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', (err) => {
  throw err;
});
db.once('open', () => {
  console.log('MongoDB connected');
});

const userSchema = mongoose.Schema({
  _id: String,
  local: {
    username: String,
    password: String,
  },
});

const userBalances = mongoose.Schema({
  _id: String,
  balances: JSON,
});

// methods ======================
// generating a password hash
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = (user, password) => {
  return bcrypt.compareSync(password, user.local.password);
};

// create the model for users
mongoose.model('User', userSchema);
mongoose.model('Balances', userBalances);

module.exports = mongoose;
