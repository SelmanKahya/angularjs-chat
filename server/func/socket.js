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

exports.getOnlineUsers = function(){
    return users;
}

// there is a new connection
var newConnection = function(conn) {

    // keep user_info on conn object
    conn.user_info = {
        id: users.length,
        name: ''
    }

    conn.on('data', function(message) {
        console.log('data', message)
        var message = JSON.parse(message);
        if(message.type == 'message'){
            broadcast(conn.user_info.name + ": " + message.data);
        }

        else if(message.type == 'introduce'){
            // save username
            conn.user_info.name = message.data;

            // tell all the users that somebody has joined
            broadcast(conn.user_info.name + " has joined!");
        }
    });

    // on close, tell all the users that somebody has left the chat room
    conn.on('close', function(){
        var name = conn.user_info.name;
        broadcast(name + " has been disconnected!");
    });

    // push new connection object into the users array
    users.push(conn);
}

// broadcasts given message to all connected users
var broadcast = function(message){
    for (var ii=0; ii < users.length; ii++) {
        users[ii].write(message);
    }
}