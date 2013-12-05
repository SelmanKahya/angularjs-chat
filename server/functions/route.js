// routes
var routes = require('../routes');
var chat = require('../routes/chat');

// set routes
exports.init = function(){

    // route definitions
    app.get('/', routes.index);
    app.set('CHAT_ROUTE', '/chat');
    app.get('/chat/users', chat.users);

};
