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
        },

        render: function() {

            this.getSoundCloudLikes(this.model);

            this.$el.html(this.template(this.model.attributes));
            if(this.model.attributes.thumb_url_large){
                this.$el.css('background', 'url(' + this.model.attributes.thumb_url_large + ')');
            }
            return this;
        },

        getSoundCloudLikes: function(model){

            if(!model.attributes.soundcloud_id || model.attributes.soundcloud_like !== null) return;

            $.ajax({
                url: 'http://api.soundcloud.com/users/' + SOUNDCLOUD_USER_ID + '/favorites/' + model.attributes.soundcloud_id + '.json',
                type: "GET",
                data: {
                    client_id: '947a6dad7e6f47c6d00493d77610b5a3',
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

            $.ajax({
                url: 'http://api.soundcloud.com/users/' + SOUNDCLOUD_USER_ID + '/favorites/' + this.model.attributes.soundcloud_id + '.json?client_id=947a6dad7e6f47c6d00493d77610b5a3',
                type: "PUT",
                error: function(jqXHR, textStatus) {
                    console.error(textStatus, jqXHR);
                },
                success: function(json){
                    this.model.set({soundcloud_like: true});
                }
            });
        },

        unlikeTrack: function(){

            $.ajax({
                url: 'http://api.soundcloud.com/users/' + SOUNDCLOUD_USER_ID + '/favorites/' + this.model.attributes.soundcloud_id + '.json?client_id=947a6dad7e6f47c6d00493d77610b5a3',
                type: "DELETE",
                error: function(jqXHR, textStatus) {
                    console.error(textStatus, jqXHR);
                },
                success: function(json){
                    this.model.set({soundcloud_like: false});
                }
            });
        },

});