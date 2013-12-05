// import lib
var sockjs = require('sockjs');

// open socket for chat
var users = [];
var socket = sockjs.createServer();

// init socket
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

        conn.user = message.user;

        var username = message.user.user_first_name + " " + message.user.user_last_name;

        if(message.type == 'message')  {

            if(message.action == 'new-user'){
                // tell users that new user entered to room
                for (var ii=0; ii < connections.length; ii++) {
                    connections[ii].write(username + " entered to the room");
                }
            }

            else if(message.action == 'send'){
                for (var ii=0; ii < connections.length; ii++) {
                    connections[ii].write(username + " says: " + message.data);
                }
            }
        }
    });

    // on close, tell all the users that somebody has left the chat room
    conn.on('close', function(){
        var name = conn.user_info.name;
        for (var ii=0; ii < users.length; ii++) {
            users.write(name + " has been disconnected!");
        }
    });

    // tell all the users, somebody has joined
    for (var ii=0; ii < users.length; ii++) {
        users.write(conn.user_info.name + " has joined!");
    }

    // push new connection into the array
    users.push(conn);
}