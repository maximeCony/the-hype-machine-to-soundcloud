module.exports = Backbone.View.extend({

        tagName: 'div',
        className: 'hype',
        template: _.template($('#hype-item-template').html()),

        initialize: function(){
            //listen for model events
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        events: {},

        render: function() {

            console.log(this.model.attributes)

            this.$el.html(this.template(this.model.attributes));
            return this;
        },
    });