var HypeView = require('./hype-view');

module.exports = Backbone.View.extend({

    el: '#hypes',

    initialize: function(){
        //listen the add event
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.render);
    },

    addOne: function(model){
        //create a new view
        var hypeView = new HypeView({model: model});
        //render the view
        this.$el.append(hypeView.render().el);
    },

    render: function(){
        //render all collection's elements
        this.collection.forEach(this.addOne, this);
        return this;
    },
});