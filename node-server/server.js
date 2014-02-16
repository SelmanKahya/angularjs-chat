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

// No longer using appfog
// Decides which port to use
// AppFog port env. variable: process.env.VCAP_APP_PORT
// var port = parseInt(process.env.VCAP_APP_PORT) || app.get('port');

// Use OpenShift default port
var port    = process.env.OPENSHIFT_NODEJS_PORT || app.get('port');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

server.listen(port, ipaddress, function(){

    console.log('Express server listening on port ' + port);

    // now server is up, it is time to install sockjs handlers
    socket.init(server);

});
