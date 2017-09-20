var socket = io();

socket.on('send: users', (count) => {
  $('#userCount').html(`Users online: ${count}`);
});