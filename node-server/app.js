// import required libs
express = require('express');
http = require('http');

// functions
var socket = require('./func/socket.js');
var route = require('./func/route.js');
var environment = require('./func/environment.js');

// create express app
app = express();

// set all environment variables
environment.set();

// initialize the routes
route.init();

// server is going up, hold tight!
var server = http.createServer(app);
var port = app.get('port');

server.listen(port, function(){

    console.log('Express server listening on port ' + port);

    // now server is up, it is time to install sockjs handlers
    socket.init(server);

});
