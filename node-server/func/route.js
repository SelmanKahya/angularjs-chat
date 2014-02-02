
// set routes
exports.init = function(){

    var index = function(req, res){
        res.send('It works!');
    };

    // route definitions
    app.get('/', index);

    // CHAT ROUTES
    // sockjs will install its handlers on this route:
    app.set('CHAT_ROUTE', '/chat');

};
