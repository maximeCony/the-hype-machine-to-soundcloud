 /* jshint globalstrict: true, node: true, unused:false */
 "use strict";

module.exports = {
    
    /*
    * log all the errors
    */
    logErrors: function(err, req, res, next) {
        //log the stack or the error object
        console.error((typeof err.stack !== 'undefined') ? err.stack : err);
        next(err);
    },

    /*
    * handle ajax errors
    */
    clientErrorHandler: function(err, req, res, next) {
        if (req.xhr) {
            res.send(err.status || 500, { 
                error: 'Something went wrong.',
                type: err.type || null,
            });
        } else {
            next(err);
        }
    },

    /*
    * handle errors
    */
    errorHandler: function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', { error: err });
    },

};