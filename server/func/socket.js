// import lib
var sockjs = require('sockjs');

// open socket for chat
var users = [];
var socket = sockjs.createServer();

// install socket handlers on server on defined route
exports.init = function(server){
    socket.on('connection', newConnection);
    socket.installHandlers(server, {prefix: app.get('CHAT_ROUTE')});
};

// there is a new connection
var newConnection = function(conn) {

    // keep user_info on conn object
    conn.user_info = {
        id: users.length,
        name: ''
    }

    conn.on('data', function(message) {
        var message = JSON.parse(message);
        broadcast(conn.user_info.name + ": " + message.data);
    });

    // on close, tell all the users that somebody has left the chat room
    conn.on('close', function(){
        var name = conn.user_info.name;
        broadcast(name + " has been disconnected!");
    });

    // tell all the users that somebody has joined
    broadcast(conn.user_info.name + " has joined!");

    // push new connection object into the users array
    users.push(conn);
}

// broadcasts given message to all connected users
var broadcast = function(message){
    for (var ii=0; ii < users.length; ii++) {
        users[ii].write(message);
    }
}