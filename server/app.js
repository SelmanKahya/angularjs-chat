/**
 * Module dependencies.
 */

// libs
var express = require('express');
var http = require('http');
var path = require('path');

// routes
var routes = require('./routes');
var chat = require('./routes/chat');

// application
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/chat', chat.init);
app.get('/chat/users', chat.users);

http.createServer(app).listen(app.get('port'), function(){

  console.log('Express server listening on port ' + app.get('port'));

});
