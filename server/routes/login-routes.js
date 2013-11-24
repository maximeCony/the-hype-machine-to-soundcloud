/* jshint globalstrict: true, node: true, unused:false */
"use strict";

var passport = require('passport');

module.exports = function(app) {

	app.get('/login', function(req, res, next){
		res.render('login');
	});

	app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

	app.get('/auth/soundcloud',
		passport.authenticate('soundcloud'));

	http://localhost:5000/auth/soundcloud/callback&client_id=947a6dad7e6f47c6d00493d77610b5a3&type=web_server
	app.get('/auth/soundcloud/callback', 
		passport.authenticate('soundcloud', { failureRedirect: '/login' }),
		function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/');
	});
};
