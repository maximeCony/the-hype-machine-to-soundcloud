$(function(){

    var HypesView = require('../views/hypes/hypes-view')
	, Hypes = require('../collections/hype-collection');

	/* 
    * Router
    */
    var App = Backbone.Router.extend({

        routes: { 
            "": "index",
        },

        start: function(){
            //start backbon history
            Backbone.history.start();
        },

        index: function(){
            var hypes = new Hypes()
			, hypesView = new HypesView({
                collection: hypes,
            });
            
            hypes.fetch();
        },

    });

    var app = new App();
    // start the app
    app.start();
});