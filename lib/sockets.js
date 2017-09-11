let userCount = 0;
module.exports = (io) => {
  io.on('connection', (socket) => {
    userCount += 1;
    io.emit('users', userCount);

    socket.on('disconnect', () => {
      userCount -= 1;
      io.emit('users', userCount);
    });
  });
};
