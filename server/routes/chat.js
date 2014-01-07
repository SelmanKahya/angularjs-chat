/*
 * GET online users
 */

var socket = require('../func/socket.js');

exports.users = function(req, res){

    var user_array = [];
    var users = socket.getOnlineUsers();

    for (var ii=0; ii < users.length; ii++) {
        user_array.push(users[ii].user_info);
    }

    res.send(JSON.stringify(user_array));

};