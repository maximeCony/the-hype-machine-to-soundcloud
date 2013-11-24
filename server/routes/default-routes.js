/* jshint globalstrict: true, node: true, unused:false */
"use strict";

var loginMiddleware = require('../middlewares/login-middleware')
, env = require('require-env')
, SOUNDCLOUD_CLIENT_ID = env.require('SOUNDCLOUD_CLIENT_ID');

module.exports = function(app) {

	app.get('/', loginMiddleware.ensureAuthenticated, function(req, res, next){
		res.render('index', {
			user: req.user,
			SOUNDCLOUD_CLIENT_ID: SOUNDCLOUD_CLIENT_ID,
		});
	});
};
