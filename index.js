let express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    io      = require('socket.io')(server),
    config  = require('./config.json'),
    routes  = require('./lib/routes'),
    sockets = require('./lib/sockets');

app.set('view engine', 'ejs'); // Allows the use of EJS as the templating language
app.use(express.static(__dirname + '/public')); // Expresses all content in the public folder to the client

routes(app); // Sets app routing
sockets(io); // Handles server sockets

server.listen(config.port); // Starts the server on config port
