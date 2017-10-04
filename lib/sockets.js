const utils = require('./utils');

let userCount = 0;
let currencyInfo = [];

const biggestChange = (io) => {
  utils.reqCrypto('front').then((currencies) => {
    currencyInfo = currencies;
    io.emit('send: currencyInfo', currencyInfo); // re-emits currencyInfo to all users after each cycle without them refreshing
    setTimeout(() => {
      biggestChange(io);
    }, 1000 * 15);
  }).catch((error) => {
    console.log(error);
    setTimeout(() => {
      biggestChange(io);
    }, 1000 * 15);
  });
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
