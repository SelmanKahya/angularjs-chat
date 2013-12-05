/**
 * Module dependencies.
 */

// libs
var express = require('express');
var http = require('http');
var path = require('path');

// functions
var socket = require('./functions/socket.js');

// routes
var routes = require('./routes');
var chat = require('./routes/chat');

// application
app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// route definitions
app.get('/', routes.index);
app.set('CHAT_ROUTE', '/chat');
app.get('/chat/users', chat.users);

// Server is starting, hold on!
var server = http.createServer(app);

server.listen(app.get('port'), function(){

    console.log('Express server listening on port ' + app.get('port'));

    // start listening /chat
    socket.init(server);

});
