const utils = require('./utils');
const config = require('../config.json');

let userCount = 0;
let currencyInfo = [];

const biggestChange = async (io) => {
  currencyInfo = await utils.reqCrypto('front');
  io.emit('send: currencyInfo', currencyInfo);
  setTimeout(() => {
    biggestChange(io);
  }, 1000 * config.timers.markets);
};

module.exports = (io) => {
  biggestChange(io);

  io.on('connection', async (socket) => {
    userCount += 1;
    socket.emit('send: currencyInfo', currencyInfo); // on connection provides the client with current currencyInfo
    if (socket.handshake.session.passport) {
      const user = socket.handshake.session.passport.user;
      socket.emit('send: balances', await utils.fetchBalance(user));
    }

    socket.on('receive: updateBalance', async(data) => {
      const { symbol, amount } = data;
      if (socket.handshake.session.passport && symbol && amount) {
        const user = socket.handshake.session.passport.user;
        socket.emit('send: balances', await utils.updateBalance(user, symbol, amount));
      }
    });

    socket.on('disconnect', () => {
      userCount -= 1;
    });
  });
};
