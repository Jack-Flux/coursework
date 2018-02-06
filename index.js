const express = require('express');
const passport = require('passport');
const session = require('express-session');
const sharedSesh = require('express-socket.io-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const EventEmitter = require('events');
const config = require('./config.json');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const sessionMiddleware = session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true,
});
io.use(sharedSesh(sessionMiddleware));
app.use(sessionMiddleware);

require('./lib/config/passportSetup')(passport);

app.set('view engine', 'ejs'); // allows the use of EJS as the frontend template language
app.use(express.static(`${__dirname}/public`)); // expresses all content in the public folder to the client
app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./lib/routes')(app, passport); // sets app routing
require('./lib/sockets')(io); // handles server sockets

server.listen(config.port, 'localhost'); // starts the server on config port
