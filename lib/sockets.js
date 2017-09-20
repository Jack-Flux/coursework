let userCount = 0;
module.exports = (io, events) => {
  io.on('connection', (socket) => {
    userCount += 1;
    io.emit('send: users', userCount);

    events.on('biggestChange', (currencies) => {
      io.emit('send: biggestChange', currencies);
    });

    socket.on('disconnect', () => {
      userCount -= 1;
      io.emit('send: users', userCount);
    });
  });
};
