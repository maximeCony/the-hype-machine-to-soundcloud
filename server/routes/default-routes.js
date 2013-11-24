/* jshint globalstrict: true, node: true, unused:false */
"use strict";

module.exports = function(app) {

	app.get('/', function(req, res, next){
		res.render('index');
	});
};
