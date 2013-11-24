 /* jshint globalstrict: true, node: true, unused:false */
"use strict";

var errorService = require('./services/error-service');

module.exports = function(app){

	require('./routes/default-routes')(app);
    
    // custom 404 and 403 and 410...
	app.use(function(req, res, next){
		var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});

	app.use(errorService.logErrors);
	app.use(errorService.clientErrorHandler);
	app.use(errorService.errorHandler);
    
    return app;
};