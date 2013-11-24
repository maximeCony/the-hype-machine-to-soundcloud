module.exports = Backbone.View.extend({

        tagName: 'div',
        className: 'hype col-md-5',
        template: _.template($('#hype-item-template').html()),

        initialize: function(){
            //listen for model events
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        events: {
            'click .like-track': 'likeTrack',
            'click .unlike-track': 'unlikeTrack',
            'click': 'hypeDetails',
        },

        render: function() {

            this.getSoundCloudLikes(this.model);

            this.$el.html(this.template(this.model.attributes));
            if(this.model.attributes.thumb_url_large){
                this.$el.css('background', 'url(' + this.model.attributes.thumb_url_large + ')');
            }
            return this;
        },

        hypeDetails: function(){

            window.location = '#hypes/' + this.model.attributes.mediaid;
        },

        getSoundCloudLikes: function(model){

            if(!model.attributes.soundcloud_id || model.attributes.soundcloud_like !== null) return;

            $.ajax({
                url: 'https://api.soundcloud.com/me/favorites/' + model.attributes.soundcloud_id + '.json',
                type: "GET",
                data: {
                    oauth_token: SOUNDCLOUD_OAUTH_TOKEN,
                },
                error: function(jqXHR, textStatus) {
                    if(jqXHR.status == 404) return model.set({soundcloud_like: false});
                    console.error(textStatus, jqXHR);
                },
                success: function(json){
                    model.set({soundcloud_like: true});
                }
            });
        },

        likeTrack: function(){

            this.model.set({soundcloud_like: true});
            var me = this;
            $.ajax({
                url: 'https://api.soundcloud.com/me/favorites/' + this.model.attributes.soundcloud_id + '.json',
                type: "PUT",
                data: {
                    oauth_token: SOUNDCLOUD_OAUTH_TOKEN,
                },
                contentType: "application/json",
                error: function(jqXHR, textStatus) {
                    console.error(textStatus, jqXHR);
                    me.model.set({soundcloud_like: false});
                },
            });
        },

        unlikeTrack: function(){

            this.model.set({soundcloud_like: false});
            var me = this;
            $.ajax({
                url: 'https://api.soundcloud.com/me/favorites/' + this.model.attributes.soundcloud_id + '.json',
                type: "DELETE",
                data: {
                    oauth_token: SOUNDCLOUD_OAUTH_TOKEN,
                },
                error: function(jqXHR, textStatus) {
                    console.error(textStatus, jqXHR);
                    me.model.set({soundcloud_like: true});
                },
            });
        },

});