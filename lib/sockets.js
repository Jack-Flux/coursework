let userCount = 0;

module.exports = (io) => {
  io.on('connection', (socket) =>{
    userCount++;
    io.emit('users', userCount);

    socket.on('disconnect', () =>{
      userCount--;
      io.emit('users', userCount);
    });
  });
};