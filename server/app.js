// libs
express = require('express');
http = require('http');
path = require('path');

// functions
var socket = require('./functions/socket.js');
var route = require('./functions/route.js');
var environment = require('./functions/environment.js');

// application
app = express();

// set all environment variables
environment.set();

// initialize the routes
route.init();

// server is going up, hold on!
var server = http.createServer(app);

server.listen(app.get('port'), function(){

    console.log('Express server listening on port ' + app.get('port'));

    // install sockjs handlers - /chat
    socket.init(server);

});
