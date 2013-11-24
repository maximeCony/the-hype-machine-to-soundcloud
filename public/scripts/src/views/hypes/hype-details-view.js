module.exports = Backbone.View.extend({

        template: _.template($('#hype-details-template').html()),

        events: {},

        render: function() {

            var me = this;
            SC.oEmbed(this.model.attributes.soundcloud_permalink_url, {
                auto_play: true,
                show_artwork: false,
            }, function(oembed){
                me.model.attributes.player = oembed.html;
                me.$el.html(me.template(me.model.attributes));
            });
            return this;
        },

});