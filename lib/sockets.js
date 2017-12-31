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

  io.on('connection', (socket) => {
    userCount += 1;
    socket.emit('send: currencyInfo', currencyInfo); // on connection provides the client with current currencyInfo

    socket.on('disconnect', () => {
      userCount -= 1;
    });
  });
};
