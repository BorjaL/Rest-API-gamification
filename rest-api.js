var server = require('./infraestructure/server');
var passport = require('./infraestructure/authentication/passport');

server.startServer(passport);