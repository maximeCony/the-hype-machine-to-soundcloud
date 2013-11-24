var HypeView = require('./hype-view');

module.exports = Backbone.View.extend({

    initialize: function(){
        //listen the add event
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.render);
    },

    addOne: function(model){
        this.getSoundCloudData(model);
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

    getSoundCloudData: function(model){

        if(model.attributes.soundcloud_id) return;

        $.ajax({
            url: 'http://api.soundcloud.com/tracks.json',
            type: "GET",
            data: {
                q: model.attributes.artist + ' ' + model.attributes.title,
                client_id: '947a6dad7e6f47c6d00493d77610b5a3',
            },
            error: function(jqXHR, textStatus) {
                if(jqXHR.status != 404) console.error(textStatus, jqXHR);
            },
            success: function(json){
                if(json[0] && json[0].permalink_url) {
                    model.set({
                        'soundcloud_id': json[0].id,
                        'soundcloud_permalink_url': json[0].permalink_url,
                    });
                }
            }
        });
    },

});