const request = require('request');
const log = require('./log');

const utils = module.exports = {
  reqCrypto: (method) => new Promise((res) => {
    request(`https://coincap.io/${method}`, (err, resp, body) => {
      if (err) {
        log(err);
        return res({});
      }
      try {
        log('Market data updated');
        return res(JSON.parse(body));
      } catch (err2) {
        log(err2, true);
        return res({});
      }
    });
  }),
  fetchBalance: (user) => new Promise((res) => {
    const db = require('./config/db');
    const Balances = db.model('Balances');
    Balances.findById(user, (err, resp) => {
      if (err) log(err, true);
      res(resp);
    });
  }),
  updateBalance: (user, symbol, amount) => new Promise(async(res) => {
    const db = require('./config/db');
    const Balances = db.model('Balances');
    let userBalance = await utils.fetchBalance(user);
    if (!userBalance) {
      userBalance = new Balances();
      userBalance._id = user;
      userBalance.balances = {};
      userBalance.balances[symbol] = amount;
      userBalance.save((err2) => {
        if (err2) log(err2, true);
        return res({ err: false, message: 'Balance updated', balances: userBalance.balances });
      });
    }
    if ((userBalance.balances[symbol] + amount) < 0) return res({ err: true, message: 'Invalid balance'});
    userBalance.balances[symbol] ? userBalance.balances[symbol] += amount : userBalance.balances[symbol] = amount;
    Balances.update({ _id: user }, userBalance, (err2) => {
      if (err2) log(err2, true);
      return res({ err: false, message: 'Balance updated', balances: userBalance.balances });
    });
  }),
};
