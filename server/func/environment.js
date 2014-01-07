// set environments
exports.set = function(){

    // all environments
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.methodOverride());
    app.use(app.router);

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    // allow cross site scripting, be careful with that in production
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
};
