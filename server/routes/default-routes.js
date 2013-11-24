/* jshint globalstrict: true, node: true, unused:false */
"use strict";

var loginMiddleware = require('../middlewares/login-middleware');

module.exports = function(app) {

	app.get('/', loginMiddleware.ensureAuthenticated, function(req, res, next){
		res.render('index', {
			user: req.user,
		});
	});
};
