/* jshint globalstrict: true, node: true, unused:false */
"use strict";

var express = require('express')
, app = express()
, env = require('require-env')
, dust = require('dustjs-linkedin')
, cons = require('consolidate')
, dust = require('dustjs-helpers')
, browserify = require('browserify-middleware')
, publicFolder = "/public";

app.configure(function(){

    app.set('port', process.env.PORT || 5000);

    // assign dust engine to .html files
    app.engine('html', cons.dust);

    // set .html as the default extension 
    app.set('view engine', 'html');
    app.set('views', __dirname + '/server/views');
	
	app.use(express['static'](__dirname + publicFolder));

	//provide browserified versions of all the files in a directory
	app.use('/scripts/build/apps', browserify('./public/scripts/src/apps'));
});

//initialize r
app = require('./server/router')(app);

require('http').createServer(app).listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});