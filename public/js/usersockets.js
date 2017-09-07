var socket = io();

socket.on('users', (count) =>{
  $('#userCount').html(`Users online: ${count}`);
});