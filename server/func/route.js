// routes
var routes = require('../routes');
var chat = require('../routes/chat');

// set routes
exports.init = function(){

    // route definitions
    app.get('/', routes.index);

    // CHAT ROUTES
    // sockjs will install its handlers on this route:
    app.set('CHAT_ROUTE', '/chat');

    // returns list of online users
    app.get('/chat/users', chat.users);

};
