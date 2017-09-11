const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config.json');
const db = require('./lib/config/db');

const app = express();
const User = db.model('User');

require('./lib/config/passportSetup')(passport, User);

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs'); // Allows the use of EJS as the templating language
app.use(express.static(`${__dirname}/public`)); // Expresses all content in the public folder to the client
app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: 'testing123' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./lib/routes')(app, passport); // Sets app routing
require('./lib/sockets')(io); // Handles server sockets

server.listen(config.port); // Starts the server on config port
