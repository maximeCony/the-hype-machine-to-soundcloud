$(function(){

    var HypesView = require('../views/hypes/hypes-view')
    , HypeView = require('../views/hypes/hype-view')
    , HypeDetailsView = require('../views/hypes/hype-details-view')
	, Hypes = require('../collections/hype-collection')
    , appContainer = $('#app');

	/* 
    * Router
    */
    var App = Backbone.Router.extend({

        routes: { 
            "": "index",
            "hypes/:id": "showDetails",
        },

        initialize: function(){
            this.hypes = new Hypes();
            this.hypes.fetch();
        },

        start: function(){
            //start backbon history
            Backbone.history.start();
        },

        index: function(){
            var hypesView = new HypesView({
                collection: this.hypes,
            });
            appContainer.html(hypesView.render().el);
        },

        showDetails: function(id){
            var hype = this.hypes.get(id);

            var hypeView = new HypeView({
                model: hype,
            });

            var hypeDetailsView = new HypeDetailsView({
                model: hype,
            });

            appContainer.html('').append(hypeView.render().el, hypeDetailsView.render().el)
        },

    });

    var app = new App();
    // start the app
    app.start();
});