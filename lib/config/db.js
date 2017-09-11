const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users
mongoose.model('User', userSchema);

module.exports = mongoose;
