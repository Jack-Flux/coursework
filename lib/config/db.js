const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utils');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.once('open', () => {
  console.log('MongoDB connected');
});

const userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String,
  },
});

const userBalances = mongoose.Schema({
  username: JSON,
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = (user, password) => {
  return bcrypt.compareSync(password, user.local.password);
};

userBalances.methods.validSymbol = (symbol) => {
  utils.reqCrypto('coins').then(coins => (coins.indexOf(symbol) > -1)).catch((error) => {
    console.log(error);
    return false;
  });
};

// create the model for users
mongoose.model('User', userSchema);
mongoose.model('Balances', userBalances);

module.exports = mongoose;
