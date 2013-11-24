/* jshint globalstrict: true, node: true, unused:false */
"use strict";

module.exports = {
    
    /*
    * Ensure authentication
    */
    ensureAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) { 
			return next(); 
		}
		res.redirect('/login');
	},

};