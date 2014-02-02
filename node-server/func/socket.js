// Import SockJS library
var sockjs = require('sockjs');

// Create a SockJS server
var socket = sockjs.createServer();

// Keeping connected users in this array
var users = [];

// TODO:
// Create a class: request
// Use it in broadcast(type, user, data) function

// TODO:
// Create a class: response
// Use it in newRequest(conn, message) function

// REQUEST TYPE
// This needs to defined in the server as well
// All requests and responses should carry request type information
var REQUEST_TYPE = {
    NEW_MESSAGE: 1,
    USER_JOINED: 2,
    USER_DISCONNECTED: 3,
    USER_LIST : 4
}

// Decides what will happen when there is a new connection,
// and installs socket handlers on pre-defined api route
exports.init = function(server){

    // when there is a new connection, call newConnection();
    socket.on('connection', newConnection);


    // API endpoint to install handlers is stored in app variable - see func/route.js
    var route = app.get('CHAT_ROUTE');

    // install handlers onto the specified route
    socket.installHandlers(server, {prefix: route});

};

// hey, there is a new connection!
var newConnection = function(conn) {

    // keep user information on conn object
    conn.user = {
        id: users.length,
        name: ''
    }

    // on data
    conn.on('data', function(message) {
        newRequest(conn, message);
    });

    // on close
    conn.on('close', function(){
        deleteUser(conn);
    });

    // push new connection object into the users array
    users.push(conn);
}

// NEW REQUEST TO THE /CHAT ROUTE
// FIRST:   Parse the incoming request.
// SECOND:  Check the request type, and response accordingly.
var newRequest = function(conn, message){

    // Parse incoming message
    var message = JSON.parse(message);

    //  Get the request type (must be one of those defined in REQUEST_TYPE variable
    var request_type = message.type;

    // New message to all the connected users
    if(request_type == REQUEST_TYPE.NEW_MESSAGE){

        broadcast(request_type, conn.user, message.data);

        // echo - you can delete this
        conn.write(JSON.stringify({type: request_type, data: 'SERVER-ECHO: ' + message.data}));

    }

    // New user has joined to the chat room!
    else if(request_type == REQUEST_TYPE.USER_JOINED){

        // Save the username
        conn.user.name = message.data;

        // Tell everyone that somebody has joined to the chat room!
        broadcast(request_type, conn.user, null);
        broadcast(REQUEST_TYPE.USER_LIST);
    }
}

// USER DISCONNECTED
// FIRST:   Tell all the users that somebody has left the chat room.
// SECOND:  Delete user from the users array.
var deleteUser = function(conn){

    broadcast(REQUEST_TYPE.USER_DISCONNECTED, conn.user, null);

    for (var ii=0; ii < users.length; ii++) {
        if(users[ii] == conn){
            users.splice(ii);
            break;
        }
    }

    broadcast(REQUEST_TYPE.USER_LIST);

}

// BROADCAST A MESSAGE
// Broadcasts given message to all the connected users.
// Type of the message must be one of the types defined in REQUEST_TYPE variable.
var broadcast = function(type, user, data){

    // response object
    var response = {type: type, data:''};

    // new message to all the connected users
    if(type == REQUEST_TYPE.NEW_MESSAGE){
        response.data = user.name + ": " + data;
        for (var ii=0; ii < users.length; ii++) {
            users[ii].write(JSON.stringify(response));
        }
    }

    // new user
    else if(type == REQUEST_TYPE.USER_JOINED){
        response.data = user.name + " has joined!";
        for (var ii=0; ii < users.length; ii++) {
            users[ii].write(JSON.stringify(response));
        }
    }

    // user disconnected
    else if(type == REQUEST_TYPE.USER_DISCONNECTED){
        response.data = user.name + " has disconnected!";
        for (var ii=0; ii < users.length; ii++) {
            users[ii].write(JSON.stringify(response));
        }
    }

    // send the users array to all the users
    // because either user joined or disconnected
    else if(type == REQUEST_TYPE.USER_LIST){

        var user_info = [];

        // push user information into the array
        for (var ii=0; ii < users.length; ii++) {
            var username = users[ii].user.name;
            if(username && username != "")
                user_info.push(users[ii].user)
        }

        // send users' information
        response.data = JSON.stringify(user_info);
        for (var ii=0; ii < users.length; ii++) {
            users[ii].write(JSON.stringify(response));
        }
    }
}
