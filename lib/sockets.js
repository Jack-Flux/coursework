let userCount = 0;
let currencyInfo = [];

module.exports = (io, events) => {
  events.on('currency-info', (currencies) => {
    currencyInfo = currencies;
    io.emit('send: currencyInfo', currencyInfo); // re-emits currencyInfo to all users after each cycle without them refreshing
  });
  io.on('connection', (socket) => {
    userCount += 1;
    socket.emit('send: currencyInfo', currencyInfo); // on connection provides the client with current currencyInfo

    socket.on('disconnect', () => {
      userCount -= 1;
    });
  });
};
